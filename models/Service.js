import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    duration: { type: String },
    price: { type: Number, required: true, min: 0 },
    level: { type: String  },
    quantity: { type: String},
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);  
