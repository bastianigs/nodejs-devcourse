// setTimeout( () => {
//     console.log( "Two seconds are up" );
// }, 2000);

// const names = ["Sebastian", "Jen", "Jess"];
// const shortNames = names.filter( name => name.length <= 4 );

// const geocode = (address, callback) => {
//     setTimeout( () => {
//         const data = {
//             lat: 0,
//             long: 0
//         }
    
//         callback(data);
//     }, 2000);
// }

// geocode('Philadelphia', (data) => {
//     console.log( data );
// });

// const add = (x, y, callback) => {
//     setTimeout( () => {
//         callback( x+y )
//     }, 2000)
// }

// add(1, 4, sum => {
//     console.log( sum ) // Should print: 5
// })



// this was started when 8-promises.js jumped in too, for comparision
const doWorkCallback = (callback) => {
    setTimeout(() => {
        // callback( 'This is my errors!', undefined );
        callback( undefined, [1, 4, 7] );
    }, 2000)
}

doWorkCallback( (error, result) => {
    if (error) return console.log( error );

    console.log( result );
})