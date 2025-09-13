import { Schema, model, models } from "mongoose";

const ToolUsageSchema = new Schema(
  {
    toolId: { type: Schema.Types.ObjectId, ref: "Tool", required: true },
    name: { type: String },
    quantity: { type: Number, required: true },
    unit: { type: String },
  },
  { _id: false }
);

const BookingSchema = new Schema(
  {
    serviceId: { type: Schema.Types.ObjectId, ref: "Service" },
    customerName: { type: String, required: true },
    customerEmail: { type: String },
    serviceName: { type: String, required: true },
    stylistName: { type: String },
    scheduledAt: { type: Date, required: true },
    status: {
      type: String,
      enum: ["scheduled", "canceled", "processed"],
      default: "scheduled",
    },
    price: { type: Number },
    toolsUsed: { type: [ToolUsageSchema], default: [] },
    notes: { type: String },
  },
  { timestamps: true }
);

BookingSchema.index({ scheduledAt: -1 });

export default models.Booking || model("Booking", BookingSchema);
