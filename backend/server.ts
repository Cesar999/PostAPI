import * as express from 'express';
import * as bodyParser from 'body-parser';

import {connection} from './database/connection';

import {loginPost, registerPost, secretGet, authenticator, createPostPost, readPostGet, addCommentPost, updateCommentPost, deleteCommentPost} from './routes/routes';

import * as cookieParser from 'cookie-parser';

//Coonect to DataBase
connection();

//Server Express
const app = express();

const port = 3000;

app.listen(port, () => {
    console.log(`Server On Port ${port}`);
});

app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//Routes
app.post('/login', loginPost);
app.post('/register', registerPost);

app.get('/secret', authenticator(), secretGet);

app.post('/createPost', authenticator(), createPostPost);

app.get('/readPosts', authenticator(), readPostGet);

app.post('/addComment',authenticator(), addCommentPost);

app.post('/updateComment', authenticator(), updateCommentPost);

app.post('/deleteComment', authenticator(), deleteCommentPost);
