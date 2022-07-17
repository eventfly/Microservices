import mongoose from "mongoose";


interface EventAttrs {
    title: string;
    banner_url?: string;
    start_date: string;
    end_date: string;
    tags?: string[];
    description: string;
    rating?: number;
    parent_id?: string;
    sub_events?: string[];
    is_online: boolean;
    organizer: string;
    domain?: string;
}

interface EventDoc extends mongoose.Document {
    title: string;
    price: string;
    userId: string;
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
    is_online: {
        type: Boolean,
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
    tags: {
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
    return new event(attrs);
}

const event = mongoose.model<EventDoc, EventModel>('Event', eventSchema);


export { event };