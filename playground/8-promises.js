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
// const doWorkPromise = new Promise( (resolve, reject) => {
//     setTimeout( () => {
//         // resolve( [7, 4, 1] ); // this will apply to .then()
//         reject( 'Things went wrong' ); // this will apply to .catch()
//     }, 2000 );
// })

// doWorkPromise
//     .then( (result) => {
//         console.log( 'Success!', result );
//     })
//     .catch( (error) => {
//         console.log( 'Error:', error );
//     });


// PROMISE CHAINING
const add = (a,b) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(a+b)
        }, 2000)
    })
}

// bad way. This is not chaining.
// add(1, 2)   .then( sum => {
//                 console.log( sum )

//                 add( sum, 5 )   .then( sum2 => console.log(sum2) )
//                                 .catch( e => console.log(e) )
//             })
//             .catch( error => {
//                 console.log( error );
//             })


// real promise chaining
add(1,1)
    .then( sum => {
        console.log(sum)
        return add(sum, 4)
    }).then( sum2 => {
        console.log(sum2)
    }).catch( error => {
        console.log(error)
    })
