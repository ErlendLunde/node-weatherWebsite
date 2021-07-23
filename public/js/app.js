console.log("Client side js file is loaded")



const weatherForm = document.querySelector("form")
const search = document.querySelector("input")
const messgeOne = document.querySelector("#messageOne")
const messgeTwo = document.querySelector("#messageTwo")



weatherForm.addEventListener("submit",(event)=>{
    event.preventDefault()

    messgeOne.textContent ="Loading"
    messgeTwo.textContent =""

    const location = search.value

    fetch("/weather?adress=" + location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messgeOne.textContent = data.error
        }else{
            messgeOne.textContent = data.locationName
            messgeTwo.textContent = "Temprature: "+ data.temp + "°C" 
        }
    })
})

    console.log(location)
})