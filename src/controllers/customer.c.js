const categories = require('../models/categories.m')
const product = require('../models/product.m')
const order = require('../models/order.m')
require('dotenv').config()

module.exports = {
    getCustomer: async  (req,res,next) => {
        try {
            // const catData = await categories.getAll();
            const proData = await product.getAll();
            // const orderData = await order.getAll();
            res.render('customerPage',{host: process.env.HOST,port: process.env.PORT,proData: proData});
        } catch (error) {
            next(error);
        };
    }
}