const { Order, ProductCard } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
	Order.findById(id)
		.populate("products.product", "name price")
		.exec((err, order) => {
			if (err) {
				return res.status(400).json({
					error: "No order found",
				});
			}
			req.order = order;
			next();
		});
};

//create
exports.createOrder = (req, res) => {
	req.body.order.user = req.profile;
	const order = new Order(req.body.order);
	order.save((err, order) => {
		if (err) {
			return res.status(400).json({
				error: "failed to save order in DB",
			});
		}
		res.json(order);
	});
};
exports.getAllOrder = (req, res) => {
	Order.find()
		.populate("user", "_id name")
		.exec((err, orders) => {
			if (err) {
				return res.status(400).json({
					error: "No order placed",
				});
			}
			res.json(orders);
		});
};

//status
exports.getOrderStatus = (req, res) => {
	res.json(Order.schema.path("status").enumValue);
};
exports.updateStatus = (req, res) => {
	Order.update(
		{ _id: req.body.orderId },
		{ $set: { status: req.body.status } },
		(err, status) => {
			if (err) {
				return res.status(400).json({
					error: "Not able to update order status",
				});
			}
			res.json(status);
		}
	);
};
