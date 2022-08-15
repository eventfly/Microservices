import mongoose, {Types} from "mongoose";
import { ObjectId } from "mongoose";

const userSchema = new mongoose.Schema({
    ref_id: {
        type: Types.ObjectId,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    roles: [{
        type: String,
        required: false
    }],
    name: {
        type: String,
        required: false
    },
    avatar: {
        type: String,
        required: false
    }

})

const User = mongoose.model('User', userSchema);

userSchema.statics.findByEmail = function(email: string) {

}

userSchema.statics.build = function(attrs: any) {
    return new User(attrs);
}

userSchema.statics.findByRefId = function(ref_id: string) {
    return this.findOne({ref_id: ref_id});
}

export { User };