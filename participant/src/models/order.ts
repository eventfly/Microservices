import mongoose, {Types} from 'mongoose';

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Participant',
        required: true
    },
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    tickets: [{
        class: {
            type: String,
            required: false
        },
        quantity: {
            type: Number,
            required: false
        },
        price: {
            type: Number,
            required: false
        }
    }],
    status: {
        type: String,
        required: false,
        default: 'pending'
    },
    expiration_date: {
        type: Date,
        required: false
    },
    created_at: {
        type: Date,
        required: false,
    },
    total_price: {
        type: Number,
        required: false
    },


})

orderSchema.statics.build = (attrs: any) => {
    return new Order(attrs);
}

const Order = mongoose.model<any, any>('Order', orderSchema);


export { Order };