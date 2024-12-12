const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        match: /^[A-Za-z\s]+$/
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    district: {
        type: String,
        required: true,
        trim: true
    },
    postOffice: {
        type: String,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true,
        enum: ['CL', 'RL', 'HL', 'SL'],
        validate: {
            validator: function(v) {
                return ['CL', 'RL', 'HL', 'SL'].includes(v);
            },
            message: props => `${props.value} is not a valid department! Must be CL, RL, HL, or SL`
        }
    },
    employeeId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^[A-Za-z0-9-]+$/
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    notifications: {
        sent: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Notification'
        }],
        received: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Notification'
        }]
    },
    managedSchemes: [{
        scheme: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Scheme'
        },
        totalLikes: {
            type: Number,
            default: 0
        },
        lastUpdated: {
            type: Date,
            default: Date.now
        }
    }]
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for getting total likes across all managed schemes
adminSchema.virtual('totalSchemeLikes').get(function() {
    return this.managedSchemes.reduce((total, scheme) => total + scheme.totalLikes, 0);
});

module.exports = mongoose.model("Admin", adminSchema);
