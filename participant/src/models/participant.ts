import mongoose, {Types} from "mongoose";
import { Password } from "../services/password";
import { ObjectId } from "bson";

const participantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/dzqbzqgjw/image/upload/v1598424851/default_avatar_jxqzqz.png'
    },
    events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }
    ],
    searchHistory: [{
        type: String   
    }]

});



participantSchema.statics.build = (attrs: any) => {
    return new Participant(attrs);
}

participantSchema.statics.updateSearchHistory = async (participantId: string, searchHistory: string) => {
    return await Participant.findByIdAndUpdate(participantId, {searchHistory}, {new: true});
}

participantSchema.statics.findByEmail = async (email: string) => {
    return await Participant.findOne({email});
}


participantSchema.statics.updatePassword = async (participantId: string, password: string) => {
    const hashedPassword = await Password.toHash(password);
    return await Participant.findByIdAndUpdate(participantId, {password: hashedPassword}, {new: true});
}

participantSchema.statics.updateAvatar = async (participantId: string, avatar: string) => {
    return await Participant.findByIdAndUpdate(participantId, {avatar}, {new: true});
}

participantSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed)
    }
    done();
} );

const Participant = mongoose.model('Participant', participantSchema);

export { Participant };