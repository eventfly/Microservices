import mongoose, {Types} from "mongoose";

interface TagAttrs {
    name: string;
}

interface TagModel extends mongoose.Model<TagDoc> {
    build(attrs: TagAttrs): TagDoc;
}

interface TagDoc extends mongoose.Document {
    name: string;
}

const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }

}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
        }
    }
})

TagSchema.statics.build = (attrs: TagAttrs) => {
    return new Tag(attrs)
}

const Tag = mongoose.model<TagDoc, TagModel>('Tag', TagSchema);

export { Tag };