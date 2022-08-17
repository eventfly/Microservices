import mongoose, {Types} from "mongoose";

import { ObjectId } from "mongoose";

const commentSchema = new mongoose.Schema({
    post_id: {
        type: Types.ObjectId,
        ref: 'Post',
        required: true
    },
    creator: {
        id :{
            type: Types.ObjectId,
            required: true,
            ref: 'User'
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
    like_count: {
        type: Number,
        required: false,
        default: 0
    },
    parent_id: {
        type: Types.ObjectId,
        ref: 'Comment',
        required: false
    },
    replies: [{
        type: Types.ObjectId,
        ref: 'Comment'
    }],
    is_deleted: {
        type: Boolean,
        required: false,
    },
    
    
})

commentSchema.statics.build = (attrs: any) => {
    return new Comment(attrs);
}

commentSchema.statics.findByPostId = async (postId: string) => {
    return await Comment.find({post_id: postId});
}

commentSchema.statics.findByCommentId = async (commentId: string) => {
    return await Comment.findById(commentId);
}

commentSchema.statics.findByUserId = async (userId: string) => {
    return await Comment.find({creator: {creator_id: userId}});
}

commentSchema.statics.incrementLikeCount = async (commentId: string) => {
    return await Comment.findByIdAndUpdate(commentId, {$inc: {like_count: 1}});
}

commentSchema.statics.decrementLikeCount = async (commentId: string) => {
    return await Comment.findByIdAndUpdate(commentId, {$inc: {like_count: -1}});
}

commentSchema.statics.addReply = async (commentId: string, replyId: ObjectId) => {
    return await Comment.findByIdAndUpdate(commentId, {$push: {replies: replyId}});
}

commentSchema.statics.removeReply = async (commentId: string, replyId: ObjectId) => {
    return await Comment.findByIdAndUpdate(commentId, {$pull: {replies: replyId}});
}

commentSchema.statics.findByParentId = async (parentId: string) => {
    return await Comment.find({parent_id: parentId});
}

commentSchema.statics.setParentId = async (commentId: string, parentId: string) => {
    return await Comment.findByIdAndUpdate(commentId, {parent_id: parentId});
}


const Comment = mongoose.model('Comment', commentSchema);

export { Comment };