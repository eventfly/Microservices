import express, { Request, Response } from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cors from 'cors'

import { errorHandler } from './middlewares/error-handler';

import { NotFoundError } from './errors/not-found-error';
import { orgSignupRouter } from './routes/org-signup';
import { createEventRouter } from './routes/create-event';
import { createStaffRouter } from './routes/create-staff';
import { getEventRouter } from './routes/get-event';
import { createTagRouter } from './routes/create-tag';
import { getTagsRouter } from './routes/get-tags';
import { editProfileRouter } from './routes/edit-profile';
import { getStaffRouter } from './routes/get-staff';


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

// app.set('trust proxy', true)
app.use(json())
app.use(orgSignupRouter)
app.use(createEventRouter)
app.use(createStaffRouter)
app.use(getEventRouter)
app.use(createTagRouter)
app.use(getTagsRouter)
app.use(editProfileRouter)
app.use(getStaffRouter)

app.all('*', async (req, res, next) => {
    throw new NotFoundError()
})
app.use(errorHandler)


export { app }