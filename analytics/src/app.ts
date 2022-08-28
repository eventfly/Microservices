import express, { Request, Response } from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cors from 'cors'

import cookieSession from 'cookie-session';

import { errorHandler } from './middlewares/error-handler';
import { currentUser } from './middlewares/current-user';

import { NotFoundError } from './errors/not-found-error';
import { orderedEventsRouter } from './routes/ordered-events';
import { searchByLocationRouter } from './routes/search-by-location';
import { searchByQueryRouter } from './routes/search-by-query';
import { orderedEventsNoLocationRouter } from './routes/ordered-events-no-location';

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


app.set('trust proxy', true) // trust first proxy
app.use(json())
app.use(
    cookieSession({
        signed: false,
        secure: true
    })
)
app.use(currentUser);
app.use(orderedEventsRouter);
app.use(searchByLocationRouter)
app.use(searchByQueryRouter)
app.use(orderedEventsNoLocationRouter)

app.all('*', async (req, res, next) => {
    throw new NotFoundError()
})
app.use(errorHandler)


export { app }