const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const app = express()
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
    origin: "*",
    credentials: true
}));


mongoose.connect('mongodb+srv://faiz:2468@cheak.wzeho.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')


const User = mongoose.model('User', {
    title: String,
    content: String,
})

app.post('/profile', (req, res, next) => {

    if (!req.body.title || !req.body.content) {
        res.status(400).send("invlid Data")
        console.log("inviled");
    } else {

        const newUser = new User({
            title: req.body.title,
            content: req.body.content,
        })
        newUser.save().then(() => (
            console.log('profile create'),
            res.send("profile create"))
        );
    }
})


const PORT = 3001

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})