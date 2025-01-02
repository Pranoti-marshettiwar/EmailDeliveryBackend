const sgMail = require("../models/config/sendgrid");

exports.sendSingleEmail = async (to, subject, body) => {
  const msg = {
    to,
    from: "pranumarshettiwar@gmail.com", // Replace with a verified email
    subject,
    text: body,
    html: body,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error("SendGrid error:", error.response?.body || error.message);
    throw new Error("Failed to send email");
  }
};
