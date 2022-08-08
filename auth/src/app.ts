import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'

import cookieSession from 'cookie-session';

import { signinRouter } from './routes/participant/signin';
import { signoutRouter } from './routes/participant/signout';
import { signupRouter } from './routes/participant/signup';
import { currentUserRouter } from './routes/participant/current-user';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { OrgSigninRouter } from './routes/org/signin';
import { OrgSignoutRouter } from './routes/org/signout';
import { OrgcurrentUserRouter } from './routes/org/current-user';
import cors from 'cors';
import { verifyOrganizerRouter } from './routes/org/verify';

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

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.use(OrgSigninRouter)
app.use(OrgSignoutRouter)
app.use(OrgcurrentUserRouter)
app.use(verifyOrganizerRouter)
//
app.all('*', async (req, res, next) => {
    throw new NotFoundError()
})
app.use(errorHandler)


export { app }