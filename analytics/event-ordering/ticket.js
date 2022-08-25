const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    class: {
        type: String,
        required: false
    },
    participant: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Participant",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true
    },
    event: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true
        },
        name: {
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
        }
    }
    ,
    quantity: {
        type: Number,
        required: false   
    },
    price: {
        type: Number,
        required: false
    },
    tokens: [{
        type:{
            type: String,
            required: false
        },
        id: {
            type: Number,
            required: false
        },
        is_used:{
            type: Boolean,
            required: false,
            default: false
        },
        used_at:{
            type: Date,
            required: false
        }
    }],
    remarks: {
        type: String,
        required: false
    },
    check_in: [{
        time:{
            type: Date,
            required: false
        },
        staff_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Staff",
            required: false
        }
    }
    ],
    created_at: {
        type: Date,
        required: false,
        default: Date.now
    }


});



const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = { Ticket };