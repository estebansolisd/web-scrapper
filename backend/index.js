const express = require('express');
const bodyParser = require('body-parser');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const cors = require("cors");
const authenticate = require("./middleware/authenticate");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.get('/me', authenticate, (req, res) => {
  const { email } = req.user;
  return res.status(200).json({ email });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
