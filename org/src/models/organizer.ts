import mongoose, { Types } from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { Password } from '../services/password';



const orgSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
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
            required: true
        },
        profile_pic: {
            type: String,
            required: false
        },

        roles: [{
            name:{
                type: String,
                required: true,
                // unique: true
            },
            permissions: {
                type: [String],
                default: 'Read Only',
                required: false
            }
        }],

        permission: {
            type: String,
            required: true
        },

        current_package: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Package"
        },

        orders: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }]



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

orgSchema.statics.build = (attrs: any) => {
    return new Organizer(attrs);
};

const Organizer = mongoose.model<any, any>('Organizer', orgSchema);

export { Organizer};
