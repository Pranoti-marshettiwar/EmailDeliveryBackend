const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.example.com', // Replace with your SMTP host
  port: 587,
  auth: {
    user: 'your-email@example.com',
    pass: 'your-password',
  },
});

async function sendEmail(to, subject, body) {
  await transporter.sendMail({
    from: 'your-email@example.com',
    to,
    subject,
    html: body,
  });
}
