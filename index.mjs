import express from 'express'
import { BlogPost, comments } from './dberror/module.mjs'
import { PORT } from './core/index.mjs'
import bodyParser from 'body-parser'
import cors from 'cors'


const server = express()
server.use(express.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(cors({
    origin: "*",
    credentials: true
}));

server.post('/blogPost', (req, res, next) => {

    if (!req.body.title || !req.body.content) {

        res.status(400).send("invlid Data")


    } else {

        const blogPost = new BlogPost({
            title: req.body.title,
            content: req.body.content,
        })

        blogPost.save().then((data) => {

            res.send("profile create")

        }).catch((err) => {
            console.log(err, "error");
        })
    }

})


server.post('/comment', (req, res, next) => {
    if (!req.body.comment) {

        res.send("invailed data")

    } else {
        const comment = new comments({
            comment: req.body.comment
        })

        const savedComment = comment.save()

        BlogPost.findOne({ title: "Raza" },
            (err, doc) => {
                if (err) {
                    console.log(err, "error");
                } else {

                    const blogPostChild = doc.comments.push(comment)
                    doc.save()
                    console.log(doc, "doc");
                    res.send(doc)

                }
            }
        )
    }
})



server.get('/', (req, res) => {
    BlogPost.findOne({ title: 'Raza' })
        .populate('comments')
        .then(doc => {
            res.send(doc)
        })
    // ,
    //     async (err, doc) => {
    // if (doc) {
    //     var a = await doc.populate('comments')
    //     console.log(a);
    // } else {
    //     console.log(err);

    // }
    // }
    // )
})









server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})