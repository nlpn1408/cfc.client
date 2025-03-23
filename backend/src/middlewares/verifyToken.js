const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token
        // const token = req.headers["authorization"].split(" ")[1]

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
        req.userId = decoded.userId
        req.role = decoded.role
        next()

    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

module.exports = verifyToken