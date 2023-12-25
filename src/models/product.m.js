const db = require('../database/db');

module.exports = class Product {
    constructor(obj) {
        this.ProID = parseInt(obj.ProID);
        this.ProName = obj.ProName;
        this.TinyDes = obj.TinyDes;
        this.FullDes = obj.FullDes;
        this.Price = parseFloat(obj.Price);
        this.CatID = parseInt(obj.CatID);
        this.Quantity = parseInt(obj.Quantity);
    }
    static async getAll() {
        try {
            const data = await db.execute(`SELECT * FROM "Products" ORDER BY "ProID";`);
            return data.map((p) => {
                return new Product(p);
            })
        } catch (error) {
            throw error;
        }
    }
    static async getAllPaging(per_page, page) {
        try {
            const limit = parseInt(per_page);
            const offset = limit * (parseInt(page) - 1);
            const total = (await db.execute(`SELECT count(*) FROM "Products"`))[0].count;
            const data = await db.execute(`SELECT * FROM "Products" ORDER BY "ProID" limit ${limit} offset ${offset} `);
            return {
                per_page: per_page,
                page: page,
                totalPage: Math.ceil(total / per_page),
                products: data.map((p) => {
                    return new Product(p);
                })
            }
        } catch (error) {
            throw error;
        }
    }
    static async getProByID(id) {
        try {
            const data = await db.execute(`SELECT * FROM "Products" WHERE "ProID" = ${id}`);
            return data.map((p) => {
                return new Product(p);
            })
        } catch (error) {
            throw error;
        }
    }
    static async getProByCatID(per_page, page, catID) {
        try {
            const limit = parseInt(per_page);
            const offset = limit * (parseInt(page) - 1);
            const total = (await db.execute(`SELECT count(*) FROM "Products"  WHERE "CatID" = ${catID}`))[0].count;
            const data = await db.execute(`SELECT * FROM "Products" WHERE "CatID" = ${catID} ORDER BY "ProID" limit ${limit} offset ${offset}`);
            return {
                per_page: per_page,
                page: page,
                totalPage: Math.ceil(total / per_page),
                products: data.map((p) => {
                    return new Product(p);
                })
            }
        } catch (error) {
            throw error;
        }
    }
    static async updateProduct(obj) {
        try {
            await db.execute(`UPDATE "Products"
                            SET "ProName"='${obj.ProName}', "TinyDes"='${obj.TinyDes}', "FullDes"='${obj.FullDes}', "Price"=${parseFloat(obj.Price)},"CatID"=${parseInt(obj.CatID)} , "Quantity"=${parseInt(obj.Quantity)}
                            WHERE "ProID"=${parseInt(obj.ProID)};`);
            return true;
        } catch (error) {
            throw error;
        }
    }
    static async addProduct(obj) {
        try {
            await db.execute(`INSERT INTO public."Products"(
                "ProID", "ProName", "TinyDes", "FullDes", "Price", "CatID", "Quantity")
                VALUES (${parseInt(obj.ProID)}, '${obj.ProName}', '${obj.TinyDes}', '${obj.FullDes}', ${parseFloat(obj.Price)}, ${parseInt(obj.CatID)}, ${parseInt(obj.Quantity)});`)
            return true;
        } catch (error) {
            throw error;
        }
    }
    static async removeProduct(obj) {
        try {
            await db.execute(`DELETE FROM public."Products"
                             WHERE "ProID" = ${parseInt(obj.ProID)};`);
            return true;
        } catch (error) {
            throw error;
        }
    }

}