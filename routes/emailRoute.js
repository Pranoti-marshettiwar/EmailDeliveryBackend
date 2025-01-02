const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");

router.post("/send-email", emailController.sendEmail);
router.post("/queue-emails", emailController.addToQueue);

module.exports = router;
