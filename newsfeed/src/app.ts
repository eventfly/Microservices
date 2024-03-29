import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'

import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import cors from 'cors';
import { addPostRouter } from './routes/add-post';
import { addCommentRouter } from './routes/add-comment';
import { getCommentRouter } from './routes/get-comment';
import { getAllPostsRouter } from './routes/get-all-posts';
import { getFeedRouter } from './routes/get-feed';
import { getPostRouter } from './routes/get-post';
import { getAllEventsRouter } from './routes/get-all-events';
import { editLikeRouter } from './routes/edit-like';
import { answerPostRouter } from './routes/edit-answer';
import { deletePostRouter } from './routes/delete-post';
import { getActivityRouter } from './routes/get-activity';
import { getAllActivityRouter } from './routes/get-all-activity';


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

app.use(getFeedRouter);
app.use(getActivityRouter);
app.use(getPostRouter);
app.use(addPostRouter);
app.use(addCommentRouter);
app.use(getCommentRouter);
app.use(getAllPostsRouter);
app.use(getAllEventsRouter);
app.use(editLikeRouter);
app.use(answerPostRouter);
app.use(getAllActivityRouter);
app.use(deletePostRouter);



//
app.all('*', async (req, res, next) => {
    throw new NotFoundError()
})
app.use(errorHandler)


export { app }