const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

function generateSignInToken(id, role) {
    const payload = {role, id}
    const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: "1h",
    });

    return token;
}
function verifySignInToken(token) {
   const verifiedToken =  jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return {error: "Invalid or expired token"}
        }
        return {decoded}
    });
    return verifiedToken
}

module.exports = {
    generateSignInToken,
    verifySignInToken
}