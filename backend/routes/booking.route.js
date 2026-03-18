import express from "express";
import isAuth from "../middleware/isAuth.js";
import { createBooking, getMyBookings, getHostBookings, cancelBooking } from "../controllers/booking.controller.js";

const bookingRoute = express.Router();

bookingRoute.post("/create", isAuth, createBooking);
bookingRoute.get("/my-bookings", isAuth, getMyBookings);
bookingRoute.get("/host-bookings", isAuth, getHostBookings);
bookingRoute.put("/cancel/:id", isAuth, cancelBooking);

export default bookingRoute;
