document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=d2e245fe47034372fc25cb85a29f6e2a";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let results = "";
      results += '<br><h2>Weather in ' + json.name + "</h2>";
      for (let i=0; i < json.weather.length; i++) {
        results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += '<h3>' + json.main.temp + " &deg;F</h3>"
      results += "<p>"
      for (let i=0; i < json.weather.length; i++) {
        results += json.weather[i].description
        if (i !== json.weather.length - 1)
          results += ", "
      }
      results += "</p>";
     results += "<br><p> Min: " + json.main.temp_min + " &deg;F<br>Max: " + json.main.temp_max + " &deg;F<br>Feels like: " + 
     json.main.feels_like + " &deg;F<br>Pressure: " + json.main.pressure + " mb<br>Humidity: " + json.main.humidity + "%<br>Wind: " + json.wind.speed
     + " mph, " + json.wind.deg + "&deg;</p>"; 
     document.getElementById("weatherResults").innerHTML = results;
    });
  const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=d2e245fe47034372fc25cb85a29f6e2a";
  fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let forecast = "<hr><br><h2>5 Day/3 Hour Forecast</h2>";
      for (let i=0; i < json.list.length; i++) {
        if(i==0 || i%8==0){
                forecast += "<h3>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY') + "</h3><br/>";
        }
        forecast += "<h4>" + moment(json.list[i].dt_txt).format('h:mm a') + "</h4>";
        forecast += "<p>Temperature: " + json.list[i].main.temp + " &deg;F</p>";
        forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
      }
      document.getElementById("forecastResults").innerHTML = forecast;
    });
});
