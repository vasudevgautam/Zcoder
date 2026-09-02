const Comment = require('../model/comments')
const Solution = require('../model/solution')

const addComment = async (req, res) => {
  try {
    //const { solutionId } = req.params;
    const { content, userId,solutionId, username} = req.body;
    const newComment = new Comment({
      solutionId,
      username,
      userId,
      content
    });
    const savedComment = await newComment.save();
    await Solution.findByIdAndUpdate(solutionId, { $push: { comments: savedComment._id } });
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

const getComments = async (req, res) => {
  try {
    const { solutionId } = req.params;
    const comments = await Comment.find({ solutionId });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get comments' });
  }
};

module.exports = {addComment,getComments};