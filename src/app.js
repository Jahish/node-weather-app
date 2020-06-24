const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');
const viewsPath = path.join(__dirname, '../templates/views');

// Setup handlebars engine and views location
hbs.registerPartials(partialsPath);
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) =>{
    res.render('index', {  
        title: 'Weather',
        name: 'Wali Hamidi'
    });
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Wali Hamidi'
    });
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help',
        helpMessage: 'This is some helpful text.',
        name: 'Wali Hamidi'
    });
})

app.get('/weather', (req, res) =>{

    if(!req.query.address){
        return res.send({
            error: "Address must be provided!"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) =>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        })
    })
})

app.get('/products', (req, res) =>{

    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('404', {
        title: '404',
        errorMessage: "Help article not found.",
        name: 'Wali Hamidi'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        errorMessage: "page not found.",
        name: 'Wali Hamidi'
    });
})

app.listen(port, () =>{
    console.log('Server is up and running!');
})