const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

const salt = Number(process.env.SALT_ROUNDS); 

const encryptPassword = async (password) => {
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
}

const decryptPassword = async (password, hashedPassword) => {
    const decrypted = await bcrypt.compare(password, hashedPassword);
    return decrypted;
}


module.exports = {
    encryptPassword,
    decryptPassword
}