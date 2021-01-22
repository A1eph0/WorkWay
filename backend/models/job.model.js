// Importing Packages
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicantSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    sop:{
        type: String
    },
    stage: {
        type: Number,
        default: 0,
        required: true
    },
    doa: {
        type: String
    }
});

// Definging Schema for User
const jobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    remail: {
        type: String,
        required: true
    },
    maxapp: {
        type: Number,
        required: true
    },
    maxpos: {
        type: Number,
        required: true
    },
    dop: {
        type: Date,
        default: Date.now,
        required: true
    },
    dod: {
        type: Date,
    },
    skills : [{
        type: String
    }],
    jtype: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    salary:{
        type: Number,
        required: true
    },
    trating : {
        type: Number,
        default: 0
    },
    nrating : {
        type: Number,
        default: 0
    },
    applicants : [applicantSchema]
});


// Exporting the model
const User = mongoose.model('Job', jobSchema);
module.exports = User