import mongoose, {Types} from "mongoose";

import { ObjectId } from "mongoose";

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    organizer: {
        type: Types.ObjectId,
        ref: "Organizer"
    },
    description: {
        type: String,
        required: false
    },
    banner_url: {
        type: String,
        required: false
    },
    posts: [{
        type: Types.ObjectId,
        ref: 'Post'
    }],
    participants: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    staffs: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    followers: [{
        type: Types.ObjectId,
        ref: 'User'
    }]
      
})

eventSchema.statics.build = (attrs: any) => {
    return new Event(attrs);
}

eventSchema.statics.findByOrganizer = async (organizerId: string) => {
    return await Event.find({organizer: organizerId});
}

eventSchema.statics.findByEventId = async (eventId: string) => {
    return await Event.findById(eventId);
}

eventSchema.statics.getFollowers = async (eventId: string) => {
    return await Event.findById(eventId).populate('followers');
}

eventSchema.statics.getPosts = async (eventId: string) => {
    return await Event.findById(eventId).populate('posts');
}

eventSchema.statics.getParticipants = async (eventId: string) => {
    return await Event.findById(eventId).populate('participants');
}

eventSchema.statics.getStaffs = async (eventId: string) => {
    return await Event.findById(eventId).populate('staffs');
}

eventSchema.statics.getOrganizer = async (eventId: string) => {
    return await Event.findById(eventId).populate('organizer');
}

eventSchema.statics.getEvent = async (eventId: string) => {
    return await Event.findById(eventId);
}

eventSchema.statics.getEvents = async () => {
    return await Event.find();
}

eventSchema.statics.getTotalParticipants = async (eventId: string) => {
    return await Event.findById(eventId).populate('participants').count();
}

eventSchema.statics.getTotalStaffs = async (eventId: string) => {
    return await Event.findById(eventId).populate('staffs').count();
}

eventSchema.statics.getTotalFollowers = async (eventId: string) => {
    return await Event.findById(eventId).populate('followers').count();
}

eventSchema.statics.getTotalPosts = async (eventId: string) => {
    return await Event.findById(eventId).populate('posts').count();
}


const Event = mongoose.model("Event", eventSchema);

export { Event };