const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 8080;

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

// POST route to send email
app.post('/send-email', async (req, res) => {
  const { email } = req.body;

  // Log the email that is being sent to for debugging
  console.log(`Sending email to: ${email}`);

  // Set up Nodemailer transporter with correct Outlook configuration
  const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
      user: 'testRehapiano@outlook.com', // Your Outlook email
      pass: 'rehapiano123*'   // Your Outlook password
    }
  });

  // Define email options
  const mailOptions = {
    from: 'testRehapiano@outlook.com',  // Make sure the 'from' email is correct
    to: email,
    subject: 'Confirmation Email',
    text: 'You have successfully booked a time slot!'
  };

  // Try to send the email and handle errors properly
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully: ${info.response}`);  // Log success
    res.status(200).send({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);  // Log the error for debugging
    res.status(500).send({ error: 'Failed to send email' });
  }
});

