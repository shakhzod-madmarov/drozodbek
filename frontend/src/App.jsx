import { useEffect } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFound";
import FloatingActionHub from "./components/FloatingActionHub";
import { useBooking } from "./context/BookingContext";
import { BookingProvider } from "./context/BookingProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLanguage } from "./context/LanguageContext";
import { LANGS, DEFAULT_LANG } from "./utils/language";


const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
};

const LangSync = () => {
  const { lang } = useLanguage();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
};

const AppShell = () => {
  const { openBooking } = useBooking();
  const { lang } = useLanguage();

  const skipLabel = {
    uz: "Asosiy mazmunga o'tish",
    ru: "Перейти к основному содержимому",
    en: "Skip to main content",
  }[lang] || "Asosiy mazmunga o'tish";

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#FFFDF9] text-[#1A202C]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-primary focus:text-white focus:rounded-xl focus:shadow-2xl text-sm font-bold"
      >
        {skipLabel}
      </a>
      <LangSync />
      <ScrollToTop />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        theme="dark"
        toastStyle={{ background: "#1A202C", borderLeft: "4px solid #DF301C" }}
      />

      <Nav onOpenBooking={() => openBooking()} />

      <main id="main-content" className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24">
        <Routes>
          {LANGS.flatMap((code) => {
            const at = (path) =>
              code === DEFAULT_LANG ? path : `/${code}${path === "/" ? "" : path}`;
            return [
              <Route key={`${code}-home`} path={at("/")} element={<Home onOpenBooking={openBooking} />} />,
              <Route key={`${code}-about`} path={at("/about")} element={<About onOpenBooking={openBooking} />} />,
              <Route key={`${code}-services`} path={at("/services")} element={<Services onOpenBooking={openBooking} />} />,
              <Route key={`${code}-detail`} path={at("/services/:serviceId")} element={<ServiceDetail />} />,
              <Route key={`${code}-gallery`} path={at("/gallery")} element={<Navigate to={at("/about")} replace />} />,
              <Route key={`${code}-booking`} path={at("/booking")} element={<Booking />} />,
              <Route key={`${code}-qabul`} path={at("/qabul")} element={<Booking />} />,
              <Route key={`${code}-contact`} path={at("/contact")} element={<Contact />} />,
            ];
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      {/* Floating Action Hub with Telegram, Instagram, and Phone */}
      <FloatingActionHub />
    </div>
  );
};

const App = () => (
  <BookingProvider>
    <AppShell />
  </BookingProvider>
);

export default App;
