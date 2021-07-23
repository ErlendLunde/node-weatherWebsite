const request = require("request");

const geocode = (adress, callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"
     + encodeURIComponent(adress) 
    +".json?access_token=pk.eyJ1IjoicmxuOTgiLCJhIjoiY2tyMHhxdnNkMWhqdTJ0cGx2eHRvMW41YSJ9.TzFJq6WcbNHnuPaaTqqkvg&limit=1"

    request({url, json: true}, (error, {body} = {})=>{
        

        if(error){
            callback("Cant connect to Geocode services", undefined)
        }else if(body.features.length === 0){
            callback("Can not find location, try another search")
        }else{
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                locationName: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode