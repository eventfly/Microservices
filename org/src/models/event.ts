import mongoose, {Types} from "mongoose";

interface TagDoc {
    name: string;
    id: string;
}


interface EventAttrs {
    name: string;
    banner_url?: string;
    start_date: string;
    end_date: string;
    tags?: Types.DocumentArray<TagDoc>;
    description: string;
    rating?: number;
    parent_id?: string;
    sub_events?: string[];
    type: string;
    organizer: string;
    filter?: string[];
    privacy?: string;
    mailList?: string[];
    ticket_price?: number;
}

interface EventDoc extends mongoose.Document {
    name: string;
    banner_url?: string;
    start_date: string;
    end_date: string;
    tags?: Types.DocumentArray<TagDoc>;
    description: string;
    rating?: number;
    parent_id?: string;
    sub_events?: string[];
    type: string;
    organizer: string;
    filter?: string[];
    privacy?: string;
    mailList?: string[];
    ticket_price?: number;
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
        tagId:{
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

eventSchema.statics.build = (attrs: EventAttrs) => {
    return new Event(attrs);
}

const Event = mongoose.model<EventDoc, EventModel>('Event', eventSchema);


export { Event };