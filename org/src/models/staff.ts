import mongoose, { Types } from 'mongoose'
import { Password } from '../services/password'

interface EventDoc {
    eventId: string;
}


//An interface that describes the properties that are required to create a new participant
interface StaffAttrs {
    email: string
    password: string
    name: string
    otp?: string
    is_verified?: boolean
    organizer: string
    events?: Types.DocumentArray<EventDoc>
    role?: string
}

//An interface that describes the properties that a participant Model has
interface StaffModel extends mongoose.Model<StaffDoc> {
    build(attrs: StaffAttrs): StaffDoc
}

//An interface that describes the portion of the participant document that we want to expose to the outside world

interface StaffDoc extends mongoose.Document {
    email: string
    password: string
    name: string
    otp: string
    is_verified: boolean
    organizer: string
    events?: Types.DocumentArray<EventDoc>
    role?: string
}

const StaffSchema = new mongoose.Schema({
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

    otp: {
        type: String,
        default: Math.random().toString(36).slice(-8),
        required: false
    },

    is_verified: {
        type: Boolean,
        default: false
    },

    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organizer",
    },

    events: [{
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event"
        },
    }],

    role: {
        type: String,
        default: "staff"
    }

    //TODO: Add the roles


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

StaffSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed)
    }
    done()
})

//Add a static method to the participantSchema
StaffSchema.statics.build = (attrs: StaffAttrs) => {
    return new Staff(attrs)
}


const Staff = mongoose.model<StaffDoc, StaffModel>('Staff', StaffSchema)



export { Staff }


