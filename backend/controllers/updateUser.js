import { User } from "../db.js";
import { updateBody } from "../utils/userValidation.js";

export const updateUser = async (req, res) => {
    const { success } = updateBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: "Invalid Inputs"
        })
    }
    console.log(req.body)
    console.log(req.userID)

    await User.updateOne({ _id: req.userId }, { $set: req.body })

    res.status(200).json({
        message: "User Updated Successfully"
    })
}