import mongoose, {Types} from "mongoose";

import {ObjectId} from 'bson';


interface EventAttrs {
    name: string;
    start_date: string;
    end_date: string;
    tags?: Types.DocumentArray<any>;
    description: string;
    rating?: number;
    type: string;
    organizer: ObjectId;
    privacy?: string;
    ticket_price?: number;
    location?: number[]
}

interface EventDoc extends mongoose.Document {
    name: string;
    start_date: string;
    end_date: string;
    tags?: Types.DocumentArray<any>;
    description: string;
    rating?: number;
    type: string;
    organizer: ObjectId;
    privacy?: string;
    ticket_price?: number;
    location?: number[]
}

interface EventModel extends mongoose.Model<EventDoc> {
    build(attrs: EventAttrs): EventDoc;
}

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId
    },
    type: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    tags: [
        {
            name: {
                type: String,
                required: false
            },     
            tagId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tag",
                required: false
            }   
        }
    ],
    rating: {
        type: Number,
        required: false
    },
    ticket_price: {
        type: Number,
        required: false

    },
    privacy: {
        type: String,
        required: true
    }, 
    location: {
        type: [Number],
        required: false
    }


}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
})

eventSchema.statics.build = (attrs: EventAttrs) => {
    return new Event(attrs);
}

eventSchema.statics.findByRefId = async (refId: string) => {
    return await Event.findOne({ref_id: refId});
}

const Event = mongoose.model<EventDoc, EventModel>('Event', eventSchema);


export { Event };