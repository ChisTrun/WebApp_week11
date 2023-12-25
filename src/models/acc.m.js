const db = require('../database/db')

module.exports = class User {
    constructor(obj) {
        this.username = obj.Username;
        this.password = obj.Password;
        this.name = obj.Name;
        this.email = obj.Email;
        this.dob = obj.DOB;
        this.permission = parseInt(obj.Permission);
    }
    static async findUser(username) {
        try {
            let rs = await db.execute(`SELECT * FROM "Users" WHERE "Username" = '${username}';`);
            const data =  rs.map( (u) => {
                return new User(u)
            });
            return data[0];
        } catch (error) {
            throw (error)
        };
    }

    static async findUserById(id) {
        try {
            let rs = await db.execute(`SELECT * FROM "user" WHERE "id" = '${id}';`);
            return rs[0];
        } catch (error) {
            throw (error)
        };
    }
    static async addNewUser(user) {
        try {
            await db.execute(`INSERT INTO "user"(
                                "id", "accesstoken", "provider")
                                VALUES (${user.id}, '${user.accesstoken}', '${user.provider}');`)
            return true;
        } catch (error) {
            throw (error)
        };
    }

    static async addUser(signUpInfor) {
        try {
            let maxId = (await db.execute(`SELECT MAX("ID") FROM "Users"`))[0].max;
            let newId = maxId == null ? 1 : maxId + 1;
            await db.execute(`INSERT INTO "Users"(
                                "ID", "Username", "Password", "Name", "Email", "DOB", "Permission")
                                VALUES (${newId}, '${signUpInfor.username}', '${signUpInfor.password}', '${signUpInfor.name}', '${signUpInfor.email}',' ${signUpInfor.dob}', ${signUpInfor.permission});`)
            return true;
        } catch (error) {
            throw error;
        };

    }
}