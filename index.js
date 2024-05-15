const express = require ("express");
const {connectToMongoDB} =require("./connect");
const urlRoute = require('./routes/url');
const URL = require('./models/url');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT ;

const databaseUrl = process.env.MONGODB_URI ;
connectToMongoDB(databaseUrl)
    .then(() => console.log("Mongodb connected"))
    .catch((error) => console.error("Failed to connect to MongoDB", error));


app.use(express.json());
app.use("/url" , urlRoute);
app.get('/:shortId', async (req, res) => {
  const { shortId } = req.params;
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
    res.redirect(entry.redirectURL);
  } else {
    res.status(404).send('URL not found');
  }
});


app.listen(PORT,()=> console.log(`Server Started at PORT:${PORT}`));
app.get('/',(req,res)=>{
    res.send('hello')
});