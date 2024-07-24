const express = require('express');
const mongoose = require('mongoose')
const URL = require('./model/url');
require('dotenv').config()
const PORT = process.env.PORT

const app = express();

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('MongoDb connected'))

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const data = await URL.findOne({ shortId });
    res.redirect(data.redirectUrl)
});

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
