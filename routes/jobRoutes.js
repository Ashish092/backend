const express = require('express');
const router = express.Router();
const { createJob, getJobs, updateJobStatus, deleteJob } = require('../controllers/jobController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public route - no auth required
router.post('/', createJob);

// Protected admin routes
router.route('/')
  .get(protect, admin, getJobs);

router.route('/:id/status')
  .patch(protect, admin, updateJobStatus);

router.route('/:id')
  .delete(protect, admin, deleteJob);

module.exports = router; 