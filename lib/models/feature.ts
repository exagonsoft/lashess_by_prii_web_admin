import { Schema, model, models } from "mongoose";

const FeatureSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true }, // could be icon name or URL
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true }, // 🔄 rename "published" → "active" for consistency
  },
  { timestamps: true }
);

export default models.Feature || model("Feature", FeatureSchema);
