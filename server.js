//Main server file for url shortener back end

//I'm using the import statement rather than require, as this has been set up as a "type":"module" in the package.json

//---EXPRESS----------//

import express from 'express';
const app = express();

//----------CORS------------//
import cors from 'cors';
app.use(cors());

// Body Parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
import urlsRouter from './routes/urls.js';
import indexRouter from './routes/index.js';

app.use('/api', urlsRouter)
app.use('/', indexRouter)
// .env
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

// Connect to PORT
const PORT = process.env.PORT || 8000;


app.listen(PORT, ()=> {
    console.log(`Server listening at  PORT :${PORT}`);
});



//------------MONGOOSE DB Initialization-----//
//My Atals connection is done in this file
import connectDB from './config/db.js';
import mongoose from 'mongoose';


connectDB(); //Connection to MongoDB

