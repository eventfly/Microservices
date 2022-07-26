import express, { Request, Response } from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cors from 'cors'


import cookieSession from 'cookie-session';

import { errorHandler } from './middlewares/error-handler';
import { currentUser } from './middlewares/current-user';

import { NotFoundError } from './errors/not-found-error';
import { orgSignupRouter } from './routes/org-signup';
import { createEventRouter } from './routes/create-event';
import { createStaffRouter } from './routes/create-staff';
import { getEventRouter } from './routes/get-event';


const app = express()
app.use(cors({origin: '*'}));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    next(); 
})

// app.set('trust proxy', true)
app.use(json())
app.use(
    cookieSession({
        signed: false,
        secure: true
    })
)
app.use(currentUser)
app.use(orgSignupRouter)
app.use(createEventRouter)
app.use(createStaffRouter)
app.use(getEventRouter)

app.all('*', async (req, res, next) => {
    throw new NotFoundError()
})
app.use(errorHandler)


export { app }