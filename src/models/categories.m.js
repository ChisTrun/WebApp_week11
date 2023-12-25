const db = require('../database/db');

module.exports = class Categories {
    constructor(obj) {
        this.CatID = obj.CatID;
        this.CatName = obj.CatName;
    }
    static async getAll() {
        try {
            const data = await db.execute('SELECT * FROM "Categories"');
            return data.map((c) => {
                return new Categories(c);
            })
        } catch (error) {
            next(error);
        };
    }
    static async getByCatID(id) {
        try {
            const data = await db.execute(`SELECT * FROM "Categories" WHERE "CatID" = ${id}`);
            return data.map((c) => {
                return new Categories(c);
            })
        } catch (error) {
            next(error);
        };
    }
    static async updateCat(obj) {
        try {
            await db.execute(`UPDATE public."Categories"
                                    SET  "CatName"='${obj.CatName}'
                                    WHERE "CatID"=${parseInt(obj.CatID)};`);
            return true;
        } catch (error) {
            throw error;
        }
    }
    static async addCat(obj) {
        try {
            await db.execute(`INSERT INTO public."Categories"(
                            "CatID", "CatName")
                            VALUES (${parseInt(obj.CatID)}, '${obj.CatName}');`);
            return true;
        } catch (error) {
            throw error;
        }
    }
    static async removeCat(obj) {
        try {
            await db.execute(`DELETE FROM public."Categories"
                            WHERE "CatID" = ${parseInt(obj.CatID)};`);
            return true;
        } catch (error) {
            throw error;
        }
    }

}