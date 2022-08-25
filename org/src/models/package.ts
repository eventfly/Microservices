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
    }

});

packageSchema.statics.build = function(attrs: any) {
    return new Package(attrs);
}


const Package = mongoose.model<any,any>('Package', packageSchema);

export { Package };