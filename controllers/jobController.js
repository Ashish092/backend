const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  try {
    const jobData = {
      ...req.body,
      bookingNo: req.body.bookingNo || `BK${Date.now()}${Math.floor(Math.random() * 1000)}`
    };

    const job = new Job(jobData);
    const savedJob = await job.save();
    
    res.status(201).json(savedJob);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(400).json({ 
      message: 'Failed to create job', 
      error: error.message 
    });
  }
};

// Get all jobs
exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch jobs'
        });
    }
};

// Update job status
exports.updateJobStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const job = await Job.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }

        res.json({
            success: true,
            data: job
        });
    } catch (error) {
        console.error('Error updating job status:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update job status'
        });
    }
};

// Delete job
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }

        res.json({
            success: true,
            message: 'Job deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete job'
        });
    }
}; 