import { createContext, useContext } from "react";

export const BookingContext = createContext({
  bookingRequest: null,
  openBooking: () => {},
  clearBookingRequest: () => {},
});

export const useBooking = () => useContext(BookingContext);
