import mongoose, {Types} from "mongoose";

const feedbackSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Participant',
        required: true
    },
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: false,
        default: Date.now
    },
    featured: {
        type: Boolean,
        required: false,
        default: false
    }
});

feedbackSchema.statics.build = (attrs: any) => {
    return new Feedback(attrs);
}

const Feedback = mongoose.model<any, any>('Feedback', feedbackSchema);

export { Feedback };