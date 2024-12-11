const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    targetFamilies: {
        type: Number,
        required: true,
        min: 1
    },
    schemeDetails: {
        type: String,
        required: true,
        enum: [
            'Post Office Savings Account (SB)',
            'National Savings Recurring Deposit Account (RD)',
            'National Savings Time Deposit Account (TD)',
            'National Savings Monthly Income Scheme Account (MIS)',
            'Senior Citizen Savings Scheme (SCSS)',
            'Public Provident Fund (PPF) Account',
            'Sukanya Samriddhi Account (SSA)',
            'Kisan Vikas Patra (KVP)',
            'National Savings Certificates (NSC)'
        ]
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true,
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium'
    },
    selectedTags: [{
        type: String,
        enum: [
            'Male', 'Female', 'Minor', 'Youth', 'Student', 
            'Senior Citizen', 'Women', 'Farmer', 'Employed', 'Unemployed'
        ]
    }],
    type: {
        type: String,
        required: true,
        default: 'Mela'
    },
    status: {
        type: String,
        required: true,
        enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'],
        default: 'Upcoming'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
