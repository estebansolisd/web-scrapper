const jwt = require('jsonwebtoken');
const { User } = require("../models");

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(" ")?.[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'JWT_SECRET', async (err, { id }) => {
    console.log({err, id}, "err and id");
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }


    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticate;