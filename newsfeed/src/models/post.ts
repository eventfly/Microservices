import mongoose, {Types} from "mongoose";

import {ObjectId} from 'mongoose';



const postSchema = new mongoose.Schema({
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Event',
        index: true
    },
    creator: {

        //Ref_Id
        id :{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        name: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            required: false
        }
    },
    content: {
        type: String,
        required: false
    },
    created_at: {
        type: Date,
        required: false,
        default: Date.now
    },
    updated_at: {
        type: Date,
        required: false,
        default: Date.now
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    questions: [{
        question: {
            type: String,
            required: false
        },
        answers: [{
            answer: {
                type: String,
                required: false
            },
            is_correct: {
                type: Boolean,
                required: false
            }
        }]
    }],
    poll_options: [{
        option: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        }
    }],
    mentions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    like_count: {
        type: Number,
        required: false,
        default: 0
    },
    view_count: {
        type: Number,
        required: false,
        default: 0
    },
    medias: [{
        url: {
            type: String,
            required: false
        },
        type: {
            type: String,
            required: false
        },
        caption: {
            type: String,
            required: false
        }
    }],
    is_pinned: {
        type: Boolean,
        required: false,
        default: false
    },
    is_deleted: {
        type: Boolean,
        required: false,
        default: false
    },
    is_reported: {
        type: Boolean,
        required: false,
        default: false
    },
    is_hidden: {
        type: Boolean,
        required: false,
        default: false
    },
    is_locked: {
        type: Boolean,
        required: false,
        default: false
    },
    hash_tags: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'HashTag',
            required: false
        },
        name: {
            type: String,
            required: false
        }
    }],
    
    image: {
        type: String,
        required: false
    }

});

postSchema.statics.build = (attrs: any) => {
    return new Post(attrs);
}

postSchema.statics.findByEventId = async (eventId: string) => {
    return await Post.find({event_id: eventId});
}

postSchema.statics.findByEventIdAndPostId = async (eventId: string, postId: string) => {
    return await Post.findOne({event_id: eventId, _id: postId});
}

postSchema.statics.findByUserId = async (userId: string) => {
    return await Post.find({creator: {creator_id: userId}});
}

postSchema.statics.incrementViewCount = async (postId: string) => {
    return await Post.findByIdAndUpdate(postId, {$inc: {view_count: 1}});
}

postSchema.statics.incrementLikeCount = async (postId: string) => {
    return await Post.findByIdAndUpdate(postId, {$inc: {like_count: 1}});
}

postSchema.statics.decrementLikeCount = async (postId: string) => {
    return await Post.findByIdAndUpdate(postId, {$inc: {like_count: -1}});
}

postSchema.statics.findByHashTag = async (hashTag: string) => {
    return await Post.find({hash_tags: {$elemMatch: {name: hashTag}}});
}

postSchema.statics.addComment = async (postId: string, commentId: ObjectId) => {
    return await Post.findByIdAndUpdate(postId, {$push: {comments: commentId}});
}

postSchema.statics.getTotalLikeCount = async (postId: string) => {
    return await Post.findById(postId).populate('like_count');
}

postSchema.statics.getTotalViewCount = async (postId: string) => {
    return await Post.findById(postId).populate('view_count');
}

postSchema.statics.getTotalCommentCount = async (postId: string) => {
    return await Post.findById(postId).populate('comments').count();
}

postSchema.statics.getLatestPosts = async (eventId: string) => {
    return await Post.find({event_id: eventId}).sort({created_at: -1});
}

postSchema.statics.getNPosts = async (eventId: string, n: number) => {
    return await Post.find({event_id: eventId}).sort({created_at: -1}).limit(n);
}



const Post = mongoose.model<any, any>('Post', postSchema);

export {Post};

