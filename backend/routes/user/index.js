const { createApiKey, linkAccount } = require("../../controllers/user/user.controller");
const {tokenMiddleware, protectedRouteMiddleware} = require("../../middlewares/auth.middleware");

const router = require("express").Router();

router.post("/create-api-key", tokenMiddleware, createApiKey);
router.post("/link-account", linkAccount);



module.exports = router;