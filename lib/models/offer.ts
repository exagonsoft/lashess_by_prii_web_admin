import { Schema, model, models } from "mongoose";

const OfferSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    type: {
      type: String,
      enum: ["date", "discount", "generic"],
      default: "generic",
    },
    discount: { type: Number },
    startsAt: { type: Date },
    endsAt: { type: Date },
  },
  { timestamps: true }
);

// ✅ Clear cached model before redefining
delete models.Offer;

export default model("Offer", OfferSchema);
