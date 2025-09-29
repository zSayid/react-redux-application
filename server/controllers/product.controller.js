import Product from "../model/product.model.js";

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

export const createProduct = async (req, res) => {
  const {
    product_id,
    brand,
    title,
    Price,
    category,
    rating,
    image_url,
    product_url
  } = req.body;

  const product = await Product.create({
    product_id,
    brand,
    title,
    Price,
    category,
    rating,
    image_url,
    product_url
   
  });
  await product.save();
  res.status(201).json(product);
};
