const apiKey = "c543aef886d857dc14b200b35cedf18c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherContainer = document.querySelector(".weather");
const defaultCity = "Narowal"; 

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
        document.querySelector(".description").innerHTML = data.weather[0].description;

        

       
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "image/cloud.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "image/heavyrain.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "image/sun.png";
        } else if (data.weather[0].main == "Mist" || data.weather[0].main == "Fog") {
            weatherIcon.src = "image/mist.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "image/moderaterain.png";
        } else if (data.weather[0].main == "Smoke") {
            weatherIcon.src = "image/smoke.png";
        } else {
            weatherIcon.src = "image/default.png";
        }

        
        weatherContainer.style.display = "block";

        
        localStorage.setItem("city", city);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

searchBtn.addEventListener("click", () => {
    let city = searchBox.value.trim();
    if (!city) {
        city = defaultCity; 
    }
    checkWeather(city);
});


window.addEventListener("load", () => {
    const storedCity = localStorage.getItem("city");
    if (storedCity) {
        checkWeather(storedCity);
    } else {
        checkWeather(defaultCity); 
    }
});