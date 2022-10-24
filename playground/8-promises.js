// THIS IS DONE BY CALLBACKS - FOR COMPARATION
// this was started when 8-promises.js jumped in too, for comparision
// const doWorkCallback = (callback) => {
//     setTimeout(() => {
//         // callback( 'This is my errors!', undefined );
//         callback( undefined, [1, 4, 7] );
//     }, 2000)
// }

// doWorkCallback( (error, result) => {
//     if (error) return console.log( error );

//     console.log( result );
// })


// THIS IS DONE BY PROMISES
const doWorkPromise = new Promise( (resolve, reject) => {
    setTimeout( () => {
        // resolve( [7, 4, 1] ); // this will apply to .then()
        reject( 'Things went wrong' ); // this will apply to .catch()
    }, 2000 );
})

doWorkPromise
    .then( (result) => {
        console.log( 'Success!', result );
    })
    .catch( (error) => {
        console.log( 'Error:', error );
    });