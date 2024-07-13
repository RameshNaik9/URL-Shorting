const URL = require('../models/urlModel');
const shortid = require('shortid');
const logger = require('../utils/logger');

const handleGenerateNewShortURL = async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    const shortID = shortid.generate();

    try {
        const newUrl = await URL.create({
            shortId: shortID,
            redirectURL: url,
            visitHistory: [],
        });
        logger.info(`Short URL generated: ${shortID} for ${url}`);
        return res.json({ id: shortID, originalUrl: url });
    } catch (error) {
        logger.error('Error creating short URL', error);
        return res.status(500).json({ error: 'Error creating short URL' });
    }
};

const getAllURLs = async (req, res) => {
  try {
    const urls = await URL.find();
    return res.json(urls);
  } catch (error) {
    return res.status(500).json({ error: 'Error fetching URLs' });
  }
};

module.exports = { handleGenerateNewShortURL ,getAllURLs};
