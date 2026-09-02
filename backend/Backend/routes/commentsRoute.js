const express = require('express')

const {addComment,getComments} = require('../controllers/commentsController')

const router = express.Router()

// Add a comment to a solution
router.post('/comments/:solutionId', addComment);

// Get comments for a solution
router.get('/comments/:solutionId', getComments);

module.exports = router;