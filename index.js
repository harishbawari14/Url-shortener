const express = require('express');
const urlRoute = require('./routes/router');
const { connectToMongoDB } = require('./connect');
const URL = require('./models/url')
const path = require('path')
const app = express();
const port = 3000;

// connect
connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then (()=> console.log('MongoDB Connected'))

// for server side rendering
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.get("/test", async(req,res)=>{
    const allUrls = await URL.find({});
    return res.render('home',{
        urls: allUrls,
    });
});
 
// Middlewares
app.use(express.json());

// Route
app.use("/url", urlRoute);

app.get('/url/:shortId', async (req, res)=>{
const shortId = req.params.shortId;
const entry = await URL.findOneAndUpdate(
    {
         shortId
        },
    {
        $push: {
            visitHistory: {
              timestamp:Date.now(),
            },
        },
    }
);
    res.redirect(entry.redirectUrl);
});

app.listen(port, () => console.log(`Server started at port:${port}`));
