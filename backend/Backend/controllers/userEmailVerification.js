const UserVerification = require('../model/userVerification');
const bcrypt = require('bcrypt');
const User = require('../model/user');
const { sendVerificationEmail } = require('./sendVerificationEmail');

const userEmailVerification = async (req, res) => {
    try {
        const { userId, uniqueString } = req.params;

        // Check if user verification record exists
        const result = await UserVerification.findOne({ userId });

        if (!result) {
            // User verification record doesn't exist
            const message = "User verification data does not exist. Either already verified or need to sign up.";
            return res.redirect(`/user/verification/failed?error=true&message=${message}`);
        }

        const { expiresAt, uniqueString: hashedUniqueString } = result;
        const expiresAtTimestamp = new Date(expiresAt).getTime();
        const currentTimestamp = Date.now();

        if (expiresAtTimestamp < currentTimestamp) {
            // Link is expired
            await UserVerification.deleteOne({ userId });
            await User.deleteOne({ _id: userId });
            const message = 'Link expired. Please sign up again.';
            return res.redirect(`/user/verification/failed?error=true&message=${message}`);
        }

        // Link is still valid, compare unique strings
        const match = await bcrypt.compare(uniqueString, hashedUniqueString);
        if (match) {
            // Strings match, update user verified status
            await User.updateOne({ _id: userId }, { verified: true });
            await UserVerification.deleteOne({ userId });
            return res.redirect(`/user/verified`);
        } else {
            // Strings do not match
            const message = "Invalid verification link, please check your inbox.";
            return res.redirect(`/user/verification/failed?error=true&message=${message}`);
        }
    } catch (error) {
        console.error(error);
        const message = "An error occurred during the verification process.";
        return res.redirect(`/user/verification/failed?error=true&message=${message}`);
    }
};

module.exports = { userEmailVerification };
