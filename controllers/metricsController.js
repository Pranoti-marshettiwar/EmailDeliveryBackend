// controllers/metricsController.js
const fs = require('fs');
const path = require('path');

// Path to db.json
const dbPath = path.join(__dirname, '..', 'db.json');

// Helper function to read db.json
const readDB = () => {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
};

// Helper function to write to db.json
const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// GET /api/metrics
exports.getMetrics = (req, res) => {
  try {
    const db = readDB();
    res.json(db.campaignMetrics);
  } catch (error) {
    console.error('Error reading db.json:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// POST /api/metrics/update
/*
  Expected Body:
  {
    "type": "sent" | "failed" | "pending",
    "count": number
  }
*/
exports.updateMetrics = (req, res) => {
  const { type, count } = req.body;

  if (!['sent', 'failed', 'pending'].includes(type)) {
    return res.status(400).json({ error: 'Invalid metric type.' });
  }

  if (typeof count !== 'number' || count < 0) {
    return res.status(400).json({ error: 'Count must be a positive number.' });
  }

  try {
    const db = readDB();

    switch (type) {
      case 'sent':
        db.campaignMetrics.emailsSent += count;
        db.campaignMetrics.emailsPending -= count;
        break;
      case 'failed':
        db.campaignMetrics.emailsFailed += count;
        db.campaignMetrics.emailsPending -= count;
        break;
      case 'pending':
        db.campaignMetrics.emailsPending += count;
        break;
      default:
        break;
    }

    // Ensure emailsPending doesn't go negative
    if (db.campaignMetrics.emailsPending < 0) {
      db.campaignMetrics.emailsPending = 0;
    }

    writeDB(db);
    res.json(db.campaignMetrics);
  } catch (error) {
    console.error('Error updating db.json:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
