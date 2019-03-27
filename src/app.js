const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.listen(port,() => {
    console.log('Server is up on port' +port);
})

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather',
        name:'Vignesh'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About me',
        name:'Vignesh'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help',
        message:'We are here to help you',
        name:'Vignesh'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode.geocode(req.query.address,(error,{latitude,longitude,location}={}) => {
        if(error) {
            return res.send({
                error
            });
        }
        forecast.forecast(latitude, longitude, (error, data) => {
            if(error) {
                return res.send({
                    error
                });
            }
            res.send({
                forecast: data,
                location,
                address: req.query.address
            });
          })
    })
})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        });
    }
    res.send({
        products: []
    });
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404',
        message:'Help article not found',
        name:'Vignesh'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        message:'Page not found',
        name:'Vignesh'
    })
})
