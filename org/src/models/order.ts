import mongoose, {Types} from 'mongoose';

const orderSchema = new mongoose.Schema({
    organizer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organizer',
        required: true
    },
    package_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: true
    },
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
        default: Date.now
    },
    total_price: {
        type: Number,
        required: false
    },
    transaction_id: {
        type: String,
        required: false
    }


})

orderSchema.statics.build = (attrs: any) => {
    return new Order(attrs);
}

const Order = mongoose.model<any, any>('Order', orderSchema);


export { Order };