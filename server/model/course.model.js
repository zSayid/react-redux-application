import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  Course_ID: { type: String, required: true, unique: true },
  Course_Name: { type: String, required: true },
  Category: { type: String, required: true },
  Duration: { type: String, required: true },
  Enrolled_Students: { type: Number, default: 0 },
  Completion_Rate: { type: Number, default: 0 },
  Platform: { type: String, required: true },
  Price: { type: Number, required: true },
  Rating: { type: Number, default: 0 },
});

const Course = mongoose.model("Course", courseSchema);
export default Course;
