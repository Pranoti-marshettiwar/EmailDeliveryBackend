const emailService = require("../controllers/services/emailService");
const logger = require('../logger');
let emailQueue = [];
let isProcessing = false;

// Send a single email
exports.sendEmail = async (req, res) => {
  const { to, subject, body } = req.body;

  if (!to || !subject || !body) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await emailService.sendSingleEmail(to, subject, body);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error.message);
    logger.error(`Error sending email: ${error.message}`, { stack: error.stack });
    res.status(500).json({ error: "Failed to send email" });
  }
};

// Add emails to the queue
exports.addToQueue = (req, res) => {
  const { emails, subject, body } = req.body;

  if (!emails || emails.length === 0 || !subject || !body) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  emails.forEach((email) => {
    emailQueue.push({ to: email, subject, body });
  });

  if (!isProcessing) {
    processEmailQueue();
  }

  res.status(200).json({ message: "Emails added to the queue" });
};

// Process the email queue
async function processEmailQueue() {
  isProcessing = true;

  while (emailQueue.length > 0) {
    const email = emailQueue.shift();
    try {
      await emailService.sendSingleEmail(email.to, email.subject, email.body);
      console.log(`Email sent to ${email.to}`);
    } catch (error) {
      console.error(`Failed to send email to ${email.to}:`, error.message);
      logger.error(`Error sending email: ${error.message}`, { stack: error.stack });
    }

    // Add delay between sends
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 second delay
  }

  isProcessing = false;
}
const emailValidator = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate emails before processing
exports.uploadEmails = (req, res) => {
  const { emails } = req.body; // Assume an array of emails is being uploaded

  if (!Array.isArray(emails) || emails.length === 0) {
    return res.status(400).json({ error: 'No emails provided or invalid format.' });
  }

  const invalidEmails = emails.filter(email => !emailValidator(email));

  if (invalidEmails.length > 0) {
    return res.status(400).json({ 
      error: 'Invalid email addresses detected.', 
      invalidEmails 
    });
  }

  // Process valid emails
  res.status(200).json({ message: 'Emails uploaded successfully!' });
};
