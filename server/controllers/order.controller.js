import Order from "../model/order.model.js";
import Product from "../model/product.model.js";

export const buyProduct = async (req, res) => {
  const { productId } = req.body;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  const order = await Order.create({
    user: req.user._id,
    product: productId,
  });

  res.status(201).json(order);
};

export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate("product");
  res.json(orders);
};
