const city_input = document.querySelector(".city_input");
const search_btn = document.querySelector(".search_btn");

const wearther_info = document.querySelector(".wearther_info")
const not_found = document.querySelector(".not_found");
const search_city = document.querySelector(".search_city")


const country_txt = document.querySelector(".country_txt");
const temp_text = document.querySelector(".temp_text");
const condition_txt = document.querySelector(".condition_txt");
const humidity_value_txt = document.querySelector(".humidity_value_txt");
const wind_value_txt = document.querySelector(".wind_value_txt");
const weather_summary_img = document.querySelector(".weather_summary_img");
const current_date_txt = document.querySelector(".current_date_txt");

const apiKey = "8f50733eee629e68be38f19487ab2e93"

search_btn.addEventListener("click", () => {

  if(city_input.value.trim() != ""){
    updateWeatherInfo(city_input.value);
    city_input.value = "";
    city_input.blur();
  }
})

city_input.addEventListener("keydown", (event) => {
  if(event.key == "Enter" && city_input.value.trim() != ""){
    updateWeatherInfo(city_input.value);
    city_input.value = "";
    city_input.blur();
  }
})

async function getfetchData(endPoint, city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(apiUrl);

  return response.json();
}


function getWeatherIcon(id) {
  if(id <= 232) return
  console.log(id);
}


async function updateWeatherInfo(city) {
  const weatherData = await getfetchData("weather", city);

  if(weatherData.cod != 200) {
    showDisplaySection(not_found)
    return
  }

  console.log(weatherData);

  const {
    name: country,
    main : {temp, humidity},
    weather: [{
      id,
      main
    }],
    wind: {speed},
  } = weatherData;

  country_txt.textContent = country;
  temp_text.textContent = Math.round(temp) + " °C";
  condition_txt.textContent = main;
  humidity_value_txt.textContent = humidity + " %";
  wind_value_txt.textContent = speed + " M/s";
  weather_summary_img.src = `assets/weather/${getWeatherIcon(id)}`;


  showDisplaySection(wearther_info)

  
}

function showDisplaySection(section) {
  [wearther_info, not_found, search_city].forEach(section => section.style.display = "none");

  section.style.display = "flex";
}