require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require('nodemailer');
const bodyParser =  require("body-parser");


const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));  // JSON request body limit
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));  // URL-encoded data limit
app.use(express.raw({ limit: "50mb" })); 


app.post("/send-mail", async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { to, subject, html,SMTP_EMAIL,SMTP_PASSWORD,attachments } = req.body;
console.log('✌️req.body --->', req.body);

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 587,
    secure: false,
    auth: {
      user: SMTP_EMAIL, // Your Gmail ID
      pass: SMTP_PASSWORD, // App Password
    },
  });

  try {
    await transporter.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html,
      attachments
    });
    console.log('✌️Email sent successfully!');
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending email', error });
  }
})


app.listen(5000, () => console.log("Server running on port 5000"));
