import express, { Request, Response } from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cors from 'cors'

import cookieSession from 'cookie-session';

import { errorHandler } from './middlewares/error-handler';
import { currentUser } from './middlewares/current-user';

import { NotFoundError } from './errors/not-found-error';
import { getEventsRouter } from './routes/get-events';
import { editEventRouter } from './routes/edit-events';
import { getEventDataRouter } from './routes/get-eventData';
import {removeStaffRouter} from './routes/remove-staff'
import {addRoleRouter} from './routes/add-role'
import {editRoleRouter} from './routes/edit-role'
import {removeRoleRouter} from './routes/remove-role'

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
app.use(getEventsRouter);
app.use(editEventRouter);
app.use(getEventDataRouter);
app.use(removeStaffRouter)
app.use(addRoleRouter)
app.use(editRoleRouter)
app.use(removeRoleRouter)

app.all('*', async (req, res, next) => {
    throw new NotFoundError()
})
app.use(errorHandler)


export { app }