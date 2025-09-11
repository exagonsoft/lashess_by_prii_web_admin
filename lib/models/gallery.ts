import { Schema, model, models } from "mongoose";

const GallerySchema = new Schema(
  {
    imageUrl: { type: String, required: true },
    alt: { type: String, default: "" },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true }, // 🔄 rename
  },
  { timestamps: true }
);

export default models.Gallery || model("Gallery", GallerySchema);
