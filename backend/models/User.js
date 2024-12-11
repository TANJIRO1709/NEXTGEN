const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true,
    },
    phoneNumber:{
        type:String,
        required:true,
        match:/^\d{10}$/,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        enum:['male','female','other'],
    },
    dob:{
        type:Date,
    },
    address:{
        type:String,
        trim:true,
    },
    pinCode:{
        type:String,
        match:/^\d{6}$/,
    },
    postOffice:{
        type:String,
        trim:true,
    },
    occupation:{
        type:String,
        trim:true,
    },
    incomeCategory:{
        type:String,
        trim:true,
    },
    acresOfLand:{
        type:Number,
        min: 0,
    },
    cropsGrown:{
        type:String,
        trim:true,
    },
    termsAccepted:{
        type:Boolean,
        default:false,
        required:true,
    },
    active:{
        type:Boolean,
        default:true,
    },
    NoOfRecommendation: {
        type: Number,
        default: 0
    },
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
    admins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }],
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    likedSchemes: [{
        scheme: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Scheme',
            required: true
        },
        likedAt: {
            type: Date,
            default: Date.now
        }
    }]
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual to get count of liked schemes
userSchema.virtual('likedSchemesCount').get(function() {
    return this.likedSchemes.length;
});

// Method to check if user has liked a scheme
userSchema.methods.hasLikedScheme = function(schemeId) {
    return this.likedSchemes.some(like => like.scheme.toString() === schemeId.toString());
};

// Method to like a scheme
userSchema.methods.likeScheme = async function(schemeId) {
    if (!this.hasLikedScheme(schemeId)) {
        this.likedSchemes.push({ scheme: schemeId });
        await this.save();
        return true;
    }
    return false;
};

// Method to unlike a scheme
userSchema.methods.unlikeScheme = async function(schemeId) {
    if (this.hasLikedScheme(schemeId)) {
        this.likedSchemes = this.likedSchemes.filter(
            like => like.scheme.toString() !== schemeId.toString()
        );
        await this.save();
        return true;
    }
    return false;
};

module.exports = mongoose.model("User", userSchema);