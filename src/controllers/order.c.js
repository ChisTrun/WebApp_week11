const Order = require('../models/order.m');

module.exports = {
    getAll: async (req,res,next) => {
        try {
            const data = await Order.getAll();
            res.json(data);
        } catch (error) {
            next(error);
        };
    },
    detail: async (req,res,next) => {
        try {
            const data = await Order.detail(req.params.OrderID);
            res.json(data);
        } catch (error) {
            next(error);
        };
    },
}