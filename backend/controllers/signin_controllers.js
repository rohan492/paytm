import { User } from "../db.js";
import { signinBody } from "../utils/userValidation.js";
import jwt from "jsonwebtoken";

export const signin = async (req, res) => {
    const { email, password } = req.body;
    const { success } = signinBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: "Incorrect Inputs"
        })
    }

    const existingUser = await User.findOne({
        email,
        password
    })
    if (!existingUser) {
        return res.status(411).json({
            message: "User - Password Combination does not exist"
        })
    }

    const userID = existingUser._id;

    const token = jwt.sign({
        userID
    }, process.env.JWT_SECRET)

    return res.status(200).json({
        token
    })
}