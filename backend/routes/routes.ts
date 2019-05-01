import {User, Post} from '../database/schemas';
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
    res.send({msg: 'Authenticated', auth: true});
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

export {loginPost, registerPost, secretGet, authenticator, createPostPost};