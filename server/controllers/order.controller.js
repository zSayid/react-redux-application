import Order from "../model/order.model.js";
import Course from "../model/course.model.js";

export const buyCourse = async (req, res) => {
  const { courseId } = req.body;

  const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });

  const order = await Order.create({
    user: req.user._id,
    course: courseId,
  });

  res.status(201).json(order);
};

export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate("course");
  res.json(orders);
};
