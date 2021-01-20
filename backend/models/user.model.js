// Importing Packages
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// For Email Validation:
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const educationSchema = new Schema({
    degree: {
        type : String,
        required : true
    },
    institute: {
        type: String,
        required: true
    },
    startyear: {
        type: Number,
        required: true,
        trim: true
    },
    endyear: {
        type: Number,
        trim: true
    }
});

// Definging Schema for User
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate: [validateEmail, 
            'Error: Please fill a valid email address!']
    },
    password: {
        type: String,
        required: true,
    },
    utype : {
        type: String,
        required: true
    },

    // Applicant case
    fname: {
        type: String,
    },
    lname: {
        type: String,
    },
    education: [educationSchema],
    skills : [{
        type: String
    }],
    trating : {
        type: Number,
        default: 0
    },
    nrating : {
        type: Number,
        default: 0
    },

    // Recruiter case
    cname: {
        type: String
    },
    phone: {
        type: Number
    },
    bio : {
        type: String
    }

});


// Exporting the model
const User = mongoose.model('Applicant', userSchema);
module.exports = User;