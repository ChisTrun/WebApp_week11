const Categories = require('../models/categories.m');

module.exports = {
    getAll: async (req,res,next) => {
        try {
            const data = await Categories.getAll();
            res.json(data);
        } catch (error) {
            next(error);
        };
    },
   
    getByCatID: async (req,res,next) => {
        try {
            const data = await Categories.getByCatID(req.params.CatID);
            res.json(data);
        } catch (error) {
            next(error);
        };
    },

    removeCat: async (req,res,next) => {
        try {
            const obj = req.body;
            await Categories.removeCat(obj);
            res.redirect('/admin');
        } catch (error) {
            next(error);
        }
    },
    updateCat:  async (req,res,next) => {
        try {
            const obj = req.body;
            await Categories.updateCat(obj);
            res.redirect('/admin');
        } catch (error) {
            next(error)
        }
    },
    addCat: async (req,res,next) => {
        try {
            const obj = req.body;
            await Categories.addCat(obj);
            res.redirect('/admin');
        } catch (error) {
            next(error)
        }
    }

}