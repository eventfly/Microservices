import express, { Request, Response } from 'express'
import 'express-async-errors'
import { json } from 'body-parser'

import cookieSession from 'cookie-session';

import { errorHandler } from './middlewares/error-handler';
import { currentUser } from './middlewares/current-user';

import { NotFoundError } from './errors/not-found-error';
import { orgSignupRouter } from './routes/org-signup';

const app = express()
app.set('trust proxy', true) // trust first proxy
app.use(json())
app.use(
    cookieSession({
        signed: false,
        secure: true
    })
)
app.use(currentUser)
app.use(orgSignupRouter)

app.all('*', async (req, res, next) => {
    throw new NotFoundError()
})
app.use(errorHandler)


export { app }