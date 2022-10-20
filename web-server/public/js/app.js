console.log( 'Client side javascript file is loaded!' );

fetch('http://localhost:3000/weather?address=boston')
    .then( (response) => {
        response.json().then( (data) => {
            if (data.error) return console.log( data.error );

            console.log( "Location: " + data.location );
            console.log( "Forecast: " + data.forecast  );
        })
    });