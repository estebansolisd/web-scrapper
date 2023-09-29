const axios = require('axios');
const cheerio = require('cheerio');

async function getTitleFromUrl(url) {
  try {
    let title = url;
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    title = $('title').text(); // Assuming the title is wrapped in <title> tags
    return title;
  } catch (error) {
    console.error('Error:', error);
    throw error; // You can handle the error as needed
  }
}
async function getLinksFromUrl(url, UserWebsiteId) {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Get all the links and their text content
    const links = $('a')
      .map((i, el) => {
        const url = $(el).attr('href');
        const name = $(el).text();
        return { url, name, UserWebsiteId };
      })
      .get();

    return links;
  } catch (error) {
    console.error('Error:', error);
    throw error; // You can handle the error as needed
  }
}

module.exports = {getTitleFromUrl, getLinksFromUrl};