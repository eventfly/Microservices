import express, { Request, Response } from 'express';
import { currentUser } from '../middlewares/current-user';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';
import { body } from 'express-validator';

import { Post } from '../models/post';
import { Activity } from '../models/activity';

const router = express.Router();

router.put('/api/newsfeed/post/:id/answer', 
    currentUser, 
    requireAuth, 
    [], 
    validateRequest, async (req: Request, res: Response) => {

        const  { id } = req.params;
        const { quiz_answers , poll_answers } = req.body;

        const post = await Post.findById(id);

        let activity = await Activity.findOne({
            post_id: id,
            user_id: req.currentUser!.id
        });

        if (!post) {
            throw new Error('Post not found');
        }

        if (!activity) {
            activity = Activity.build({
                post_id: id,
                user_id: req.currentUser!.id,
            });

            await activity.save();
        }

        if (poll_answers) {
            
            var idx = 0;

            poll_answers.forEach(async (poll_answer : any) => {
                
                let { index, is_selected } = poll_answer;

                if (!index){
                    index = idx++;
                }

                const poll_option = activity.poll_options[index];
                
                if (poll_option) {
                    poll_option.is_selected = is_selected;
                    poll_option.index = index;
                } else {
                    activity.poll_options.push({
                        index,
                       is_selected
                    });
                }
            });


            
        } else if (quiz_answers) {
            
            activity.quiz_answers = quiz_answers;

            activity.quiz_answers.forEach( (answer : any) => {
                const { question_index, answer_index } = answer;

                post.questions[question_index].answers[answer_index].count += 1;

                if (post.questions[question_index].answers[answer_index].is_correct) {
                    activity.quiz_score += 1;
                    answer.is_correct = true;
                }

            });
            
        }

        await activity.save();
        await post.save();

        res.status(200).send(activity);

});

export { router as answerPostRouter };