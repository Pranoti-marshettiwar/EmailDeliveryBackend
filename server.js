const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const emailRoutes = require("./routes/emailRoute");
const dbPath = './db.json';
const metricsRoutes = require('./routes/metricsRoute');
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Mock database route
const jsonServer = require('json-server');
const router = jsonServer.router('db.json');
app.use('/api', router);




app.use('/campaignMetrics', metricsRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Campaign Metrics Dashboard Backend');
});

  

// Authentication routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

app.use("/emails", emailRoutes);
 const aiRoutes = require('./routes/aiRoute');
 app.use('/ai', aiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
