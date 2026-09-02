const express = require('express');
const { postSolution, getSolutionsByTitleSlug, getUserSubmissions } = require('../controllers/solutionController');

const router = express.Router();

router.post('/solutions', postSolution);
router.get('/solutions/:titleSlug',getSolutionsByTitleSlug);
router.get('/solutions/byUser/:userId',getUserSubmissions)
module.exports = router;
