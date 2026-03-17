const User = require("../../models/user.model");
const generateApiKey = require("../../utils/apiKey");
const dotenv = require("dotenv");

dotenv.config();

class UserController {
  static async createApiKey(req, res) {
    const { id } = req.user;
    const user = await User.findById(id);
    const apiKey = generateApiKey(id, user.firstName);
    if (user.apiKey) {
      return res.status(400).json({
        code: 400,
        error: "An Api already exist",
        status: "failed",
      });
    }

    user.apiKey = apiKey;
    await user.save();

    return res.status(201).json({
      code: 201,
      msg: "Api Key Created successfully",
      status: "success",
      apiKey,
    });
  }

  static async linkAccount(req, res) {
    const { email, otp, userId } = req.query;
    if (!email) {
      return res.status(400).json({
        code: 400,
        error: "Email is required",
        status: "failed",
      });
    }
    let url;

    if (email && otp && userId) {
      // verify otp
      url = process.env.BANK_URI + "/api/v1/auth/verify-otp";
      const response = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (!data?.token) {
        return res.status(500).json({
          code: 500,
          error: data.msg,
          status: "failed",
        });
      } else {
        const user = await User.findById(userId);
        ((user.blinkpay_account_email = email),
          (user.blinkpay_account_number = data.account.acc_number));
        await user.save();

        return res.status(201).json({
          code: 201,
          status: "success",
          message: "Account linked successfully",
        });
      }
      // Link to kairo payment db
    }

    url = process.env.BANK_URI + "/api/v1/auth/passwordless-login";
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!data?.otp) {
      console.log(data);
      return res.status(500).json({
        code: 500,
        error: data.msg,
        status: "failed",
      });
    }

    return res.status(200).json({
      code: 200,
      status: "success",
      message: data.msg,
      otp: data.otp,
    });
  }

  //   static async verifyOtp(req, res) {
  //     const { email, otp } = req.query;
  //     if (!email) {
  //       return res.status(400).json({
  //         code: 400,
  //         error: "Email is required",
  //         status: "failed",
  //       });
  //     }
  //     if (!otp) {
  //       return res.status(400).json({
  //         code: 400,
  //         error: "Otp is required",
  //         status: "failed",
  //       });
  //     }
  //   }
}

module.exports = UserController;
