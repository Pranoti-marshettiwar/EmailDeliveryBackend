const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "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");

module.exports = sgMail;