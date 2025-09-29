import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product_id: { type: String, required: true, unique: true },
  brand: { type: String, required: true },
  title: { type: String, required: true },
  Price: { type: Number, required: true },
  category: { type: String, required: true },
  rating: { type: Number, default: 0 },
  image_url: {type: String, required: true},
  product_url: {type: String, required: true}
});

const Course = mongoose.model("Amazon", productSchema);
export default Course;
