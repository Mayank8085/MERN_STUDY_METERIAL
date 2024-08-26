const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productCardSchema = new mongoose.Schema({
	product: {
		type: ObjectId,
		ref: "Product",
	},
	name: String,
	count: Number,
	price: Number,
});
const ProductCard = mongoose.model("ProductCard", productCardSchema);

const orderSchema = new mongoose.Schema(
	{
		products: [productCardSchema],
		transition_id: {},
		amount: { type: Number },
		status: {
			type: String,
			default: "Recieved",
			Enum: ["Delivered", "Canceled", "Processing", "Shipped", "Recieved"],
		},
		address: String,
		updated: Date,
		user: {
			type: ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = { Order, ProductCard };
