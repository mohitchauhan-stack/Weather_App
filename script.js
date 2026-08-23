// 1. Elements
// 2. User interaction
// 3. API
// 4. Data processing
// 5. UI rendering
// 6. Helper functions

// --------- FETCH ALL ELEMENTS ---------
const city_input = document.querySelector(".city_input");
const search_btn = document.querySelector(".search_btn");

const weather_info = document.querySelector(".weather_info");
const search_city = document.querySelector(".search_city");
const country_txt = document.querySelector(".country_txt");
const current_date_txt = document.querySelector(".current_date_txt");
const temp_text = document.querySelector(".temp_text");
const condition_txt = document.querySelector(".condition_txt");
const humidity_value_txt = document.querySelector(".humidity_value_txt");
const wind_value_txt = document.querySelector(".wind_value_txt");
const weather_summary_img = document.querySelector(".weather_summary_img");
const forecast_items_container = document.querySelector(
  ".forecast_items_container",
);
const not_found = document.querySelector(".not_found");
const network_error = document.querySelector(".network_error");
const forecast_error = document.querySelector(".forecast_error");
const forecast_loading = document.querySelector(".forecast_loading");

const loading = document.querySelector(".loading");

// --------- USER INTERACTIONS ---------
city_input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    searchCity();
  }
  // console.log(e.key);
});

search_btn.addEventListener("click", () => {
  searchCity();
});

function searchCity() {
  if (!city_input.value.trim()) {
    alert("Input field is empty!");
    return;
  }

  not_found.style.display = "none";
  network_error.style.display = "none";
  search_city.style.display = "none";
  weather_info.style.display = "none";

  loading.style.display = "flex";

  getWeatherData(city_input.value);
}

// --------- API KEYS ---------
const API =
  "https://api.openweathermap.org/data/2.5/weather?q={city}&appid=8f50733eee629e68be38f19487ab2e93&units=metric";

const FORECAST_API =
  "https://api.openweathermap.org/data/2.5/forecast?q={city}&appid=8f50733eee629e68be38f19487ab2e93&units=metric";

// --------- GET WEATHER DATA ---------
async function getWeatherData(city) {
  try {
    const response = await fetch(API.replace("{city}", city));

    const data = await response.json();

    if (data.cod !== 200) {
      loading.style.display = "none";

      errorMessage();
      return;
    }

    loading.style.display = "none";
    network_error.style.display = "none";

    weather_info.style.display = "flex";
    weather_info.style.flexDirection = "column";
    weather_info.style.gap = "25px";

    country_txt.textContent = data.name;

    current_date_txt.textContent = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      weekday: "short",
    });

    temp_text.textContent = Math.round(data.main.temp) + " °C";
    condition_txt.textContent = data.weather[0].main;
    humidity_value_txt.textContent = data.main.humidity;
    wind_value_txt.textContent = data.wind.speed + " M/s";
    weather_summary_img.src = getWeatherImage(data.weather[0].main);

    // console.log(data);

    getForecastData(city_input.value);
  } catch (error) {
    loading.style.display = "none";
    network_error.style.display = "flex";
  }
}

function errorMessage() {
  weather_info.style.display = "none";
  search_city.style.display = "none";
  not_found.style.display = "flex";
}

// --------- GET FRORECAST DATA ---------
async function getForecastData(city) {
  forecast_loading.style.display = "block";
  forecast_error.style.display = "none";
  try {
    let response = await fetch(FORECAST_API.replace("{city}", city));

    let data = await response.json();

    if (data.cod !== "200" && data.cod !== 200) {
      throw new Error("Forecast unavailable");
    }

    renderForecast(data);

    forecast_loading.style.display = "none";
    // console.log(data);
    // forecast_item_temp.textContent = Math.round(data.list[0].main.temp) + " °C";
    // forecast_item_date.textContent = new Date().toLocaleDateString("en-IN", {
    //   day: "numeric",
    //   month: "short",
    // });
    // forecast_item_img.src = getWeatherImage(data.list[0].weather[0].main);
  } catch (error) {
    forecast_loading.style.display = "none";
    forecast_error.style.display = "flex";

    console.log(error);
  }
}

// --------- RENDER FORECAST FUNCTION ---------
function renderForecast(data) {
  forecast_items_container.innerHTML = "";

  const dailyForecast = {};

  data.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];

    if (!dailyForecast[date]) {
      dailyForecast[date] = item;
    }
    // console.log(item);
  });

  // console.log(dailyForecast);

  const forecastDays = Object.values(dailyForecast).splice(1, 5);

  // console.log(forecastDays);

  forecastDays.forEach((item) => {
    const date = new Date(item.dt * 1000);

    const forecast_item = document.createElement("div");
    forecast_item.classList.add("forecast_item");

    forecast_item.innerHTML = `
        <h5 class="forecast_item_date txt_regular">
          ${date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
          })}
        </h5>

        <img src="${getWeatherImage(item.weather[0].main)}" alt="${item.weather[0].main}" class="forecast_item_img">

        <h5 class="forecast_item_temp txt_regular">
          ${Math.round(item.main.temp) + " °C"}
        </h5>
      `;

    forecast_items_container.appendChild(forecast_item);
  });
}

// --------- HELPER FUNCTION ---------
function getWeatherImage(condition) {
  const weatherImages = {
    Clear: "./assets/weather/clear.png",
    Clouds: "./assets/weather/clouds.png",
    Rain: "./assets/weather/rain.png",
    Drizzle: "./assets/weather/drizzle.png",
    Thunderstorm: "./assets/weather/thunderstorm.png",
    Snow: "./assets/weather/snow.png",
    Mist: "./assets/weather/mist.png",
  };

  return weatherImages[condition];
}
