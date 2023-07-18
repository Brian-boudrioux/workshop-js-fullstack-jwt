const model = require("./model");
const userService = require("./service")(model);

const findAll = async (req, res, next) => {
    try {
        const users = await userService.retrieveUsers();
        res.status(200).json(users);
    } catch (err) {
        next(err)
    }
}

const getCurrentUser = async (req, res, next) => {
    try {
        const [user] = await userService.retrieveUserById(req.idUser);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}

const createUser = async (req, res, next) => {
    try {
        const { username, email, role } = req.body;
        const result = await userService.registerNewUser(req.body);
        res.status(201).json({ id: result.insertId, username, email, role });
    } catch (err) {
        next(err);
    }
};

const login = async (req, res , next) => {
    try {
        const {user, token} = await userService.authenticate(req.body);
        res.cookie("access_token", token, { httpOnly: true, secure: process.env.NODE_ENV == "production" });
        res.status(200).json({ email: req.body.email, id: user.id, role: user.role });
    } catch (err) {
        next(err);
    }

}

const logout = ({res}) => {
    res.clearCookie("access_token").sendStatus(200);
}

module.exports = { findAll, getCurrentUser, createUser, login, logout };