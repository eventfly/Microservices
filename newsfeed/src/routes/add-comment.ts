import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { ObjectId } from 'bson';

const router = express.Router();

router.post('/api/newsfeed/comment/:postId', [
    body('content').trim().isLength({ min: 1 })
], 
    async (req: Request, res: Response) => {
        const { postId } = req.params;
        const { content } = req.body;

        const user = await User.findByRefId(req.currentUser!.ref_id);
        const post = await Post.findById(postId);

        if (!post) {
            throw new Error('Post not found');
        }

        const comment = new Comment({
            post_id: postId,
            creator: {
                id: user!._id,
            },
            content: content,
            created_at: new Date(),
            updated_at: new Date()
        });
        await comment.save();

        post.comments!.push(comment._id);
        await post.save();

        res.status(201).send({ post });
    }
)