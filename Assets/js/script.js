//console.log("IT IS LINKED!")

// var API_KEY = "e5506cde11a7ad9262a963df1b8ee4eb";
// var API_URL = "https://api.openweathermap.org/data/2.5/weather?q=New%20York%20City&appid=" + API_KEY;

// var forecast = "https://api.openweathermap.org/data/2.5/forecast?q=New York City&cnt=5&appid=" + API_KEY

// var forecast2 = "https://api.openweathermap.org/data/2.5/onecall?lat=40.7143&lon=-74.006&exclude={part}&appid=" + API_KEY

// var btn = document.querySelector (".button");
// var inputValue = document.querySelector(". inputValue");
// var title = document.querySelector(".title");
// var temp = document.querySelector(".temp")
// var wind = document.querySelector(".wind")
// var numidity = document.querySelector(".humidity")
// var searchEl = document.getElementById("search-button");
// var uvEl = document.getElementById("UV-index");
// function btnFunction(){
//     fetch(API_URL + inputValue + API_KEY)
//     .then (response => response.json())
//     .then(function(data){
//         console.log(data);
//     })
// }

// btn addEventListener('click', btnFunction)

// // {lon: -74.006, lat: 40.7143}


$(document).ready(function(){

  
    dataHistory()
  
      
      hardCodedCity(); 
        //This is a hardcoded function
        // The for loop did not work as it should

    function hardCodedCity() {
        var API_KEY = "e5506cde11a7ad9262a963df1b8ee4eb";
        var url = "https://api.openweathermap.org/data/2.5/weather?q=New York City&appid=" + API_KEY
        $.get(url, function (data, status) {
            //console.log(data)
            displayData(data)
            fiveDaysForecast(data.name) 
        })

    }
    
        //function to display difault city 
         function displayData(data){
  
          var icon = data.weather[0].icon;
          var iconUrl = "https://openweathermap.org/img/wn/" + icon + ".png";
          $('#icon-w').attr('src',iconUrl)
        
          var currentDate = new Date(data.dt * 1000).toISOString(); //https://stackoverflow.com/questions/56070796/show-day-name-instead-of-number-from-open-weather-api-response
          //convert date 
          var display =  data.name + " (" + moment(currentDate).format("MM/D/YYYY") + ")"
          $('#cityName').text(display)
          //convertion to °F
          var tempFar = parseInt((data.main.temp - 273.15)* 9/5 + 32);
  
          // This displays the temperature
          $('#temperature').text(tempFar+ " °F")
          // This displays the humidity
         $('#humidity').text(data.main.humidity + "%" )
         // This displays the wind speed 
         $('#wind').text(data.wind.speed)
  
          // This is second ajax call to get the uv index
              // http://api.openweathermap.org/data/2.5/uvi/forecast?appid=0946b5eb988b3caf2e24954f8caf2636&lat={lat}&lon={lon}&cnt={cnt}
              var lat = data.coord.lat;
              var lon = data.coord.lon;
              $.ajax({
                method: "GET",
                url:
                  "https://api.openweathermap.org/data/2.5/uvi/forecast?appid=e5506cde11a7ad9262a963df1b8ee4eb&lat=" +
                  lat +
                  "&lon=" +
                  lon
              }).then(function(uvdata) {
                console.log(uvdata);
                $("#uv").text(uvdata[0].value);
              });
         }
  
         // on click on submit=> event listener on search button
         $("#search-button").click(function(event){
           event.preventDefault()
  
            //check if value is valid => size !=0
            var city = $("#search-input")
            .val()
            .trim();
           console.log(city)
           
      // api call: GET POST PUT DELETE
           var ApiUrl ="https://api.openweathermap.org/data/2.5/weather?q=" + city +"&APPID=" + API_KEY;
         
           $.ajax({
            method: "GET",
            url: ApiUrl
          }).then(function(response) {
            
            localStorage.setItem(city, JSON.stringify(response));
      
            
            var li = $(
              `<button type='button' class='list-group-item list-group-item-action' id='${city}'>${city}</li>`
            );
            
            li.appendTo("#search-history");
      
            
            displayData(response);
      
            //this calls the 5 days api
            fiveDaysForecast(city);
          });
     
         })
  
  
  
         function fiveDaysForecast(city) {
          //API CALL 
          var ApiUrl =
            "https://api.openweathermap.org/data/2.5/forecast?q=" +
            city +
            "&APPID=e5506cde11a7ad9262a963df1b8ee4eb";
          $.ajax({
            method: "GET",
            url: ApiUrl
          }).then(function(data) {
            console.log(data);
            $("#forecast").empty();
            var forecastArray = data.list;
      
            forecastArray.forEach(function(forecast, index) {
              
              var forecastDateTxt = forecast.dt_txt;
      
              
              var forecastDate = forecastDateTxt.split(" ")[0];
              var forecastTime = forecastDateTxt.split(" ")[1];
              
      
              if (forecastTime === "00:00:00") {
                var card;
                if (index === forecastArray.length - 1) {
                  card = $(
                    "<div class='card bg-primary text-white  col col-md-3 col-lg-2 col-sm-3 col-xs-12' style=''>"
                  );
                } else {
                  card = $(
                    "<div class='card mr-4 mr-2 bg-primary text-white col col-md-3 col-lg-2 col-sm-3 col-xs-12' style=''>"
                  );
                }
                var cardBody = $("<div class='card-body my-1'>");
                var h5 = $("<h6 class='card-title'>")
                  .text(moment(forecastDate.trim()).format("MM/D/YYYY"))
                  .appendTo(cardBody);
      
                var imgUrl =
                  "https://openweathermap.org/img/wn/" +
                  forecast.weather[0].icon +
                  ".png";
                var img = $("<img>")
                  .attr("src", imgUrl)
                  .attr("alt", "Weather Forecast icon")
                  .appendTo(cardBody);
      
                var lineBreak = $("<br>").appendTo(cardBody);
                var tempFar = parseInt((forecast.main.temp - 273.15)* 9/5 + 32);
                var tempSpan = $("<span>")
                  .text(`Temp: ${tempFar} °F`)
                  .appendTo(cardBody);
      
                var lineBreak = $("<br>").appendTo(cardBody);
      
                var humiditySpan = $("<span>")
                  .text(`Humidity: ${forecast.main.humidity} %`)
                  .appendTo(cardBody);
      
                cardBody.appendTo(card);
      
                $("#forecast").append(card);
              }
            });
          });
        }
      
  
     //This function is used to keep a list of all the cities the users checked the weather 
  function dataHistory() {
    var cities = Object.keys(localStorage);
    //console.log(cities)
    cities.forEach(function(city) {
      var li = $(
        `<button type='button' class='list-group-item list-group-item-action' id='${city}'>${city}</li>`
      );
      li.appendTo("#search-history"); // This appends the list of items but does not completely work
    });
  }        
})