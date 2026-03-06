const User = require("../../models/user.model");
const generateApiKey = require("../../utils/apiKey");

class UserController {
    static async createApiKey (req, res) {
        const {id} = req.user;
        const user = await User.findById(id);
        const apiKey = generateApiKey(id, user.firstName);
        if (user.apiKey) {
            return res.status(400).json({
                code: 400,
                error: "An Api already exist",
                status: "failed"
            })
        }

        user.apiKey = apiKey;
        await user.save();
        
        return res.status(201).json({
            code: 201,
            msg: "Api Key Created successfully",
            status: "success",
            apiKey
        })
    }
}


module.exports = UserController