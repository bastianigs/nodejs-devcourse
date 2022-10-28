const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Marius Dumbrava',
    email: 'mariusdumbrava@trash-mail.com',
    password: 'improve',
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Maria Niculescu',
    email: 'marianiculescu@trash-mail.com',
    password: 'improve',
    tokens: [{
        token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Work and improve Menthality',
    completed: true,
    owner: userOneId
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Get better and better',
    completed: true,
    owner: userOneId
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Do something wich has a big impact at work!',
    completed: true,
    owner: userTwoId
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()

    await new User(userOne).save()
    await new User(userTwo).save()

    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,

    taskOne,
    taskTwo,
    taskThree,

    setupDatabase
}