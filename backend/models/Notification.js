const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 70
    },
    content: {
        type: String,
        required: true,
        trim: true,
        minlength: 100,
        maxlength: 1000
    },
    sender: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'sender.model'
        },
        model: {
            type: String,
            required: true,
            enum: ['Admin', 'User']
        }
    },
    receivers: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'receivers.model'
        },
        model: {
            type: String,
            required: true,
            enum: ['Admin', 'User']
        },
        readStatus: {
            type: Boolean,
            default: false
        },
        readAt: {
            type: Date,
            default: null
        }
    }],
    active: {
        type: Boolean,
        default: true
    }
}, { 
    timestamps: true,
    validateBeforeSave: true
});

// Middleware to ensure sender and receivers are of different types
notificationSchema.pre('save', function(next) {
    if (this.isModified('sender') || this.isModified('receivers')) {
        const senderModel = this.sender.model;
        const receiverModel = this.receivers[0]?.model;
        
        if (receiverModel && senderModel === receiverModel) {
            next(new Error('Sender and receivers must be of different types (Admin/User)'));
        }
        
        // Ensure all receivers are of the same type
        const allReceiversSameType = this.receivers.every(receiver => 
            receiver.model === receiverModel
        );
        
        if (!allReceiversSameType) {
            next(new Error('All receivers must be of the same type'));
        }
    }
    next();
});

// Index for efficient queries
notificationSchema.index({ 'sender.id': 1, 'sender.model': 1 });
notificationSchema.index({ 'receivers.id': 1, 'receivers.model': 1 });
notificationSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Notification", notificationSchema);
