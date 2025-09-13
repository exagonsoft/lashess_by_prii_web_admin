import { Schema, model, models } from "mongoose";

const StylistSchema = new Schema(
  {
    name: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    picture: { type: String, default: "" }, // URL to profile photo
  },
  { timestamps: true }
);

export default models.Stylist || model("Stylist", StylistSchema);
