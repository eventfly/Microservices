import mongoose, { Types } from 'mongoose'
import { Password } from '../services/password'


//An interface that describes the properties that are required to create a new participant
interface OrgAttrs {
    email: string
    password: string
    name: string
    role: string
    ref_id: string
    is_verified?: boolean
    permissions?: Types.DocumentArray<any>
}

//An interface that describes the properties that a participant Model has
interface OrgModel extends mongoose.Model<OrgDoc> {
    build(attrs: OrgAttrs): OrgDoc
}

//An interface that describes the portion of the participant document that we want to expose to the outside world

interface OrgDoc extends mongoose.Document {
    email: string
    password: string
    name: string
    role: string
    ref_id: string
    is_verified?: boolean
    otp?: string
    permissions?: Types.DocumentArray<any>
}

const OrgSchema = new mongoose.Schema({
    //In TS: type: string
    //In JS: type: String

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true
    },

    ref_id: {
        type: String,
        required: true
    },

    is_verified: {
        type: Boolean,
        default: false
    },
    permissions: {
        type: [String],
        default: 'Read Only',
        required: false
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
    }
    )



OrgSchema.statics.build = (attrs: OrgAttrs) => {
    return new Organizer(attrs)
}


const Organizer = mongoose.model<OrgDoc, OrgModel>('Organizer', OrgSchema)



export { Organizer }