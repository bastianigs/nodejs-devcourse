const request = require("postman-request");
const yargs = require("yargs");
const chalk = require("chalk");

const url = "http://api.weatherstack.com/current?access_key=e08c63b54494ce631f66f77f24174a44&query=37.8267,-122.4233";

// request({ url: url, json: true }, (error, response) => {
//     const current = response.body.current;
//     console.log( current.weather_descriptions[0] + " - It is currently " + current.temperature + " degrees out, but it feels like " + current.feelslike + " degrees." );
// })

// Geocoding  => take a city/region name and convert it into lat & long
// Address -> Lat/Long -> Weather

// const coordsURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?limit=1&access_token=pk.eyJ1Ijoic3NlZWJieXkiLCJhIjoiY2w5ZTZ4ZTFtMGZ3ZDN3bDkycG15eGVsayJ9._qmfu-45CI6J3C03qY8icg";

// request({ url: coordsURL, json: true }, (error, response) => {
//     const [ lat, long ] = response.body.features[0].center;
//     console.log( "Los Angeles' Coords: " + lat + ", " + long);
// })

const geocode = locationName => {
    const coordsURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + locationName + ".json?limit=1&access_token=pk.eyJ1Ijoic3NlZWJieXkiLCJhIjoiY2w5ZTZ4ZTFtMGZ3ZDN3bDkycG15eGVsayJ9._qmfu-45CI6J3C03qY8icg";

    request({ url: coordsURL, json: true }, (error, response) => {
        if (error) console.log( "Unable to connect to mapbox service!" );
        else if (response.body.error) console.log( "Unable to find location" );
        else {
            const [ long, lat ] = response.body.features[0].center;
            console.log( locationName + " Coords: " + lat + ", " + long);
        }
    })
}

const getWeather = locationName => {
    const coordsURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + locationName + ".json?limit=1&access_token=pk.eyJ1Ijoic3NlZWJieXkiLCJhIjoiY2w5ZTZ4ZTFtMGZ3ZDN3bDkycG15eGVsayJ9._qmfu-45CI6J3C03qY8icg";

    request({ url: coordsURL, json: true }, (error, response) => {
        if (error) console.log( "Unable to connect to mapbox service!" );
        else if (response.body.features.length === 0) console.log( "Unable to find location" );
        else {
            const loc = response.body.features[0].text;
            const [ long, lat ] = response.body.features[0].center;

            console.log( chalk.green.bgWhite("Weather for " + chalk.bold(loc)) );

            const weatherURL = "http://api.weatherstack.com/current?access_key=e08c63b54494ce631f66f77f24174a44&query=" + long + "," + lat;
            request({ url: weatherURL, json: true }, (error, response) => {
                if (error) console.log( "Unable to connect to weather service!" );
                else if (response.body.error) console.log( "Unable to find location weather..." );
                else {
                    // console.log( locationName + " Coords: " + lat + ", " + long);
                    const current = response.body.current;
                    console.log( chalk.bgGreen(current.weather_descriptions[0] + " - It is currently " + current.temperature + " degrees out, but it feels like " + current.feelslike + " degrees.") );
                }
            })
        }
    })
}

yargs.command({
    command: "geocode",
    describe: "Return coords of a specified location.",
    builder: {
        loc: {
            describe: "Location name",
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv) {
        geocode( argv.loc );
    }
})

yargs.command({
    command: "weather",
    describe: "Weather Forecast",
    builder: {
        loc: {
            describe: "Location name",
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv) {
        getWeather(argv.loc);
    }
})

yargs.parse();