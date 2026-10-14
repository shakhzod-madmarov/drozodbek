import React, { useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { BookingContext } from "./BookingContext";
import { useLocalizedPath } from "./LanguageContext";

export const BookingProvider = ({ children }) => {
  const [bookingRequest, setBookingRequest] = useState(null);
  const navigate = useNavigate();
  const to = useLocalizedPath();

  const openBooking = useCallback(
    (details) => {
      let safe = {};
      if (typeof details === "string") {
        safe = { service: details, name: "", phone: "", note: "" };
      } else if (details && typeof details === "object" && !details.nativeEvent) {
        safe = {
          service: details.service || null,
          name: details.name || "",
          phone: details.phone || "",
          note: details.note || "",
        };
      }
      safe.timestamp = Date.now();
      setBookingRequest(safe);

      if (typeof document !== "undefined") {
        const el = document.getElementById("booking");
        if (el) {
          // Smooth scroll to the inline booking section with clearance for the navbar
          const rect = el.getBoundingClientRect();
          const targetY = window.pageYOffset + rect.top - 85;
          window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
          if (typeof window !== "undefined" && window.history?.replaceState) {
            window.history.replaceState(null, "", "#booking");
          }
          return;
        }
      }

      // If not on a page with #booking section, navigate directly to /booking
      const searchParam = safe.service ? `?service=${encodeURIComponent(safe.service)}` : "";
      navigate(to("/booking") + searchParam);
    },
    [navigate, to],
  );

  const clearBookingRequest = useCallback(() => {
    setBookingRequest(null);
  }, []);

  const value = useMemo(
    () => ({
      bookingRequest,
      openBooking,
      clearBookingRequest,
    }),
    [bookingRequest, openBooking, clearBookingRequest],
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};
