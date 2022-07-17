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
import { OrgSignupRouter } from './routes/org/signup';
import { OrgSignoutRouter } from './routes/org/signout';
import { OrgcurrentUserRouter } from './routes/org/current-user';

const app = express()
app.set('trust proxy', true) // trust first proxy
app.use(json())
app.use(
    cookieSession({
        signed: false,
        secure: true
    })
)
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.use(OrgSigninRouter)
app.use(OrgSignupRouter)
app.use(OrgSignoutRouter)
app.use(OrgcurrentUserRouter)
//
app.all('*', async (req, res, next) => {
    throw new NotFoundError()
})
app.use(errorHandler)


export { app }