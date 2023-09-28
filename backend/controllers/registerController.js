const { User } = require('../models');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const { password: userPassword, ...user } = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "JWT_SECRET", {
      expiresIn: '8h',
    });

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' + JSON.stringify(error) });
  }
};

module.exports = {
  register,
};
