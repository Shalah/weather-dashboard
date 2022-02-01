//console.log("IT IS LINKED!")

var API_KEY = "e5506cde11a7ad9262a963df1b8ee4eb";
var API_URL = "https://api.openweathermap.org/data/2.5/weather?q=New%20York%20City&appid=" + API_KEY;

var forecast = "https://api.openweathermap.org/data/2.5/forecast?q=New York City&cnt=5&appid=" + API_KEY

var forecast2 = "https://api.openweathermap.org/data/2.5/onecall?lat=40.7143&lon=-74.006&exclude={part}&appid=" + API_KEY
// {lon: -74.006, lat: 40.7143}

//var body = document.getElementsByNames('body');

fetch(API_URL)
    .then (function(response){
        return response.json()
    })

    .then(function(data){
        let info = document.createElement('p')
        console.log(data)
        info.setAttribute('src', data.main)
        info.textContent = 'test'
        //body.append(info);
        $('#the-Body').append(info)
    })


fetch(forecast)
    .then(function(response){
        return response.json();
    })
    .then(function(newData){
        console.log(newData)
})


fetch(forecast2)
    .then(function(response){
        return response.json();
    })
    .then(function(newData2){
        console.log(newData2)
    })