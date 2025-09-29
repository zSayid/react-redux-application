import express from "express";
// import { protect } from "../middleware/auth.middleware.js";
import { buyProduct, getUserOrders } from "../controllers/order.controller.js";
import EventEmitter from "events";

const router = express.Router();

EventEmitter.defaultMaxListeners = 15;

router.post("/buy", buyProduct); // User must be logged in to buy a course
router.get("/my-orders", getUserOrders); // User must be logged in to view their orders

export default router;
