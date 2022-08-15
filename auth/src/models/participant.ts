import mongoose from 'mongoose'
import { Password } from '../services/password'


//An interface that describes the properties that are required to create a new participant
interface participantAttrs {
    email: string
    password: string
    name: string
    dob: string
    gender: string
    ref_id: string
    avatar?: string
}

//An interface that describes the properties that a participant Model has
interface participantModel extends mongoose.Model<participantDoc> {
    build(attrs: participantAttrs): participantDoc
}

//An interface that describes the portion of the participant document that we want to expose to the outside world

interface participantDoc extends mongoose.Document {
    email: string
    password: string
    name: string
    dob: string
    gender: string
    ref_id: string
    avatar?: string
}

const participantSchema = new mongoose.Schema({
    //In TS: type: string
    //In JS: type: String

    email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    dob: {
        type: Date,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/dzqbzqgjw/image/upload/v1598424851/default_avatar_jxqzqz.png'
    },

    ref_id: {
        type: String,
        required: true
    }

},
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id
                delete ret._id
                delete ret.password
                delete ret.__v
            }
        }
    })



//Add a static method to the participantSchema
participantSchema.statics.build = (attrs: participantAttrs) => {
    return new participant(attrs)
}


const participant = mongoose.model<participantDoc, participantModel>('participant', participantSchema)



export { participant }