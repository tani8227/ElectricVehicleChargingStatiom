import mongoose from "mongoose";
import User from "../user.js";

const EVBunkLocationSchema = new mongoose.Schema(
  {
    evbunkname: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    operatingHours: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    admin_ref: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create a geospatial index on the `location` field
EVBunkLocationSchema.index({ "location.coordinates": "2dsphere" });

const EVBunk = mongoose.model("EVBunk", EVBunkLocationSchema);
export default EVBunk;
