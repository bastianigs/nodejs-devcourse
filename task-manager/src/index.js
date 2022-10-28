// everything that was here was moved to math.js, as a need of refactorization to be able to load Express into test cases

const app = require('./app')
const port = process.env.PORT;

app.listen( port, () => {
    console.log( 'Server is up on port ' + port );
})