//jshint esversion:6
const express = require("express");
const https = require("https");

const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.get("/", function(req, res) {

res.sendFile(__dirname + "/index.html");
});

app.post("/",   function(req, res){
  console.log(req.body.cityName);

  const query = req.body.cityName;
  const apikey = "8ceae4429e0212cf91409c4f053d30da";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;

    https.get(url, function (response) {
      console.log(response.statuscode);

      response.on("data", function (data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
        res.write("<h1>The Temperature in this "+ query +" is "+ temp + " Degrees Celcius.</h1>" );
        res.write("<p>The Weather is "+ description + ".</p>");
        res.write("<img src="+ imageUrl + ">");
        res.send();
      });
    });

}) ;

app.listen(3000, function () {
  console.log("server is running on port 3000!");
});
