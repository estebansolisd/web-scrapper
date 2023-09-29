const express = require('express');
const router = express.Router();
const { WebsiteLink } = require('../models');

// Endpoint to add a link for a website
router.post('/:websiteId/links', async (req, res) => {
  try {
    const { url } = req.body;
    const { websiteId } = req.params;

    const websiteLink = await WebsiteLink.create({
      url,
      UserWebsiteId: websiteId,
    });

    res.json(websiteLink);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint to get links for a website
router.get('/:websiteId/links', async (req, res) => {
  try {
    const { websiteId } = req.params;

    const websiteLinks = await WebsiteLink.findAll({
      where: { UserWebsiteId: websiteId },
    });

    res.json(websiteLinks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;