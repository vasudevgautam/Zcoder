const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      },
      verified: {
        type: Boolean,
        default: false
      },
      followers: {
        type: [String],
        required: false,
        default: null
      },
      techStacks: {
        type: [String]
      },
      languages: {
        type: [String]
      },
      friends: {
        type: [String]
      },
      codeforceshandles :{
        type : [String]
      }

})

const User = mongoose.model('User', userSchema);

module.exports = User