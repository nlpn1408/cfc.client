const express = require("express")
const User = require("./user.model")
const generateToken = require("../middleware/generateToken")
const router = express.Router()
const verifyToken = require("../middleware/verifyToken");

//Register User
router.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password, } = req.body
        const user = new User({
            firstName,
            lastName,
            email,
            password,
        })

        await user.save()
        res.status(201).json({
            message: "User created successfully"
        })
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

//Login User
router.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            return res.status(401).json({
                message: "Passwords not match"
            })
        }

        const token = await generateToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        })

        res.status(200).json({
            message: "User logged in successfully",
            token,
            user: {
                _id: user._id,
                email: user.email,
                role: user.role,
                profileImage: user.profileImage,
                bio: user.bio,
                profession: user.profession,
            }
        })

    } catch (error) {

        console.log('Error:', error);
        res.status(500).json({
            message: "Something went wrong"
        })

    }
})

// logout user endpoint
router.post("/logout", async (req, res) => {
    try {
        res.clearCookie("token")
        res.status(200).json({
            message: "User logged out successfully"
        })
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

// dellete user 
router.delete("/user/:id", async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        res.status(200).json({
            message: "User deleted successfully"
        })
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

//all user 
router.get("/user", async (req, res, next) => {
    try {
        const users = await User.find({}, "id email role").sort({ createdAt: -1 })
        res.status(200).json({
            message: "Users fetched successfully",
            users
        })
    } catch (error) {
        console.log('Error:', error);
        next(error)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

// update user
router.put("/update-user/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { email, password, role } = req.body
        const user = await User.findByIdAndUpdate(id, { email, password, role }, { new: true })
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        res.status(200).json({
            message: "User updated successfully",
            user
        })
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

// edit user
router.patch("/edit-profile/:id", async (req, res) => {
    try {
        const { id } = req.params
        const { firstName, lastName, phone, profileImage, bio, profession } = req.body
        const user = await User.findByIdAndUpdate(id, {
            firstName,
            lastName,
            phone,
            profileImage,
            bio,
            profession
        }, { new: true })
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        // update profile
        if(firstName !== undefined) user.firstName = firstName
        if(lastName !== undefined) user.lastName = lastName
        if(phone !== undefined) user.phone = phone
        if(profileImage !== undefined) user.profileImage = profileImage
        if(bio !== undefined) user.bio = bio
        if(profession !== undefined) user.profession = profession

        await user.save()
        res.status(200).json({
            message: "User updated successfully",
            user
        })
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
})

module.exports = router