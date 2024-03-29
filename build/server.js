import * as express from "express";
import * as mongoose from 'mongoose';
import * as cors from 'cors';
const dotenv = require("dotenv");
dotenv.config();
// routes
const authRoute = require('./Routes/auth');
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("DB loaded"));
const app = express();
app.use(cors());
app.use(express.json());
//Routes 
app.use('/api/user', authRoute);
app.listen(6969, () => {
    console.log('Ayy Ayy Captain');
});
