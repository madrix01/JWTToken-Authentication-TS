import {Application} from "express";
import * as express from "express";
import * as mongoose from 'mongoose';
import * as cors from 'cors';

const dotenv =  require("dotenv");
dotenv.config();

// routes
const authRoute = require('./Routes/auth');
const homeRoute = require('./Routes/home');

mongoose.connect(process.env.DB_CONNECT,
    {useNewUrlParser : true, useUnifiedTopology:true},
    () => console.log("DB loaded")
);

const app: Application = express();

app.use(cors());
app.use(express.json());

//Routes 

app.use('/api/user', authRoute);
app.use('/api', homeRoute);

app.listen(6969, () => {
    console.log('Ayy Ayy Captain');
})

