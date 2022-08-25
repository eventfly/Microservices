import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    stripe_id: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

paymentSchema.statics.build = (attrs: any) => {
    return new Payment(attrs);
}

const Payment = mongoose.model<any, any>("Payment", paymentSchema);

export { Payment };