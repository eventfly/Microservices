import mongoose, {Types} from "mongoose";

import {ObjectId} from 'bson';


interface TagDoc {
    name: string;
    id: ObjectId;
}


interface EventAttrs {
    _id: ObjectId;
    name: string;
    banner_url?: string;
    start_date: string;
    end_date: string;
    tags?: Types.DocumentArray<any>;
    description: string;
    rating?: number;
    parent_id?: string;
    sub_events?: string[];
    type: string;
    organizer: ObjectId;
    filter?: string[];
    privacy?: string;
    mailList?: string[];
    ticket_price?: number;
    staffs?: Types.DocumentArray<any>;
    zoom_link?: string;
    roles?: Types.DocumentArray<any>;
    tickets?: Types.DocumentArray<any>;
}

interface EventDoc extends mongoose.Document {
    name: string;
    banner_url?: string;
    start_date: string;
    end_date: string;
    tags?: Types.DocumentArray<any>;
    description: string;
    rating?: number;
    parent_id?: string;
    sub_events?: string[];
    type: string;
    organizer: ObjectId;
    filter?: string[];
    privacy?: string;
    mailList?: string[];
    ticket_price?: number;
    staffs?: Types.DocumentArray<any>;
    zoom_link?: string;
    roles?: Types.DocumentArray<any>;
    tickets?: Types.DocumentArray<any>;
}

interface EventModel extends mongoose.Model<EventDoc> {
    build(attrs: EventAttrs): EventDoc;
}

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organizer",
    },
    banner_url: {
        type: String,
        required: false
    },
    domain: {
        type: String,
        required: false
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
    mailList: {
        type: [String],
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
    parent_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: false
    },
    sub_events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: false
    }],
    ticket_price: {
        type: Number,
        required: false

    },
    privacy: {
        type: String,
        required: true
    },
    zoom_link: {
        type: String,
        required: false
    },

    roles: [{
        name:{
            type: String,
            required: false
        },
        permissions: {
            type: [String],
            default: 'Read Only',
            required: false
        }
    }],
    tickets: [{
        class: {
            type: String,
            required: false
        },
        price: {
            type: Number,
            required: false
        },
        quantity: {
            type: Number,
            required: false,
            default: 0,
            min: 0
        },
        tokens: [{
            type: String,
            required: false
        }],
        available: {
            type: Number,
            required: false,
            default: 0,
            min: 0
        }
    }]

    //TODO: Add Venue



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

const Event = mongoose.model<EventDoc, EventModel>('Event', eventSchema);


export { Event };