$(document).ready(function(){
//global Variables
var cities = [];
//Hide five day forecast on page load
    $("#currentCity").hide();
    $("#fiveDay").hide();
//Three API calls, append/text using currentCity ID's

//API call for current searched city (UV in here?)
function currentCityForecast(city){
    var APIKEY = "20d3501773a839af3857d2b0374101f6";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=Imperial&appid=" + APIKEY;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var weatherIcon = response.weather[0].icon;
        var date = $("<h2>").text(moment().format('l'));
        var icon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"); 
        var temp = (response.main.temp)
            
        $("#currentCityName").text(response.name);
        $("#currentCityName").append(date);
        $("#currentCityName").append(icon);
        $("#currentCityTemp").text(temp.toFixed(2) + " F");
        $("#currentCityHumid").text(response.main.humidity + "%");
        $("#currentCityWind").text(response.wind.speed + "MPH");

            var lat = response.coord.lat
            var lon = response.coord.lon
            queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKEY + "&lat=" + lat + "&lon=" + lon; 
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response){
                var uvIndex = response.value;
                $("#currentCityUV").removeClass("favorable");
                $("#currentCityUV").removeClass("moderate");
                $("#currentCityUV").removeClass("severe");
                    if (uvIndex <= 2.9){
                        $("#currentCityUV").addClass("favorable");
                    } else if (uvIndex >= 3 && uvIndex <= 7.9){
                        $("#currentCityUV").addClass("moderate");
                    } else {
                        $("#currentCityUV").addClass("severe");
                    };

                    $("#currentCityUV").text(response.value);
                
            });   

            $("#currentCity").show();   
    }); 
};
//5 day forecast call
function fiveDayForecast(city){
    var apiKey = "20d3501773a839af3857d2b0374101f6"
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=Imperial&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var counter = 1
        for(var i=0; i < response.list.length; i += 8){
            var date = moment(response.list[i].dt_txt).format("l");
            var weatherIcon = response.list[i].weather[0].icon;
            var temp = (response.list[i].main.temp);
                
            $("#date" + counter).text(date);
            $("#icon" + counter).attr("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
            $("#temp" + counter).text(temp.toFixed(2) + " F");
            $("#humid" + counter).text(response.list[i].main.humidity + "%"); 
            counter++;

        };

        $("#fiveDay").show();   
    });
};
fiveDayForecast();
//Check local storage, if has data restore it
$("#searchBtn").click(function(){
    var cityInputs = $(this).siblings("#userInput").val().trim();
    $("#userInput").val("");
    if (cityInputs !== ""){
        if (cities.indexOf(cityInputs)== -1){
            cities.push(cityInputs);
            localStorage.setItem("searches",JSON.stringify(cities));
            console.log(cityInputs);
        };
    };
//Onclick to save to local storage

})
})
