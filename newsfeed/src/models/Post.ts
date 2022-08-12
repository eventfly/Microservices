import mongoose, {Types} from "mongoose";

import {ObjectId} from 'bson';

interface PostDoc extends mongoose.Document {

}

const postSchema = new mongoose.Schema({

}, {
    toJSON: {
        transform: function (doc, ret) {

        }
    }
})

