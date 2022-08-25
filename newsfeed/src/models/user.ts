import mongoose, {Types} from "mongoose";
import { ObjectId } from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    dateOfBirth: {
        type: Date,
        required: false
    },
    feed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feed",
        required: false
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
    }]

});



userSchema.statics.findByEmail = function(email: string) {
    return this.findOne({email: email});
};

userSchema.statics.build = function(attrs: any) {
    return new User(attrs);
};

userSchema.statics.findByRefId = function(ref_id: string) {
    return this.findOne({ref_id: ref_id});
};


const User = mongoose.model<any,any>('User', userSchema);

export { User };