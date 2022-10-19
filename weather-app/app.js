const chalk = require("chalk");

const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");
//----------------------------------------------------------------

const getGeocode = locationName => {
    geocode( locationName, (error, { loc, lat, long }) => {
        if (error) return console.log( error );
        console.log( loc + " Coords: " + lat + ", " + long);
    })
}

const getForecast = locationName => {
    geocode( locationName, (error, { loc, lat, long } = {}) => {
        if (error) return console.log( "Error:", error );
        console.log( chalk.green.bgWhite("Weather for " + chalk.bold( loc )) );

        forecast( lat, long, (error, { weather_descriptions:description, temperature, feelslike } = {}) => {
            if (error) return console.log( "Error:", error );
            console.log( chalk.bgGreen( description + " - It is currently " + temperature + " degrees out, but it feels like " + feelslike + " degrees." ) );
        })
    })
}

const isError = string => chalk.red(string);

const cmd = process.argv[2];
if (!cmd) return console.log( isError('Available commands: geocode <locName>, weather <locName>') );
else if (cmd !== "geocode" && cmd !== "weather") return console.log( isError('Available commands: geocode <locName>, weather <locName>') );

const location = process.argv[3];
if (!location) return console.log( isError('Error - Correct syntax: ' + cmd + ' <locationName>') );
else if (cmd == "geocode") getGeocode(location);
else if (cmd == "weather") getForecast(location);