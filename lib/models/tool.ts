import { Schema, model, models } from "mongoose";

const ToolSchema = new Schema(
  {
    name: { type: String, required: true },
    sku: { type: String },
    stock: { type: Number, default: 0 },
    unit: { type: String, default: "pcs" },
    type: { type: String, default: "" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ToolSchema.index({ name: 1 }, { unique: false });

export default models.Tool || model("Tool", ToolSchema);
