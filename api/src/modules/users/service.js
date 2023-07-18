const argon = require("argon2");
const jwt = require("jsonwebtoken");
const {ApiError} = require("../../middlewares/error");

module.exports = (model) => {
    return {
        registerNewUser: async (data) => {
            const [user] = await model.getByEmail(data.email);
            if (user) throw new ApiError({ status: 400, message: "email already exists" });

            data.password = await argon.hash(data.password);
            const result = await model.insertUser(data);
            return result;
        },
        retrieveUsers: async () => {
            return model.getAll();
        },
        retrieveUserById: async (id) => {
            return model.getById(id);
        },
        authenticate: async ({email, password}) => {
            if (!email || !password) throw new ApiError({ status: 400, message: "Please specify both email and password"});

            const [user] = await model.getByEmail(email);
            if (!user) throw new ApiError({ status: 400, message: "Invalid email" });

            if (await argon.verify(user.password, password)) {
                const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_AUTH_SECRET, { expiresIn: "1h" });
                return {user, token};
            }
            else
                throw new ApiError({ status: 400, message: "invalid password" });
        }
    }
}