import mongoose, {Types} from "mongoose";

import { ObjectId } from "mongoose";


interface OrganizerAttrs {
    package: string;
    boost_factor: number;
}

interface OrganizerDoc extends mongoose.Document{
    package: string;
    boost_factor: number;
}

interface OrganizerModel extends mongoose.Model<OrganizerDoc> {
    build(attrs: OrganizerAttrs): OrganizerDoc;
}


const organizerSchema = new mongoose.Schema({

    package: {
        type: String,
        required: true
    },
    boost_factor: {
        type: Number,
        required: true
    }
      
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
})

organizerSchema.statics.build = (attrs: OrganizerAttrs) => {
    return new Organizer(attrs);
}


const Organizer = mongoose.model<OrganizerDoc, OrganizerModel>('Organizer', organizerSchema);


export { Organizer };