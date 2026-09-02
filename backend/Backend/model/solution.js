const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  titleSlug: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  solution: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default:[] }],
  topicTags: [
    {
      name: {
        type: String,
        required: true
      },
      slug: {
        type: String,
        required: true
      }
    }
  ],
},{
  timestamps:true
});


const Solution = mongoose.model('Solution', solutionSchema);

module.exports = Solution;
