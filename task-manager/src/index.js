const express = require( 'express' );
require( './db/mongoose' ); // will just make sure mongoose.js runs. (and will connect to the db)

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express();
const port = process.env.PORT || 3000;

//--------------------------------------------------------------

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled.')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Server is currently in maintenance mode. Please come back later!')
// })

app.use(express.json());
app.use(userRouter)
app.use(taskRouter)

app.listen( port, () => {
    console.log( 'Server is up on port ' + port );
})


const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    // const task = await Task.findById('63595201e143e7623cf6139f')
    // await task.populate('owner') //.execPopulate() -> deprecated
    // console.log(task.owner)

    const user = await User.findById('635951210888e11c4c79fab4')
    await user.populate('tasks')
    console.log(user.tasks)
}

main()