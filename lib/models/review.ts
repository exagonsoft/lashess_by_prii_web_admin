import { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema(
  {
    name: { type: String, required: true },
    text: { type: String, required: true },
    avatarUrl: { type: String, default: "" },
    active: { type: Boolean, default: true }, // 🔄 rename
  },
  { timestamps: true }
);

export default models.Review || model("Review", ReviewSchema);
