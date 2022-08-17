import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'

import cookieSession from 'cookie-session';


import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import cors from 'cors';
import { addPostRouter } from './routes/add-post';


const app = express()

app.use(cors({origin: '*'}));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Expose-Headers', 'Access-Token, Uid')

    next(); 
})



// app.set('trust proxy', true) // trust first proxy
app.use(json())

app.use(addPostRouter);

//
app.all('*', async (req, res, next) => {
    throw new NotFoundError()
})
app.use(errorHandler)


export { app }