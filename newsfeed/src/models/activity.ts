import mongoose, {Types} from "mongoose";
import { ObjectId } from "mongoose";

const activitySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
        index: true
    },
    is_liked: {
        type: Boolean,
        required: false,
        default: false
    },
    quiz_answers: [{
        question_index: {
            type: Number,
            required: false
        },
        answer_index: {
            type: Number,
            required: false
        },
        is_correct: {
            type: Boolean,
            required: false,
            default: false
        }
    }],
    quiz_score: {
        type: Number,
        required: false
    },
    is_quiz_completed: {
        type: Boolean,
        required: false
    },
    total_time: {
        type: Number,
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
    poll_options: [{
        index: {
            type: Number,
            required: false
        },
        is_selected: {
            type: Boolean,
            required: false,
            default: false
        },
        count: {
            type: Number,
            required: false,
            default: 0
        }
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }]

});



activitySchema.statics.build = (attrs: any) => {
    return new Activity(attrs);
}

activitySchema.statics.findByUserId = async (userId: string) => {
    return await Activity.find({user_id: userId});
}

activitySchema.statics.findByPostId = async (postId: string) => {
    return await Activity.find({post_id: postId});
}

activitySchema.statics.findTotalLikesByPostId = async (postId: string) => {
    return await Activity.count({post_id: postId, is_liked: true});
}

const Activity = mongoose.model<any, any>('Activity', activitySchema);




export { Activity };
