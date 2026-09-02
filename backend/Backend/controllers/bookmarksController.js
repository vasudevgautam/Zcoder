const Bookmark = require('../model/bookmarks');



exports.addBookmark = async (req, res) => {
  const { userId, title, titleSlug, language, solution, solutionId, topicTags } = req.body;
  try {
    const existingBookmark = await Bookmark.findOne({ userId, titleSlug });
    if (existingBookmark) {
      // Update existing bookmark with new solution
      existingBookmark.solutions.push({ solutionId, language, solution });
      await existingBookmark.save();
      res.status(201).json(existingBookmark);
    } else {
      // Create new bookmark with single solution
      const bookmark = new Bookmark({
        userId,
        title,
        titleSlug,
        language,
        solutions: [{
          solutionId,
          language,
          solution
        }],
        topicTags
      });
      await bookmark.save();
      res.status(201).json(bookmark);
    }
  } catch (error) {
    res.status(400).json({ error: 'Unable to add bookmark' });
  }
};



exports.deleteBookmark = async (req, res) => {
  const { userId, titleSlug, id } = req.params;
  try {
    const bookmark = await Bookmark.findOne({ userId: `${userId}`, titleSlug: `${titleSlug}` });
    if (!bookmark) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }
    const solutions = bookmark.solutions.filter((solution) => solution.solutionId.toString() !== id);
    if (solutions.length === 0) {
      // If solutions array is empty, delete the entire bookmark document
      await Bookmark.deleteOne({ userId: `${userId}`, titleSlug: `${titleSlug}` });
      res.status(200).json({ message: 'Bookmark deleted successfully' });
    } else {
      await Bookmark.updateOne(
        { userId: `${userId}`, titleSlug: `${titleSlug}` },
        { $set: { solutions } }
      );
      res.status(200).json({ message: 'Solution deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Unable to delete solution' });
  }
};








exports.getBookmarks = async (req, res) => {
  const { userId } = req.params;
  try {
    const bookmarks = await Bookmark.find({ userId }).populate('solutions.solutionId');
    res.json(bookmarks);
  } catch (error) {
    console.error('Error retrieving bookmarks', error);
    res.status(500).json({ error: 'Failed to retrieve bookmarks' });
  }
};
