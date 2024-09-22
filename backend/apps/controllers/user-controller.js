const { validationResult } = require("express-validator")
const User = require("../models/user-model")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userController = {}
userController.forgotPassword = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status.json({ errors: errors.Array() })
    }
    const body = req.body
    try {
        const user = await User.findOne({ email: body.email })
        if (!user) {
            res.status(404).json("user not found")
        }
        else {

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "ravi.kumargowda2429@gmail.com",
                    pass: "gatp blle kcoc ztnc",
                },
            });
            const mailOptions = {
                from: "ravi.kumargowda2429@gmail.com",
                to: body.email,
                subject: "Reset password",
                html: `
                <p>To reset your password, please click the button below:</p>
                <a href="http://localhost:3000/resetPassword/${user._id}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">Reset Password</a>
            `,
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    res.status(200).json({ message: "password reset link sent to your email" })
                }
            })


        }
    }
    catch (err) {
        res.status(400).json({ error: "something went wrong" })
    }
}
userController.register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const salt = await bcryptjs.genSalt()
        const hashPassword = await bcryptjs.hash(req.body.password, salt)
        const body = req.body
        
        body.password = hashPassword
        const user = await User.create(body)

        return res.status(201).json(user)
    }
    catch (err) {
        res.status(400).json({ error: err })
    }

}
userController.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        console.log(req.body)
        const user = await User.findOne({ email: req.body.email });
        console.log(user)
        if (!user) {
            return res.status(400).json( "Invalid password or email" );
        }
        const isMatch = await bcryptjs.compare(req.body.password, user.password);
        if (!isMatch) {
            
            return res.status(400).json( "Invalid password or email");
        }
        const tokenData = {
            id: user._id,
          
        };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });
        if (!token) {
            console.log(failed)
            return res.status(500).json({ error: "Failed to generate token" });
        }
        console.log(token)
        res.status(200).json({ token, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

userController.resetPassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId } = req.params;
    const { password } = req.body;


    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const salt = await bcryptjs.genSalt();
        const hashPassword = await bcryptjs.hash(password, salt);
        user.password = hashPassword;

        await user.save();
        res.status(200).json({ message: "Password reset successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

module.exports = userController