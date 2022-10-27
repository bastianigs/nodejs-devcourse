const mongoose = require( 'mongoose' );
const validator = require( 'validator' );
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.generateAuthToken = async function () {
    // using standard function because we gonna need the 'this' binding, as it is per instance!
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'thisismynewcourse')

    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.statics.findByCredentials = async (email, pass) => {
    const user = await User.findOne({email})
    if (!user) throw new Error('Unable to login!')

    const isMatch = await bcrypt.compare(pass, user.password)
    if (!isMatch) throw new Error('Unable to login!')

    return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this
    
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
    const user = this

    await Task.deleteMany({owner: user._id})

    next()
})

const User = mongoose.model('User', userSchema);

module.exports = User