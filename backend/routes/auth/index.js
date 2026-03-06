const { login, register, profile } = require("../../controllers/auth/auth.controller");
const {tokenMiddleware, protectedRouteMiddleware} = require("../../middlewares/auth.middleware");

const router = require("express").Router();

router.post("/login", login)
router.post("/register", register)
router.get("/profile", tokenMiddleware, profile)


module.exports = router;