import { User } from "../db.js";
import jwt from "jsonwebtoken";
import { signupBody } from "../utils/userValidation.js";

export const signup = async (req, res) => {
    const { email, firstName, lastName, password } = req.body;

    const { success } = signupBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: "Incorect inputs"
        })
    }

    const existingUser = await User.findOne({
        email
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already exists"
        })
    }

    const user = await User.create({
        email,
        firstName,
        lastName,
        password
    })

    const userID = user._id;
    const token = jwt.sign({
        userID
    }, process.env.JWT_SECRET);

    res.status(200).json({
        message: "User Created Successfully",
        token
    });
}