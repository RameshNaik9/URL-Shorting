const express = require('express');
const cors = require('cors'); // Import cors
const { connectToMongoDB } = require('./connect');
const urlRoutes = require('./routes/urlRoutes');
const URL = require('./models/urlModel');
const logger = require('./utils/logger');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

// Serve the static files from the React app
// app.use(express.static(path.join(__dirname, 'url-shortening-frontend/build')));


const databaseUrl = process.env.MONGODB_URI;
connectToMongoDB(databaseUrl)
  .then(() => logger.info('MongoDB connected'))
  .catch((error) => logger.error('Failed to connect to MongoDB', error));

// Use CORS to allow cross-origin requests
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use('/url', urlRoutes);

app.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;
  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $inc: { visitCount: 1 },
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
      { new: true }
    );

    if (entry) {
      logger.info(`Redirecting to ${entry.redirectURL}`);
      res.redirect(entry.redirectURL);
    } else {
      logger.warn(`URL not found for shortId: ${shortId}`);
      res.status(404).json({ error: 'URL not found' });
    }
  } catch (error) {
    logger.error('Error processing request', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/url-shortening-frontend/build/index.html'));
// });


app.listen(PORT, () => logger.info(`Server started at PORT: ${PORT}`));

app.get('/', (req, res) => {
  res.send('hello');
});
