const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema({
    schemeId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    iconName: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true,
        enum: ['Savings', 'Senior Citizens', 'Children', 'Agriculture', 'Insurance']
    },
    tags: [{
        type: String,
        trim: true
    }],
    likes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        likedAt: {
            type: Date,
            default: Date.now
        }
    }],
    totalLikes: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for getting total likes count
schemeSchema.virtual('likesCount').get(function() {
    return this.likes.length;
});

// Pre-save middleware to update totalLikes
schemeSchema.pre('save', function(next) {
    if (this.isModified('likes')) {
        this.totalLikes = this.likes.length;
    }
    next();
});

module.exports = mongoose.model("Scheme", schemeSchema);
