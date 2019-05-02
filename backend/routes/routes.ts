import {User, Post, Comment} from '../database/schemas';
import * as jwt from 'jsonwebtoken';
import * as mongoose from 'mongoose';

function createToken(name, id){
    const payload = {username: name, _id: id};
    const secret = 'secret';
    const signOptions = {expiresIn:  "12h"};
    const token = jwt.sign(payload, secret, signOptions);
    return token;
}

async function loginPost (req, res){
    const name = req.body.username;
    const pass = req.body.password;

    try{
        const userExists = await User.findOne({username: name});
        if(!userExists){
            res.status(200).send({msg: 'User Does Not Exist'});
            return;
        }

        if(userExists.password === pass){
            const token = createToken(name, userExists._id);
            res.cookie('token', token, { maxAge: 900000, httpOnly: true });
            res.status(200).send({msg: 'Login Succesfully'});
            return;
        } else {
            res.status(200).send({msg: 'Wrong Password'});
            return;
        }
    } catch(e){
        console.log(e, 'CUSTOM ERROR');
    }
}


async function registerPost (req, res){
    const name = req.body.username;
    const pass = req.body.password;
    const conf = req.body.conf_password;
    console.log({name, pass, conf});
    try{
        const userExists = await User.findOne({username: name});
        if(userExists){
            res.status(200).send({msg: 'User Already Register'});
            return;
        }
    
        if(pass !== conf){
            res.status(200).send({msg: 'Passwords Do Not Match'});
            return;
        }

        const newUser = new User({
            username: name,
            password: pass
        });

        const userSaved = await newUser.save();
        if(userSaved){
            res.status(200).send({msg: 'Registration Succesfully'});
            return;
        } else {
            res.status(200).send({msg: 'Something Went Wrong'});
            return;
        }

    } catch(e){
        console.log(e, 'ERROR CUSTOM');
    }

}

const authenticator = () => {
    return (req, res, next) => {
      if ('token' in req.cookies) {
        let token = req.cookies['token'];
        try{
            let decoded = jwt.verify(token, 'secret');
            res.locals.user = {username: decoded.username, _id: decoded._id};
            next();
        } catch(e){
            console.log(e);
            res.status(200).send({msg: 'No Authenticated', auth: false});
        }
      } else {
        res.status(200).send({msg: 'No Authenticated', auth: false});
      }
    }
  }

function secretGet(req, res){
    console.log(res.locals.user, 'USER');
    res.send({msg: 'Authenticated', auth: true, _id: res.locals.user._id});
}

async function createPostPost(req, res){
    const title = req.body.title;
    const body = req.body.body;
    const user = res.locals.user;
    const newPost = new Post({
        title,
        body,
        author: mongoose.Types.ObjectId(user._id)
    });
    try{
        const savedPost = await newPost.save();
        const updatedUser = await User.updateOne(
            {username: user.username}, 
            { $push: {posts: mongoose.Types.ObjectId(savedPost._id)}});
    
        res.status(200).send({msg: 'Post Succesfully Created'});    
    } catch(e){
        res.status(200).send({msg: 'Create Post Error'});    
    }
}

async function readPostGet(req, res){
    const user = res.locals.user;
    try{
        const posts = await Post.find({})
        .select('title body author comments data _id')
        .populate({
          path: 'author',
          select: 'username -_id',
          model: 'User'
        })
        .populate({
          path: 'comments',
          select: 'content author _id',
          model: 'Comment',
          populate: {
            path: 'author',
            select: 'username _id',
            model: 'User'
          }
        })
        res.status(200).send({posts, msg: 'Get Post Succesfully'});    
    } catch(e){
        res.status(200).send({msg: 'Get Post Error'});    
    }
}

async function addCommentPost(req, res){
    console.log(req.body);
    const comment = req.body.comment;
    const post_id = req.body.post_id;
    const user = res.locals.user;

    const newComment = new Comment({
      content: comment,
      post: mongoose.Types.ObjectId(post_id),
      author: mongoose.Types.ObjectId(user._id)
    });

    try {
      const savedComment = await newComment.save();
      const updatePost = await Post.updateOne({_id: mongoose.Types.ObjectId(post_id)}, { $push: {comments: mongoose.Types.ObjectId(savedComment._id)}});
      const updateUser = await User.updateOne({_id: mongoose.Types.ObjectId(user._id)}, { $push: {comments: mongoose.Types.ObjectId(savedComment._id)}});
      res.status(200).send({msg: 'Comment Saved'});
    } catch(e) {
      console.log(e);
      res.status(200).send({msg: 'Comment Not Saved'});
    }
    
}

async function updateCommentPost(req, res){
    console.log(req.body);
    const comment = req.body.commentUpdate;
    const post_id = req.body.comment_id;
    try{
        await Comment.updateOne({_id: post_id}, {$set:{'content': comment}})
        res.status(200).send({msg: 'Comment Update'});
    } catch(e){
        res.status(200).send({msg: 'Comment Failed to Update'});
    }
}

async function deleteCommentPost(req, res){
    console.log(req.body);
    const c_id = req.body.comment_id
    const u_id = req.body.author_id
    const p_id = req.body.post_id
    try{
        await Comment.deleteOne({_id: c_id});
        await User.updateOne({_id: u_id}, {$pull:{comments: c_id}});
        await Post.updateOne({_id: p_id}, {$pull:{comments: c_id}})
        res.status(200).send({msg: 'Comment Deleted'});
    } catch(e){
        res.status(200).send({msg: 'Comment Not Deleted'});
    }
    
}

export {loginPost, registerPost, secretGet, authenticator, createPostPost, readPostGet, addCommentPost, updateCommentPost, deleteCommentPost};