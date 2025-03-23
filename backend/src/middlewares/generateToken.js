const jwt = require('jsonwebtoken');
const User = require('../users/user.model');

const generateToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new Error('User not found')
        }
        const token = jwt.sign({ userId: user._id, role: user.role },
            process.env.JWT_SECRET, { expiresIn: '1h' })
        return token
    } catch (error) {
        console.log('Error:', error);

    }
}

module.exports = generateToken
