$(document).ready(function () {

    
    var currentDayNow;
    setInterval(() => {
        currentDayNow = moment().format("MMMM Do YYYY");
    }, 1000)

    function resetData() {
        $("#citySearchItemList").empty();
        $(".mainDisplay").empty();
        $(".forecastDisplayBox").empty();
        for (var i = 0; i < 6; i++) {
            $(".forcastDay-" + i).empty();
        }
    }

    function mainDisplay() {
        var apiKey = "fe42b2c146dd1a39d1def1f468f5c416";
        var cityNameInput = $("#inputCityName").val().trim().toLowerCase();
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityNameInput + "&units=imperial&appid=" + apiKey;
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            console.log(response);
            let mainNameDisplay = response.name;
            let mainNameDisplayCountry = response.sys.country
            let temp = response.main.temp;
            let humidity = response.main.humidity;
            let windSpeed = response.wind.speed

            let longitude = response.coord.lat;;
            let latitude = response.coord.lon
            let getIcon = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png"
            let icon = $("<img>").attr("src", getIcon);

            let forcastqueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityNameInput + "&units=imperial&appid=" + apiKey
            $.ajax({
                url: forcastqueryURL,
                method: "GET",
            }).then(function (forecastresponse) {
                console.log(forecastresponse);

                for (var i = 0; i < forecastresponse.list.length; i++) {
                    var response = forecastresponse.list[i];
                    var forecast = new Date(response.dt_txt);
                    
                    if (forecast.getHours()=== 12){
                        let forecastDay = $("<div>").text(response.dt_txt);  
                        let getForecastIcon = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png"
                    let forecastIcon = $("<img>").attr("src", getForecastIcon);

                    let forceastDayTemp = $("<div>").text("Temp(F): " + response.main.temp);

                    let forecaseDayHumidity = $("<div>").text("Humidity: " + response.main.humidity + "%");
                    
                    $(".forecastDisplayBox").append($("<div>").addClass(" col-2 col-md-2 col-lg-2 border border-primary m-2").append(forecastDay, forecastIcon, forceastDayTemp, forecaseDayHumidity))
                    }
                    
                }
                
                
            });

            //main Display box
            $("#cityNameDisplay").text("Name: " + mainNameDisplay + " , " + mainNameDisplayCountry + ". " + currentDayNow).append(icon);
            $("#temperature").text("Temperature(F): " + temp);
            $("#humidity").text("Humidity: " + humidity + " %");
            $("#windSpeed").text("Wind Speend: " + windSpeed + " MPH");

            //uv index portion
            let uvqueryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + longitude + "&lon=" + latitude
            $.ajax({
                url: uvqueryURL,
                method: "GET"
            }).then(function (response) {
                $("#uvIndex").text("UV Index: " + response.value)
                if (response.value < 3) {
                    $("#uvIndex").removeClass().addClass("badge badge-success");
                } else if (response.value > 2 && response.value < 8) {
                    $("#uvIndex").removeClass().addClass("badge badge-warning")
                } else {
                    $("#uvIndex").removeClass().addClass("badge badge-danger")
                }
            });



        })
    }

    $("#searchbutton").on("click", function () {
        $(".forecastDisplayBox").html("");
        var cityNameInput = $("#inputCityName").val().trim().toLowerCase();
        if (cityNameInput == "") {
            return;
        } else {
            mainDisplay();
        }
        var citiesSearchList = [];
        let citySearchItemLi = $("<li>");
        citySearchItemLi.attr("data-name");
        citySearchItemLi.addClass("list-group-item")
        citySearchItemLi.text($("#inputCityName").val().trim().toLowerCase());
        $("#citySearchList").prepend(citySearchItemLi);

        if ()
        citiesSearchList.push(cityNameInput.toString())
        
        localStorage.setItem("cityNameInput", JSON.stringify(citySearchList))


    })

    $("#clearButton").on("click", function () {
        resetData();
        $("#citySearchItemList").empty();
        // localStorage.clear();
    })
});