const User = require("../../models/user.model");
const { generateSignInToken } = require("../../utils/jwt");
const {
  decryptPassword,
  encryptPassword,
} = require("../../utils/passwordEncryption");

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        code: 400,
        error: "All fields are required",
        status: "failed",
      });
    }
    const userExists = await User.findOne({ email });

    if (
      !userExists ||
      !(await decryptPassword(password, userExists.password))
    ) {
      return res.status(404).json({
        code: 404,
        error: "No account found",
        status: "failed",
      });
    }

    // send token
    const token = generateSignInToken(userExists._id, userExists.role);
    if (!token) {
      return res.status(500).json({
        code: 500,
        error: "Internal Server error",
        status: "failed",
      });
    }

    return res.status(200).json({
      code: 200,
      msg: "Login Successful",
      status: "successful",
      token,
    });
  }

  static async register(req, res) {
    const { email, password, firstName, lastName, organizationName } = req.body;

    if (!email || !password || !firstName || !lastName || !organizationName) {
      return res.status(400).json({
        code: 400,
        error: "All fields are required",
        status: "failed",
      });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        code: 400,
        error: "User already exists",
        status: "failed",
      });
    }

    const hashedPassword = await encryptPassword(password);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      organizationName,
    });

    const token = generateSignInToken(newUser._id, newUser.role);
    if (!token) {
      return res.status(500).json({
        code: 500,
        error: "Internal Server error",
        status: "failed",
      });
    }

    return res.status(201).json({
      code: 201,
      status: "success",
      msg: "Registered successfully",
      token,
    });
  }

  static async profile(req, res) {
    const { id } = req.user;
    const user = await User.findById(id).select("-password");
    return res.status(200).json({
        code: 200,
        status:"success",
        user
    })
  }
}

module.exports = AuthController;
