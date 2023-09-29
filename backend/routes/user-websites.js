const express = require('express');
const router = express.Router();
const { UserWebsite, WebsiteLink } = require('../models');

// Endpoint to add a website URL for a user
router.post('/:userId/websites', async (req, res) => {
  try {
    const { url } = req.body;
    const { userId } = req.params;

    const userWebsite = await UserWebsite.create({
      url,
      UserId: userId,
    });

    res.json(userWebsite);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint to get website URLs for a user
router.get('/:userId/websites', async (req, res) => {
  try {
    const { userId } = req.params;

    const userWebsites = await UserWebsite.findAll({
      where: { UserId: userId },
      include: WebsiteLink,
    });

    res.json(userWebsites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;