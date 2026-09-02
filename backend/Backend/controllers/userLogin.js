const user = require('../model/user');
const bcrypt = require('bcrypt');

const userSignIn = async (req, res) => {
    let { username, password } = req.body;
    username = username.trim();
    password = password.trim();

    // Check for empty username or password
    if (!username || !password) {
        return res.json({
            status: "Failed",
            message: "Empty credentials supplied."
        });
    }

    try {
        // Check if user exists
        const data = await user.find({ username });
        if (data.length === 0) {
            return res.json({
                status: "Failed",
                message: "Invalid credentials supplied."
            });
        }

        // User exists
        const userData = data[0];

        // Check if user is verified
        if (!userData.verified) {
            return res.json({
                status: "Failed",
                message: "User is not verified. Please sign up or resend verification email."
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, userData.password);
        if (isMatch) {
            return res.json({
                status: "Success",
                message: "Signin successful",
                result: userData
            });
        } else {
            return res.json({
                status: "Failed",
                message: "Invalid password entered."
            });
        }
    } catch (error) {
        return res.json({
            status: "Failed",
            message: "An error occurred during signin.",
            error: error.message
        });
    }
};

module.exports = userSignIn;
