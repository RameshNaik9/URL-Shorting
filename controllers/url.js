const shortid = require("shortid");
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    const { url } = req.body; 
    if (!url) {
        return res.status(400).json({ error: 'url is required' });
    }
    const shortID = shortid.generate();

    try {
        const newUrl = await URL.create({
            shortId: shortID,
            redirectURL: url,
            visitHistory: [],
        });
        return res.json({ id: shortID }); 
    } catch (error) {
        return res.status(500).json({ error: 'Error creating short URL' });
    }
}

module.exports = { handleGenerateNewShortURL };
