import mongoose from 'mongoose';


const orderSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    course: {type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true},
    createdAt: {type: Date, default: Date.now}
});

const Order = mongoose.model("Order", orderSchema);
export default Order;