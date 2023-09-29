const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET || "JWT_SECRET", {
      expiresIn: '8h',
    });

    res.json({ user, token });
  } catch (error) {
    console.error(error, "register");
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  register,
};
