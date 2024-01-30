import express, { response } from "express";
import { PORT, mongDBURL } from "./config.js";
import mongoose from "mongoose";
import {Book} from './models/bookModel.js';
import bookRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.get('/', (req, res)=>{
    console.log(req);
    return res.status(234).send('welcome');
})

app.use('/books', bookRoute);

mongoose
    .connect(mongDBURL)
    .then(()=>{
        console.log('App connected to database');
        app.listen(PORT, ()=>{
            console.log(`App is listening to port : ${PORT}`);
        })
    })
    .catch((err)=>{
        console,log(err);
    });
