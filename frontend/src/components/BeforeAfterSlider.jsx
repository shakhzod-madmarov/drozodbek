import { useState, useRef, useCallback } from "react";
import { useLanguage } from "../context/LanguageContext";
import { getA11yLabels } from "../constants/a11yLabels";

const clamp = (n) => Math.max(0, Math.min(100, n));

const BeforeAfterSlider = ({
  beforeImg,
  afterImg,
  beforeLabel,
  afterLabel,
  title,
  subtitle,
}) => {
  const { lang } = useLanguage();
  const a11y = getA11yLabels(lang);
  const [sliderPos, setSliderPos] = useState(50);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const isDragging = useRef(false);

  const defaultBefore =
    beforeLabel ||
    (lang === "uz" ? "Oldin" : lang === "ru" ? "До лечения" : "Before");
  const defaultAfter =
    afterLabel ||
    (lang === "uz" ? "Keyin" : lang === "ru" ? "После лечения" : "After");

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
    setHasInteracted(true);
  }, []);

  const handlePointerDown = (e) => {
    isDragging.current = true;
    try {
      e.currentTarget.setPointerCapture?.(e.pointerId);
    } catch {
      // ignore if unsupported
    }
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e) => {
    isDragging.current = false;
    try {
      if (e?.currentTarget?.hasPointerCapture?.(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore if unsupported
    }
  };

  // Subtle 3D card tilt on hover
  const handleCardMouseMove = (e) => {
    if (isDragging.current || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 4;
    const rotateX = -((y - centerY) / centerY) * 3;
    setTilt({ x: rotateX, y: rotateY, active: true });
  };

  const handleCardMouseLeave = () => {
    setTilt({ x: 0, y: 0, active: false });
  };

  const handleKeyDown = (e) => {
    setHasInteracted(true);
    const step = e.shiftKey ? 10 : 5;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setSliderPos((p) => clamp(p - step));
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setSliderPos((p) => clamp(p + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      setSliderPos(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setSliderPos(100);
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleCardMouseMove}
      onMouseLeave={handleCardMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.active ? "transform 0.12s ease-out" : "transform 0.5s ease-out",
      }}
      className="bg-white rounded-3xl p-3 sm:p-4 border border-amber-200/90 shadow-luxury hover:shadow-luxury-lg transition-shadow duration-300 flex flex-col justify-between [transform-style:preserve-3d]"
    >
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden select-none cursor-ew-resize touch-pan-y bg-slate-900 group"
      >
        {/* AFTER Image (Full Background) */}
        <img
          src={afterImg}
          alt={title ? `${title} — ${defaultAfter}` : defaultAfter}
          width={900}
          height={600}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable={false}
        />

        {/* BEFORE Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <img
            src={beforeImg}
            alt={title ? `${title} — ${defaultBefore}` : defaultBefore}
            width={900}
            height={600}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            draggable={false}
          />
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 pointer-events-none z-10">
          <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-xs text-white text-[11px] font-bold border border-white/20 shadow-sm">
            {defaultBefore}
          </span>
        </div>
        <div className="absolute top-3 right-3 pointer-events-none z-10">
          <span className="px-2.5 py-1 rounded-lg bg-primary/90 backdrop-blur-xs text-white text-[11px] font-bold border border-white/20 shadow-sm">
            {defaultAfter}
          </span>
        </div>

        {/* Interactive "Drag to compare" prompt (fades after interaction) */}
        {!hasInteracted && (
          <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none z-10 animate-bounce">
            <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-200 text-[10px] font-bold shadow-md border border-amber-300/30 flex items-center gap-1.5">
              <span>↔</span>
              <span>{lang === "uz" ? "Suring va taqqoslang" : lang === "ru" ? "Потяните ползунок" : "Drag to compare"}</span>
            </span>
          </div>
        )}

        {/* Vertical Divider Handle with 3D Specular Glow */}
        <div
          tabIndex={0}
          role="slider"
          aria-label={a11y.beforeAfterSlider}
          aria-valuenow={Math.round(sliderPos)}
          aria-valuemin={0}
          aria-valuemax={100}
          onKeyDown={handleKeyDown}
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.9)] cursor-ew-resize flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary z-20"
          style={{ left: `${sliderPos}%` }}
        >
          {/* Circular 3D Grab Button */}
          <div className="w-9 h-9 rounded-full bg-white shadow-2xl flex items-center justify-center text-primary text-xs font-black border-2 border-primary/20 hover:scale-110 active:scale-95 transition-transform">
            <span className="text-[13px] tracking-tight">⇄</span>
          </div>
        </div>
      </div>

      {/* Preset Quick Snap Controls */}
      <div className="flex items-center justify-between gap-1.5 pt-3 px-1 border-t border-amber-100/60 mt-2">
        <button
          onClick={() => {
            setSliderPos(10);
            setHasInteracted(true);
          }}
          className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-colors cursor-pointer ${
            sliderPos < 25 ? "bg-primary text-white" : "bg-amber-50 text-slate-600 hover:bg-amber-100"
          }`}
        >
          {defaultBefore}
        </button>
        <button
          onClick={() => {
            setSliderPos(50);
            setHasInteracted(true);
          }}
          className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-colors cursor-pointer ${
            sliderPos >= 25 && sliderPos <= 75 ? "bg-amber-200 text-slate-800" : "bg-amber-50 text-slate-600 hover:bg-amber-100"
          }`}
        >
          50 / 50
        </button>
        <button
          onClick={() => {
            setSliderPos(90);
            setHasInteracted(true);
          }}
          className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-colors cursor-pointer ${
            sliderPos > 75 ? "bg-primary text-white" : "bg-amber-50 text-slate-600 hover:bg-amber-100"
          }`}
        >
          {defaultAfter}
        </button>
      </div>

      {(title || subtitle) && (
        <div className="pt-2 px-1">
          {title && <h4 className="text-sm font-bold text-slate-900 leading-snug">{title}</h4>}
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      )}
    </div>
  );
};

export default BeforeAfterSlider;
