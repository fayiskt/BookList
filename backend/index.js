import express, { response } from "express";
import { PORT, mongDBURL } from "./config.js";
import mongoose from "mongoose";
import {Book} from './models/bookModel.js';
import bookRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());

//Middleware for handling CORS POLICY
//Option 1 : Allow all origin
app.use(cors());
// //Option2: Custom origin
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }));

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