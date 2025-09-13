import { Schema, model, models } from "mongoose";

const OfferSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    active: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    startsAt: { type: Date },
    endsAt: { type: Date },
  },
  { timestamps: true }
);

OfferSchema.index({ order: 1 });

export default models.Offer || model("Offer", OfferSchema);

