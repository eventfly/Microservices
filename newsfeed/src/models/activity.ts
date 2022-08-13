import mongoose, {Types} from "mongoose";
import { ObjectId } from "mongoose";

const activitySchema = new mongoose.Schema({
    user_id: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    post_id: {
        type: Types.ObjectId,
        ref: 'Post',
        required: true,
        index: true
    },
    is_liked: {
        type: Boolean,
        required: false,
        default: false
    },
    is_commented: {
        type: Boolean,
        required: false,
        default: false
    },
    answers: [{
        answer_index: {
            type: Number,
            required: false
        },
        time: {
            type: Date,
            required: false,
            default: Date.now
        }
    }],
    created_at: {
        type: Date,
        required: false,
        default: Date.now
    },
    poll_options: [{
        option_index: {
            type: Number,
            required: false
        },
        is_selected: {
            type: Boolean,
            required: false,
            default: false
        }
    }],

});

const Activity = mongoose.model('Activity', activitySchema);

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





export { Activity };
