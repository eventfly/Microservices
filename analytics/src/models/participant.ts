import mongoose, {Types} from "mongoose";

import { ObjectId } from "mongoose";


interface ParticipantAttrs {
    events?: Types.DocumentArray<any>;
}

interface ParticipantDoc extends mongoose.Document{
    events?: Types.DocumentArray<any>;
}

interface ParticipantModel extends mongoose.Model<ParticipantDoc> {
    build(attrs: ParticipantAttrs): ParticipantDoc;
}


const participantSchema = new mongoose.Schema({

    events: [{
        type: mongoose.Schema.Types.ObjectId,
        required: false
    }]
      
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
})

participantSchema.statics.build = (attrs: ParticipantAttrs) => {
    return new Participant(attrs);
}


const Participant = mongoose.model<ParticipantDoc, ParticipantModel>('Participant', participantSchema);


export { Participant };