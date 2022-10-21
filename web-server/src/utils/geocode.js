const request = require("postman-request");
//-----------------------------------------

const geocode = (locationName, callback) => {
    const coordsURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(locationName) + ".json?limit=1&access_token=pk.eyJ1Ijoic3NlZWJieXkiLCJhIjoiY2w5ZTZ4ZTFtMGZ3ZDN3bDkycG15eGVsayJ9._qmfu-45CI6J3C03qY8icg";

    request({ url: coordsURL, json: true }, (error, { body } = {}) => {
        if (error) return callback( "Unable to connect to mapbox service!" );
        else if (!body.features[0]) return callback( "Unable to find location. Try another search." );

        const [ loc, long, lat ] = [ body.features[0].place_name, ...body.features[0].center ];
        callback( undefined, { loc, lat, long } );
    })
}

//-----------------------------------------
module.exports = geocode