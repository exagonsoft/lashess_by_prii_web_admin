import { Schema, model, models } from "mongoose";

const ServiceSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    durationMin: { type: Number, default: 60 },
    active: { type: Boolean, default: true },
    imageUrl: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Service || model("Service", ServiceSchema);
