import express, { Request, Response } from 'express'
import 'express-async-errors'
import { json } from 'body-parser'

import cookieSession from 'cookie-session';
import { createTicketRouter } from './routes/new';
import { errorHandler } from './middlewares/error-handler';
import { currentUser } from './middlewares/current-user';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes';
import { updateTicketRouter } from './routes/update';
import { NotFoundError } from './errors/not-found-error';

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
app.use(createTicketRouter)
app.use(showTicketRouter)
app.use(indexTicketRouter)
app.use(updateTicketRouter)

app.all('*', async (req, res, next) => {
    throw new NotFoundError()
})
app.use(errorHandler)


export { app }