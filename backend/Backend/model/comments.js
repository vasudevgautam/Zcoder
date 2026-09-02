const mongoose = require('mongoose');

// Comment schema
const commentSchema = new mongoose.Schema({
  solutionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Solution', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username:{type:String, required: true},
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;