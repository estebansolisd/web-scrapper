const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    console.log(user, "user from db");
    const payload = { id: user.id };
    console.log(payload, "payload");
    const token = jwt.sign(payload, process.env.JWT_SECRET || "JWT_SECRET", {
      expiresIn: '8h',
    });

    

    res.json({ token, user });
  } catch (error) {
    console.error(error, "login");
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  login,
};
