import mongoose, { Types } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { Password } from '../services/password';

interface EventDoc {
    eventId: string;
    imageUrl: string;
    name: string;
}


interface OrgAttrs {
    email: string;
    password: string;
    name: string;
    events?: Types.DocumentArray<EventDoc>;
    role?: string;

}

interface OrgDoc extends mongoose.Document {
    email: string;
    password: string;
    name: string;
    events?: Types.DocumentArray<EventDoc>;
    role?: string;

}

interface OrgModel extends mongoose.Model<OrgDoc> {
    build(attrs: OrgAttrs): OrgDoc;
}

const orgSchema = new mongoose.Schema(
    {
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
        events: [{
            eventId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Event"
            },
            imageUrl: {
                type: String,
                required: false
            },
            name: {
                type: String,
                required: true
            }
        }],
        created_at: {
            type: Date,
            default: Date.now()
        },
        role: {
            type: String,
        }

    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

orgSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed)
    }
    done()
})

orgSchema.set('versionKey', 'version');
orgSchema.plugin(updateIfCurrentPlugin);

orgSchema.statics.build = (attrs: OrgAttrs) => {
    return new Organizer(attrs);
};

const Organizer = mongoose.model<OrgDoc, OrgModel>('Organizer', orgSchema);

export { Organizer };
