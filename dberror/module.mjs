import mongoose from 'mongoose';
import { dbURI } from '../core/index.mjs'
const { Schema } = mongoose;

// var dbURI = "mongodb+srv://faiz:2468@cheak.wzeho.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// ////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////

// mongoose.connect(dbURI)

export const BlogPost = mongoose.model('BlogPost', {
    title: String,
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
})

export const comments = mongoose.model('Comment', {
    comment: String,
    childcomments: [{ type: Schema.Types.ObjectId, ref: 'Chilcomment' }]
})

export const childcomment = mongoose.model('Chilcomment', {
    childcomment: String
})