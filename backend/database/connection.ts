import * as mongoose from 'mongoose';

const db_url = `mongodb://cesarenc:cesar90873@ds211083.mlab.com:11083/post_api`;

const connection = ()=>{
    mongoose.connect(db_url, { useNewUrlParser: true });
};

export {connection};