import Booking from "../model/booking.model.js";
import Listing from "../model/listing.model.js";
import { User } from "../model/user.model.js";

const createBooking = async (req, res) => {
  try {
    const guest = req.userId;
    const { listingId, checkIn, checkOut } = req.body;

    // Get listing details
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Check if user is trying to book their own listing
    if (listing.host.toString() === guest) {
      return res.status(400).json({ message: "You cannot book your own listing" });
    }

    // Calculate total days and price
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const totalDays = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    
    if (totalDays <= 0) {
      return res.status(400).json({ message: "Invalid dates" });
    }

    const totalPrice = totalDays * listing.rent;

    // Create booking
    const booking = await Booking.create({
      listing: listingId,
      guest,
      host: listing.host,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      totalDays,
      totalPrice,
      status: "confirmed"
    });

    // Update listing status
    await Listing.findByIdAndUpdate(listingId, { isBooked: true });

    // Populate booking details
    const populatedBooking = await Booking.findById(booking._id)
      .populate("listing")
      .populate("guest", "name email")
      .populate("host", "name email");

    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(500).json({ message: `Create booking error: ${error}` });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const userId = req.userId;
    
    const bookings = await Booking.find({ guest: userId })
      .populate("listing")
      .populate("host", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: `Get bookings error: ${error}` });
  }
};

const getHostBookings = async (req, res) => {
  try {
    const userId = req.userId;
    
    const bookings = await Booking.find({ host: userId })
      .populate("listing")
      .populate("guest", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: `Get host bookings error: ${error}` });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Both guest and host can cancel
    if (booking.guest.toString() !== userId && booking.host.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    booking.status = "cancelled";
    await booking.save();

    // Update listing status
    await Listing.findByIdAndUpdate(booking.listing, { isBooked: false });

    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: `Cancel booking error: ${error}` });
  }
};

export { createBooking, getMyBookings, getHostBookings, cancelBooking };
