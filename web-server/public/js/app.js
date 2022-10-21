console.log( 'Client side javascript file is loaded!' );

const getForecast = (address, callback) => {
    fetch('/weather?address=' + address)
        .then( (response) => {
            response.json().then( (data) => {
                if (data.error) return callback( data.error );

                callback(undefined, data.location, data.forecast);

                // console.log( "Location: " + data.location );
                // console.log( "Forecast: " + data.forecast  );
            })
        });
}

const weatherForm = document.querySelector( 'form' )
const searchElem = document.querySelector( 'input' )

const messageOne = document.querySelector( '#message-1' )
const messageTwo = document.querySelector( '#message-2' )

weatherForm.addEventListener( 'submit', (e) => {
    e.preventDefault()

    const location = searchElem.value;

    messageOne.textContent = ''
    messageTwo.textContent = 'Loading...'
    getForecast( location, (error, loc, forecast) => {
        if (error) return messageTwo.textContent = "Error: " + error;

        messageOne.textContent = loc
        messageTwo.textContent = forecast
        // console.log( "Location: " + loc );
        // console.log( "Forecast: " + forecast );
    });
})