const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // This serves your static files (HTML, CSS, JS)

// Home Route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post('/send-email', (req, res) => {
  const { email } = req.body;

  // Set up Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this to another email service
    auth: {
      user: 'your-email@gmail.com', // Replace with your email
      pass: 'your-email-password'   // Replace with your email password
    }
  });

  // Set up the email options
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Confirmation Email',
    text: 'You have successfully booked a time slot!'
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send({ error: 'Failed to send email' });
    } else {
      res.status(200).send({ message: 'Email sent successfully' });
    }
  });
});


