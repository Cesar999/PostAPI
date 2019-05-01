import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
    }]
});

const postSchema = new Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    data: {type: Date, default: Date.now},
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const commentSchema = new Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    data: {type: Date, default: Date.now},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
});

const User = mongoose.model('user', userSchema);
const Post = mongoose.model('post', postSchema);
const Comment = mongoose.model('comment', commentSchema);

export {User, Post, Comment};