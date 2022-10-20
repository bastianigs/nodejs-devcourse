const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
//------------------------------------------------------

console.log( __dirname );
console.log( path.join(__dirname, '../public') );

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join( __dirname, "../public" );
const viewsPath = path.join( __dirname, '../templates/views' );
const partialsPath = path.join( __dirname, '../templates/partials' );

// Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use( express.static( publicDirectoryPath ) );

app.get( '', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Igescu Sebastian'
    });
})

app.get( '/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: "Igescu Sebastian"
    })
})

app.get( '/help', (req,res) => {
    res.render('help', {
        vision: 'Together, we are more than business!',
        title: 'Help',
        name: 'Igescu Sebastian'
    })
})

app.get( '/weather', (req, res) => {
    if (!req.query.address)
        return res.send({ error: 'You must provide an address!' })


    geocode( req.query.address, (error, { loc, lat, long } = {}) => {
        if (error) return res.send({ error });

        forecast( lat, long, (error, forecast) => {
            if (error) return res.send({ error });
        
            res.send({
                forecast: forecast,
                location: loc,
                address: req.query.address
            });
        })
    })
})

app.get( '/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    

    console.log( req.query.search );
    res.send({
        products: []
    });
})

// 404 page not found
app.get( '/help/*', (req, res) => {
    res.render( '404', {
        error: 'Oops, help article not found!',
        title: '404',
        name: 'Igescu Sebastian'
    });
})

app.get( '*', (req, res) => {
    res.render( '404', {
        error: 'Oops, 404 error: Page not found!',
        title: '404',
        name: 'Igescu Sebastian'
    });
})

app.listen( 3000, () => {
    console.log( 'Server is up on port 3000.' );
})