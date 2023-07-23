const { number } = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 256,
    },
    lastName: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 256,
    },
    email: {
        type: String,
        require: true,
        minlength: 6,
        maxlength: 256,
        unique: true,
    },
    middleName: {
        type: String,
        minlength: 2,
        maxlength: 256,
    },
    phone: {
        type: String,
        require: true,
        minlength: 6,
        maxlength: 256,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        minlength: 6,
        maxlength: 1024,
    },
    imageUrl: {
        type: String,
        minlength: 6,
        maxlength: 1024,
    },
    imageAlt: {
        type: String,
        minlength: 6,
        maxlength: 1024,
    },
    state: {
        type: String,
        minlength: 2,
        maxlength: 256,
    },
     country: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 256,
    },
    city: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 256,
    },
    street: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 256,
    },
    houseNumber: {
        type: Number,
        require: true,
        minlength: 1,
        maxlength: 20,
    },
    zip: {
        type: Number,
        minlength: 5,
        maxlength: 20,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBusiness: {
        type: Boolean,
        default: false,
        required: true
    }

});

const User = mongoose.model('User', userSchema);

exports.User = User;