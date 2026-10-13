import React, { useRef, useState, useCallback } from "react";
import { DOCTOR_INFO } from "../constants/doctor";
import { IconTelegram, IconInstagram } from "./MedicalIcons";

/**
 * Doctor3DCard — Ultra-Luxury Interactive 3D Perspective Card
 * Features:
 *  - Hardware-accelerated CSS 3D perspective tilt tracking cursor coordinates
 *  - Dynamic specular light glare reflection layer following the light source
 *  - Multi-plane parallax depth (image at Z:15px, identity plate at Z:35px, actions at Z:50px)
 *  - Smooth spring-like physics reset on cursor leave
 *  - Clean portrait with ZERO text overlays on the doctor's photo
 */
const Doctor3DCard = ({
  lang = "uz",
  imageWebp = "/dr_ozodbek_portrait_pro.webp",
  imageJpg = "/dr_ozodbek_portrait_pro.jpg",
  className = "",
}) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width; // 0 to 1
    const y = (e.clientY - rect.top) / rect.height; // 0 to 1

    // Maximum tilt angles (+-14 degrees)
    const rotateY = (x - 0.5) * 24;
    const rotateX = (0.5 - y) * 24;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: x * 100,
      y: y * 100,
      opacity: 0.55,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  const specialtyText =
    lang === "ru"
      ? "Врач-Стоматолог · Имплантолог & Ортопед"
      : lang === "en"
      ? "Dental Surgeon · Implantologist & Prosthodontist"
      : "Vrach Stomatolog · Implantolog & Ortoped";

  return (
    <div className={`relative flex justify-center [perspective:1200px] ${className}`}>
      {/* 3D Ambient Breathing Glow Ring behind Card */}
      <div
        className={`absolute -inset-3 sm:-inset-5 bg-gradient-to-tr from-amber-400/35 via-orange-300/25 to-cyan-400/25 rounded-[3.5rem] blur-2xl -z-10 transition-opacity duration-700 pointer-events-none ${
          isHovered ? "opacity-100 scale-105" : "opacity-70 animate-pulse-glow"
        }`}
      />

      {/* Main 3D Tilted Card Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.025, 1.025, 1.025)`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transition: isHovered
            ? "transform 0.12s ease-out, box-shadow 0.3s ease"
            : "transform 0.65s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.65s ease",
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-sm sm:max-w-md rounded-[2.5rem] overflow-hidden bg-gradient-to-b from-[#FFFDF8] via-[#FFF8EC] to-[#FFF1D1]/70 border-2 border-amber-200/90 shadow-luxury-lg hover:shadow-2xl hover:border-amber-300 cursor-pointer select-none group"
      >
        {/* Dynamic Specular Reflection / Glare Holographic Layer */}
        <div
          className="absolute inset-0 z-30 pointer-events-none rounded-[2.5rem] transition-opacity duration-300"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle 380px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.1) 40%, transparent 80%)`,
          }}
        />

        {/* 3D Depth Layer 1: High-Definition Doctor Portrait Container */}
        <div
          className="relative w-full aspect-[4/4.5] overflow-hidden bg-gradient-to-b from-slate-100/40 via-amber-50/20 to-amber-100/30"
          style={{
            transform: isHovered ? "translateZ(20px)" : "translateZ(0px)",
            transition: "transform 0.4s ease-out",
          }}
        >
          <picture>
            <source srcSet={imageWebp} type="image/webp" />
            <img
              src={imageJpg}
              alt="Dr. Ozodbek Otaxonov — Vrach Stomatolog"
              width={600}
              height={675}
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-[center_top] filter transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </picture>
        </div>

        {/* 3D Depth Layer 2: Elevated Minimalist Frosted Glass Footer */}
        <div
          className="px-5 py-3.5 bg-white/95 backdrop-blur-md border-t border-amber-200/70 flex items-center justify-between gap-3 relative z-20 shadow-xs"
          style={{
            transform: isHovered ? "translateZ(38px)" : "translateZ(0px)",
            transition: "transform 0.45s ease-out",
          }}
        >
          <div className="min-w-0">
            <h2 className="font-serif-classic text-base sm:text-lg font-bold text-slate-900 tracking-tight truncate">
              Dr. Ozodbek Otaxonov
            </h2>
            <p className="text-[11px] font-bold uppercase tracking-wider text-primary truncate">
              {specialtyText}
            </p>
          </div>

          {/* 3D Depth Layer 3: Direct Quick Channel Actions */}
          <div
            className="flex items-center gap-1.5 shrink-0"
            style={{
              transform: isHovered ? "translateZ(20px)" : "translateZ(0px)",
              transition: "transform 0.5s ease-out",
            }}
          >
            <a
              href={DOCTOR_INFO.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="w-9 h-9 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-600 border border-sky-200/60 flex items-center justify-center transition-all duration-300 hover:scale-115 hover:-translate-y-0.5 active:scale-95 shadow-xs"
              title="Telegram: @Stamatolog07"
            >
              <IconTelegram className="w-4 h-4 text-sky-500" />
            </a>
            <a
              href={DOCTOR_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-600 border border-pink-200/60 flex items-center justify-center transition-all duration-300 hover:scale-115 hover:-translate-y-0.5 active:scale-95 shadow-xs"
              title="Instagram: @_vrach_stomatolog"
            >
              <IconInstagram className="w-4 h-4 text-pink-500" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor3DCard;
