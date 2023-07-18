const router = require("express").Router();
const userSchema = require("./validator");
const validator = require("../../middlewares/validator");
const { findAll, getCurrentUser, createUser, login, logout } = require("./controller");
const {authorize, isAdmin} = require("../../middlewares/auth");

router.get("/", authorize, isAdmin, findAll);
router.get("/me", authorize, getCurrentUser);
router.get("/logout", logout);
router.post('/', validator(userSchema), createUser);
router.post("/login", login);

module.exports = router;