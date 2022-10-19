// http request with NodeJS 'http' module

const http = require("http");

const url = "http://api.weatherstack.com/current?access_key=e08c63b54494ce631f66f77f24174a44&query=40,-75";

const request = http.request( url, (response) => {
    let data = ''

    response.on( 'data', (chunk) => {
        data += chunk.toString();
    })

    response.on( 'end', () => {
        const body = JSON.parse(data);
        console.log(body);
    })

})

request.on('error', (error) => {
    console.log( 'Error:', error );
})

request.end();