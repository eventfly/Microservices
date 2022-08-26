import mongoose, {Types} from "mongoose";

const packageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    boost_factor: {
        type: Number,
        required: false,
        default: 0.5
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    max_events: {
        type: Number,
        required: false,
        default: 10
    },
    max_participants: {
        type: Number,
        required: false,
        default: 1000
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    perks: [{
        type: String,
        required: false
    }]

});

packageSchema.statics.build = function(attrs: any) {
    return new Package(attrs);
}


const Package = mongoose.model<any,any>('Package', packageSchema);

export { Package };