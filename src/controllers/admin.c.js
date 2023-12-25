const categories = require('../models/categories.m')
const product = require('../models/product.m')
const order = require('../models/order.m')
require('dotenv').config()

module.exports = {
    getAdmin: async  (req,res,next) => {
        try {
            const catData = await categories.getAll();
            const proData = await product.getAllPaging(4,1);
            const orderData = await order.getAll();
            res.render('adminView',{host: process.env.HOST,port: process.env.PORT,user: req.user,catData: catData,proData: proData,orderData: orderData});
        } catch (error) {
            next(error);
        };
    }
}