
const express = require("express")
const path = require("path")
const hbs = require("hbs")


const geocode = require(path.join(__dirname, "/utils/geocode"))
const forcast = require(path.join(__dirname, "/utils/weatherstack"))



//Set up exspress app
const app = express()

/////////////////
///CONFIG
/////////////////

//Set paths
const viewsPath = path.join(__dirname,"../templets/views")
const publicDir = path.join(__dirname, "../public")
const partialsPath = path.join(__dirname, "../templets/partials")

//Set up handlebars(hbs)
app.set("views", viewsPath)
app.set("view engine", "hbs")
hbs.registerPartials(partialsPath)

//Setup static derectory ("Standard directory")
app.use(express.static(publicDir))



//////////////////////////
///Request response routes
/////////////////////////
app.get("", (req, res) => {
    res.render("index", {
        title: "Weather app",
        name: "Erlend" 
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About the page",
        name: "Erlend" 
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        help_message: "This is a help messge to you!",
        title: "help",
        name: "Erlend"
    })
})

app.get("/weather", (req, res) =>{

    if(!req.query.adress){
        //Return to stop the function 
        //and not respond twise
        return res.send({
            error: "You must provide a adress"
        })
    }

    geocode(req.query.adress, (error, {locationName, lat, long} = {}) => {
        if(error){
            return res.send({error})
        }
        forcast(lat, long, (error, {temp , feelsLike} = {}) =>{
            if(error){
                return res.send({error})
            }
            res.send({
                temp,
                feelsLike,
                locationName,
                adress: req.query.adress
            })
        })

    })

})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        message: "Help article not found",
        name: "Erlend"
    })
})

app.get("*", (req, res) => {
    res.render("404",{
        title: "404", 
        message: "Page not found", 
        name: "Erlend"
    })
})

app.listen(3000, () => {
    console.log("server is up on port 3000")
})
