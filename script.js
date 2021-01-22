$(document).ready(function(){
//global Variables
var cities = [];
//Hide five day forecast on page load
    $("#currentCity").hide();
    $("#fiveDay").hide();
//Three API calls, append/text using currentCity ID's

//API call for current searched city (UV in here?)

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
