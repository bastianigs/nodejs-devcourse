const mongoose = require( 'mongoose' );

const dbURL = dbName => 
    "mongodb+srv://dbUser:dbUserPassword@cluster0.h9dzpph.mongodb.net/" + encodeURIComponent(dbName) + "?retryWrites=true&w=majority";

mongoose.connect( dbURL( 'task-manager-api' ) );

// ---------------------------------------------------------

// const me = new User({
//     name: '   Sebastian',
//     email: '    cOtes@gGGogle.com     ',
//     password: '   guilty'
// });

// me.save()
//     .then( result => console.log( result ) )
//     .catch( error => console.log( 'Error:', error ) );

// ---------------------------------------------------------

// const task = new Task({
//     description: '              Getting better in Mongoose library! So much information though c:'
// });

// task.save().then( res => console.log('New task added: ' + res.description))
//             .catch( err => console.log( 'Error happened!' ));