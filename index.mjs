import express from 'express'
import { BlogPost, comments, childcomment } from './dberror/module.mjs'
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

    if (!req.body.title) {

        res.status(400).send("invlid Data")


    } else {

        const blogPost = new BlogPost({
            title: req.body.title,
        })
        blogPost.save().then((data) => {

            res.send("profile create")

        }).catch((err) => {
            console.log(err, "error");
        })
    }

})

server.get('/profile', (req, res) => {
    BlogPost.find({},
        (err, doc) => {
            if (!err) {
                res.send(doc)
            } else {
                res.send(err)
            }
        })

})

server.post('/comment', (req, res, next) => {
    if (!req.body.comment) {

        res.send("invailed data")

    } else {
        const comment = new comments({
            comment: req.body.comment
        })

        const savedComment = comment.save()

        BlogPost.findOne({ title: "attari" },
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



server.get('/pp/:id', (req, res) => {
    console.log(req.params.id);
    BlogPost.findById(req.params.id)
        .populate('comments')
        .then(doc => {
            res.send(doc.comments)
        }).catch(err => {
            console.log(err);
        })

})


server.post('/childcomment', (req, res) => {

    if (!req.body.childComment) {
        res.send("Invailed Data")
    } else {
        const childComments = new childcomment({
            childcomment: req.body.childComment
        })
        childComments.save()

        comments.findOne({ comment: 'Raza attari' },
            (err, doc) => {
                if (err) {
                    console.log(err);
                } else {
                    var b = doc.childcomments.push(childComments)
                    doc.save()
                    res.send(doc)
                    console.log(doc);
                }
            }
        )
    }
})

server.get('/childcomment', (req, res) => {

    comments.findOne({ comment: 'Raza attari' })
        .populate('childcomments')
        .then((doc) => {
            res.send(doc)
            console.log(doc, "as");
        })
})




server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})