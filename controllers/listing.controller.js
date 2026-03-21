import { isObjectIdOrHexString } from "mongoose";
import uploadCloudinary from "../config/cloudinary.js";
import Listing from "../model/listing.model.js";
import { User } from "../model/user.model.js";

const addListing = async (req, res) => {
  try {
    let host = req.userId;
    let { title, discription, rent, city, landmark, category } = req.body;
    let image1 = await uploadCloudinary(req.files.image1[0].path);
    let image2 = await uploadCloudinary(req.files.image2[0].path);
    let image3 = await uploadCloudinary(req.files.image3[0].path);

    let listing = await Listing.create({
      title,
      discription,
      rent,
      city,
      landMark: landmark,
      category,
      image1,
      image2,
      image3,
      host,
    });
    let user = await User.findByIdAndUpdate(
      host,
      { $push: { listing: listing._id } },
      { new: true },
    );

    if (!user) {
      res.status(404).json({ message: "user is not found" });
    }

    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ message: `AddListing error ${error}` });
  }
};

const getListing = async (req, res) => {
  try {
    let listing = await Listing.find().sort({ createdAt: -1 });
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: `getListing error ${error}` });
  }
};

const updateListing = async (req, res) => {
  try {
    let { id } = req.params;
    let host = req.userId;
    let { title, discription, rent, city, landmark, category } = req.body;

    // Check if listing exists and user is the owner
    let listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    if (listing.host.toString() !== host) {
      return res.status(403).json({ message: "Not authorized to update this listing" });
    }

    // Update fields
    let updateData = {
      title,
      discription,
      rent,
      city,
      landMark: landmark,
      category,
    };

    // Update images if provided
    if (req.files?.image1) {
      updateData.image1 = await uploadCloudinary(req.files.image1[0].path);
    }
    if (req.files?.image2) {
      updateData.image2 = await uploadCloudinary(req.files.image2[0].path);
    }
    if (req.files?.image3) {
      updateData.image3 = await uploadCloudinary(req.files.image3[0].path);
    }

    let updatedListing = await Listing.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(500).json({ message: `UpdateListing error ${error}` });
  }
};

const deleteListing = async (req, res) => {
  try {
    let { id } = req.params;
    let host = req.userId;

    // Check if listing exists and user is the owner
    let listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    if (listing.host.toString() !== host) {
      return res.status(403).json({ message: "Not authorized to delete this listing" });
    }

    await Listing.findByIdAndDelete(id);
    await User.findByIdAndUpdate(host, { $pull: { listing: id } });

    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: `DeleteListing error ${error}` });
  }
};

export { addListing, getListing, updateListing, deleteListing };