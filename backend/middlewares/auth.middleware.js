const { isValidObjectId } = require("mongoose");
const User = require("../models/user.model");
const { verifySignInToken } = require("../utils/jwt");


function tokenMiddleware (req, res, next) {
    const header  = req.headers['authorization'];
    const token = header && header.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            code: 401,
            error: "Token is missing",
            status: "failed"
        })
    }

    const {error, decoded} = verifySignInToken(token);
    if (error) {
        return res.status(401).json({
            code: 401,
            error,
            status: "failed"
        })
    }
    req.user = decoded;

    next();
   
}

function protectedRouteMiddleware (req, res, next) {
    const {role} = req.user;
    if (role !== "admin") {
        return res.status(401).json({
            code: 401,
            error: "Unatuhorized - You don't have access to this",
            status: "failed"
        })
    }
    next();
}

async function verifyApiKey (req, res, next) {
    const header = req.headers['x-api-key'];
    if (!header) {
         return res.status(401).json({
             code: 401,
            error: "Api Key is required",
            status: "failed"
        });
    }
    
    if (!String(header).startsWith("api") || !String(header).includes("-")){
        console.log("1, failed here")
         return res.status(401).json({
             code: 401,
            error: "Api Key is invalid",
            status: "failed"
        });
    }
    const apiKey = header && header.split('-')[1];
    if (!apiKey) {
        console.log("2, failed here")
        return res.status(401).json({
            code: 401,
            error: "Api Key is invalid",
            status: "failed"
        });
    }
    if (!isValidObjectId(apiKey)) {
        console.log("3, failed here")
        return res.status(401).json({
             code: 401,
            error: "Api Key is Invalid",
            status: "failed"
        });
    }
    const userId = apiKey;
    const user = await User.findById(userId);
    if (!user) {
        console.log("4, failed here")
         return res.status(401).json({
             code: 401,
            error: "Api Key is Invalid",
            status: "failed"
        })
    }
    req.user = user;
    next()
}

module.exports = {tokenMiddleware, protectedRouteMiddleware, verifyApiKey};