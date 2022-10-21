const request = require("postman-request");
//-----------------------------------------

const forecast = (lat, long, callback) => {
    if (isNaN(lat) || isNaN(long)) return callback( "Latitude and Longitude must be numbers!" );

    const weatherURL = "http://api.weatherstack.com/current?access_key=e08c63b54494ce631f66f77f24174a44&query=" + lat + "," + long;

    request({ url: weatherURL, json: true }, (error, { body } = {}) => {
        if (error) return callback( "Unable to connect to weather service!" );
        else if (body.error) return callback( "Unable to find location ..." );

        const current = body.current;
        const forecast = current.weather_descriptions[0] + " - It is currently " + current.temperature + " degrees out, but it feels like " + current.feelslike + " degrees. (" + current.humidity + "% chances of rain)";
        callback(undefined, forecast);
    })
}

//-----------------------------------------
module.exports = forecast