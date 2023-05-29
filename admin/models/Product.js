import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  cat: { type: String, required: true },
  price: { type: Number, required: true },
  features: { type: [String], required: false },
},{timestamps:true});



export default mongoose.models.Product || mongoose.model('Product',ProductSchema)
