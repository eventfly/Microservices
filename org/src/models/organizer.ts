import mongoose, { Types } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface EventDoc {
    eventId: string;
    imageUrl: string;
    name: string;
}


interface OrgAttrs {
    email: string;
    password: string;
    name: string;
    events: Types.DocumentArray<EventDoc>;

}

interface OrgDoc extends mongoose.Document {
    email: string;
    password: string;
    name: string;
    events: Types.DocumentArray<EventDoc>;

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

orgSchema.set('versionKey', 'version');
orgSchema.plugin(updateIfCurrentPlugin);

orgSchema.statics.build = (attrs: OrgAttrs) => {
    return new Org(attrs);
};

const Org = mongoose.model<OrgDoc, OrgModel>('Org', orgSchema);

export { Org };
