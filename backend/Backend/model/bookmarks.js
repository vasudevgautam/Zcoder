const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
  solutions: [
    {
      solutionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Solution',
        required: true
      },
      language: {
        type: String,
        required: true
      },
      solution: {
        type: String,
        required: true
      }
    }
  ],
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
  ]
}, { timestamps: true });

module.exports = mongoose.model('Bookmark', BookmarkSchema);
