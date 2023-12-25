const db = require('../database/db');

module.exports = class Order {
    constructor(obj) {
        this.OrderID = obj.OrderID;
        this.OrderDate = obj.OrderDate;
        this.UserID = obj.UserID;
        this.Total = obj.Total;
    }
    static async getAll() {
        try {
            const data = await db.execute('SELECT * FROM "Orders"');
            return data.map((c) => {
                return new Order(c);
            })
        } catch (error) {
            next(error);
        };
    }
    static async detail(OrderID) {
        try {
            const data = await db.execute(`SELECT "ProName", o."Quantity", o."Price", "Amount"
                                            FROM public."OrderDetails" o join "Products" p on o."ProID" =  p."ProID"
                                            WHERE o."OrderID" = ${OrderID};`)
            return data;
        } catch (error) {
            console.log(error);
        };
    }
}