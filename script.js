//Event Listner to get location input

// script.js
var key1 = config.weather_apikey;
var key2 = config.photo_apikey;

document.getElementById("location-input").addEventListener('change', async () =>{

    //get location
    const location = document.getElementById("location-input").value;
     
    //fecth weather data
    const weatherData = await getWeatherData(location);

    //display the data
    displayWeatherData(weatherData);

});


const getWeatherData = async (location) => {

    if(!location){
        return {};
    }

    const apiKey = key1;
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
    const data = await response.json();

    return data;
}



const displayWeatherData = (data) =>{
    console.log(data);
    const { icon , description } = data.weather[0];
    const { name } = data;
    const { temp ,humidity } = data.main;
    const { speed } = data.wind;
    const { country } = data.sys;

        document.querySelector('.city').innerHTML ="Weather in " + name;
        document.querySelector('.temp').innerHTML =Math.floor( temp - 273.15)+"°C"
        document.querySelector('.icon').src="https://openweathermap.org/img/wn/" +icon+"@2x.png";
        document.querySelector('.description').innerHTML = description;
        document.querySelector('.humidity').innerHTML ="Humidity: " +humidity+"%";
        document.querySelector('.speed').innerHTML = "Wind Speed: " +speed+"m/s";
        document.querySelector('.country').innerHTML = "Country: " +country;
       
}

//random images
document.addEventListener("change", function() {
    const backgroundDiv = document.getElementById('background');
    const location = document.getElementById("location-input").value;
    const apiKey = key2;

    const query =  location;
    
    fetch(`https://api.pexels.com/v1/search?query=${query}&weather&per_page=1`,  {
        headers: {
            Authorization: apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.photos.length > 0) {
            const randomImageUrl = data.photos[0].src.original;
            backgroundDiv.style.backgroundImage =  `url(${randomImageUrl})`;
        }
    })
    .catch(error => console.error('Error fetching image:', error));
});

//random images



window.onload = async () => {
    const weatherData = await getWeatherData();
    displayWeatherData(weatherData);
    
}




