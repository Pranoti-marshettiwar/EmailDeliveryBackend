// // routes/metrics.js
const express = require('express');
const router = express.Router();
const metricsController = require('../controllers/metricsController');

// GET current metrics
router.get('/', metricsController.getMetrics);

// POST update metrics
router.post('/update', metricsController.updateMetrics);

module.exports = router;

