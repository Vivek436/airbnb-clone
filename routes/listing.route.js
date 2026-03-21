import express from "express";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";
import { addListing, getListing, updateListing, deleteListing } from "../controllers/listing.controller.js";

let listingRoute = express.Router();
listingRoute.post(
  "/add",
  isAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  addListing
);
listingRoute.get("/get", getListing);
listingRoute.put(
  "/update/:id",
  isAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  updateListing
);
listingRoute.delete("/delete/:id", isAuth, deleteListing);

export default listingRoute;
