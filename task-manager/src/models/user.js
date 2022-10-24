const mongoose = require( 'mongoose' );
const validator = require( 'validator' );

const User = mongoose.model( 'User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail( value )) throw new Error( 'Email is invalid!' );
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error( 'Age cannot be a negative number!' );
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 6) {
                throw new Error( 'Password must have more than 6 characters!' );
            }
        }
    }
});

module.exports = User