import mongoose, {Types} from "mongoose";

import {ObjectId} from 'bson';



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
        },
        perks: [{
            type: String,
            required: false
        }]
    }],

    feedbacks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feedback',
        required: false
    }],

    total_rating: {
        type: Number,
        required: false,
        default: 0
    }

    //TODO: Add Venue



}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
})

eventSchema.statics.build = (attrs: any) => {
    return new Event(attrs);
}

const Event = mongoose.model<any, any>('Event', eventSchema);


export { Event };