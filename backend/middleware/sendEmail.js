const nodemailer = require("nodemailer");
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_SERVICE,
    port: 587,
    service: process.env.SERVICE,
    secure: false,
    auth: {
      user: process.env.HOST_USER,
      pass: process.env.HOST_USER_PASS,
    },
  });

  const mailOptions = {
    from: `${process.env.COMPANY} <${process.env.HOST_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
