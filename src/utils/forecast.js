const request = require('request');

const forecast = (lat,long,callback) => {
    const url = `https://api.darksky.net/forecast/095fee26bc830af509dc79fd4c4b4ac2/${lat},${long}`
    request({ url, json: true }, (error, {body:result}) => {
        if(error){
            callback('Unable to connect to darksky api',undefined)
        }
        else if(result.error){
            callback('Unable to find weather for given coordinates',undefined)
        }
        else {
            callback(undefined,result.daily.data[0].summary + ' It is currently ' + result.currently.temperature + ' Farenheit out. There is a ' + result.currently.precipProbability + '% chance of rain. The high today is '+result.daily.data[0].temperatureHigh+' with a low of '+result.daily.data[0].temperatureLow)
        }
    })

}

module.exports = {
    forecast
}