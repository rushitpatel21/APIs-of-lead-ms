const mongoose = require('mongoose');

const LeadSchema = mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    inquiry: {
        type: String,
        required: true
    },
    sourceOfInquiry: {
        type: String,
        required: true
    },
    instock: {
        type: Number,
        required: true,
        default: 1
    },
    remark: {
        type: String,
        required: true
    },
    callerName: {
        type: String,
        required: true
    },
    salesExecutiveName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('lead',LeadSchema);