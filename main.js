const APIKey = "dabfeb4f927241579ae6df70a2a66982";
const baseURL = "https://api.weatherbit.io/v2.0/forecast/daily";
const cityInputHTML = document.getElementById("cityInput");
const countryInputHTML = document.getElementById("countryCodeInput");
const submitBtn = document.getElementById("submit");

const callTheAPI = (city, countryCode, event) => {
    event.preventDefault();
    const URL = `${baseURL}?city=${city.value},${countryCode.value}&key=${APIKey}`
    fetch(URL)
    .then(response => response.json())
    .then(weatherInfo => showInfo(weatherInfo.data[0]));
}

 submitBtn.addEventListener("click", (event) => callTheAPI(cityInputHTML, countryInputHTML, event));

const showInfo = (weatherObject) => {
    const { app_max_temp, 
            app_min_temp, 
            datetime, 
            weather: { 
                description, 
                icon } } = weatherObject;
    
    const weatherIcon = document.querySelector(".weather-icon img");
    const iconWithoutTheFirstLetter = icon.slice(1);
    weatherIcon.setAttribute("src", `icons/${iconWithoutTheFirstLetter}.png`)
    
    const descriptionWeather = document.querySelector(".description p");
    descriptionWeather.innerText = description;
    
    const maxTemp = document.querySelector(".max-temperature p");
    maxTemp.innerText = `Maximum temperature: ${app_max_temp} C`;

    const minTemp = document.querySelector(".min-temperature p");
    minTemp.innerText = `Minimun temperature: ${app_min_temp} C`;

    const dateTime = document.querySelector(".date-time p");
    dateTime.innerText = `Date: ${datetime}`;
}
