import mongoose from 'mongoose'
import { Password } from '../services/password'


//An interface that describes the properties that are required to create a new participant
interface participantAttrs {
    email: string
    password: string
    name: string
    dob: string
    gender: string
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
}

const participantSchema = new mongoose.Schema({
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

    dob: {
        type: Date,
        required: true
    },

    gender: {
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

participantSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed)
    }
    done()
})

//Add a static method to the participantSchema
participantSchema.statics.build = (attrs: participantAttrs) => {
    return new participant(attrs)
}


const participant = mongoose.model<participantDoc, participantModel>('participant', participantSchema)



export { participant }