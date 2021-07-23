const request = require("request");

const forcast = (lat, long, callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=a91db6ea11721ee809df16ea0fe6875e&query="
    + encodeURIComponent(lat)
    +" "
    + encodeURIComponent(long)

    request({url, json: true}, (error, {body} = {})=>{


        if(error){
            callback("Problems connecting to weather services", undefined)
        }else if(body.error){
            callback("Could not find forcast, cordinates might be wrong", undefined)
        }else{

            callback(undefined,{
                temp: body.current.temperature,
                feelsLike: body.current.feelslike
                
            })
        }
    })

}

module.exports = forcast
