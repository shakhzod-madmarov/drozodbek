import React, { useState, useRef, useCallback } from "react";
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
  const containerRef = useRef(null);
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

  const handleKeyDown = (e) => {
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
    <div className="bg-white rounded-3xl p-3 sm:p-4 border border-amber-200 shadow-luxury transition-all hover:shadow-luxury-lg">
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden select-none cursor-ew-resize touch-pan-y bg-slate-900"
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
        <div className="absolute top-3 left-3 pointer-events-none">
          <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold">
            {defaultBefore}
          </span>
        </div>
        <div className="absolute top-3 right-3 pointer-events-none">
          <span className="px-2.5 py-1 rounded-md bg-primary/80 backdrop-blur-xs text-white text-[11px] font-bold">
            {defaultAfter}
          </span>
        </div>

        {/* Vertical Divider Handle */}
        <div
          tabIndex={0}
          role="slider"
          aria-label={a11y.beforeAfterSlider}
          aria-valuenow={Math.round(sliderPos)}
          aria-valuemin={0}
          aria-valuemax={100}
          onKeyDown={handleKeyDown}
          className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl cursor-ew-resize flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-white shadow-xl flex items-center justify-center text-primary text-xs font-bold border border-amber-200">
            ⇄
          </div>
        </div>
      </div>

      {(title || subtitle) && (
        <div className="pt-3 px-2">
          {title && <h4 className="text-sm font-bold text-slate-900">{title}</h4>}
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      )}
    </div>
  );
};

export default BeforeAfterSlider;
