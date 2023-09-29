const express = require('express');
const router = express.Router();
const { UserWebsite, WebsiteLink } = require('../models');
const { getTitleFromUrl, getLinksFromUrl } = require('../utils/scrapper');
const websiteLinksRouter = require('../routes/website-links');


router.use('/:userId/websites/:websiteId', websiteLinksRouter);

// Endpoint to add a website URL for a user
router.post('/:userId/websites', async (req, res) => {
  try {
    const { url } = req.body;
    const { userId } = req.params;
    const name = await getTitleFromUrl(url);
    
    const userWebsite = await UserWebsite.create({
      url,
      name,
      UserId: userId,
    });

    const linksData = await getLinksFromUrl(url, userWebsite.id);

    const WebsiteLinks = await WebsiteLink.bulkCreate(linksData)

    res.json({ userWebsite, WebsiteLinks });
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