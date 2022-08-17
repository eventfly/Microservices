import mongoose, {Types} from "mongoose";
import { ObjectId } from "mongoose";

const feedSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
        unique: true
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    last_updated: {
        type: Date,
        required: false,
        default: Date.now
    },
    activities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Activity'
    }]
});



feedSchema.statics.build = (attrs: any) => {
    return new Feed(attrs);
}

feedSchema.statics.getFeed = async (userId: string) => {
    const feed = await Feed.findOne({user_id: userId});
    return feed;
}

feedSchema.statics.findByUserId = async (userId: string) => {
    return await Feed.findOne({user_id: userId});
}

feedSchema.statics.addPost = async (userId: string, postId: ObjectId) => {
    const feed = await Feed.findOne({user_id: userId});
    
    if (feed) {
        feed.posts.push(postId);
        await feed.save();
    }
    
}

feedSchema.statics.getPostsFromFeed = async (userId: string) => {
    const feed = await Feed.findOne({user_id: userId});
    if (feed) {
        return feed.posts;
    }
    return [];
}

feedSchema.statics.clearFeed = async (userId: string) => {
    const feed = await Feed.findOne({user_id: userId});
    if (feed) {
        feed.posts = [];
        await feed.save();
    }
}

feedSchema.statics.addActivity = async (userId: string, activityId: ObjectId) => {
    const feed = await Feed.findOne({user_id: userId});
    
    if (feed) {
        feed.activities.push(activityId);
        await feed.save();
    }
    
}

const Feed = mongoose.model<any, any>('Feed', feedSchema);


export { Feed };