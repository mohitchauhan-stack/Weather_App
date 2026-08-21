// const city_input = document.querySelector(".city_input");
// const search_btn = document.querySelector(".search_btn");

// const wearther_info = document.querySelector(".wearther_info");
// const not_found = document.querySelector(".not_found");
// const search_city = document.querySelector(".search_city");

// const country_txt = document.querySelector(".country_txt");
// const temp_text = document.querySelector(".temp_text");
// const condition_txt = document.querySelector(".condition_txt");
// const humidity_value_txt = document.querySelector(".humidity_value_txt");
// const wind_value_txt = document.querySelector(".wind_value_txt");
// const weather_summary_img = document.querySelector(".weather_summary_img");
// const current_date_txt = document.querySelector(".current_date_txt");
// const forecast_items_container = document.querySelector(
//   ".forecast_items_container",
// );

// const apiKey = "8f50733eee629e68be38f19487ab2e93";

// search_btn.addEventListener("click", () => {
//   if (city_input.value.trim() != "") {
//     updateWeatherInfo(city_input.value);
//     city_input.value = "";
//     city_input.blur();
//   }
// });

// city_input.addEventListener("keydown", (event) => {
//   if (event.key == "Enter" && city_input.value.trim() != "") {
//     updateWeatherInfo(city_input.value);
//     city_input.value = "";
//     city_input.blur();
//   }
// });

// async function getfetchData(endPoint, city) {
//   const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;

//   const response = await fetch(apiUrl);

//   return response.json();
// }

// function getCurrentDate() {
//   const currentDate = new Date();
//   const options = {
//     weekday: "short",
//     day: "2-digit",
//     month: "short",
//   };
//   return currentDate.toLocaleDateString("en-IN", options);
// }

// function getWeatherIcon(id) {
//   if (id <= 232) return "thunderstrom.png";
//   if (id <= 321) return "drizzel.png";
//   if (id <= 531) return "rain.png";
//   if (id <= 622) return "snow.png";
//   if (id <= 781) return "atmosphere.png";
//   if (id <= 800) return "clear.png";
//   else return "clouds.png";
//   // console.log(id);
// }

// async function updateWeatherInfo(city) {
//   const weatherData = await getfetchData("weather", city);

//   if (weatherData.cod != 200) {
//     showDisplaySection(not_found);
//     return;
//   }

//   console.log(weatherData);

//   const {
//     name: country,
//     main: { temp, humidity },
//     weather: [{ id, main }],
//     wind: { speed },
//   } = weatherData;

//   country_txt.textContent = country;
//   temp_text.textContent = Math.round(temp) + " °C";
//   condition_txt.textContent = main;
//   humidity_value_txt.textContent = humidity + " %";
//   wind_value_txt.textContent = speed + " M/s";
//   current_date_txt.textContent = getCurrentDate();
//   weather_summary_img.src = `assets/weather/${getWeatherIcon(id)}`;

//   await updateForecastInfo(city);
//   showDisplaySection(wearther_info);
// }

// async function updateForecastInfo(city) {
//   const forecastsData = await getfetchData("forecast", city);
//   const timeTaken = "12:00:00";
//   const todayDate = new Date().toISOString().split("T")[0];
//   forecast_items_container.innerHTML = "";

//   forecastsData.list.forEach((forecastWeather) => {
//     if (
//       forecastWeather.dt_txt.includes(timeTaken) &&
//       !forecastWeather.dt_txt.includes(todayDate)
//     ) {
//       updateForecastItems(forecastWeather);
//     }
//   });
// }

// function updateForecastItems(weatherData) {
//   console.log(weatherData);
//   const {
//     dt_txt: date,
//     weather: [{ id }],
//     main: { temp },
//   } = weatherData;

//   const dateTaken = new Date(date);
//   const dateOption = {
//     day: "2-digit",
//     month: "short",
//   };
//   const dateResult = dateTaken.toLocaleDateString("en-IN", dateOption);

//   const forecast_item = `
//     <div class="forecaste_item">
//       <h5 class="forecate_item_date txt_regular">${dateResult}</h5>
//         <img src="./assets/weather/${getWeatherIcon(id)}" alt="" class="forecaste_item_img">
//       <h5 class="forecate_item_temp txt_regular">${Math.round(temp)} °C</h5>
//     </div>
//   `;

//   forecast_items_container.insertAdjacentHTML("beforeend", forecast_item);
// }

// function showDisplaySection(section) {
//   [wearther_info, not_found, search_city].forEach(
//     (section) => (section.style.display = "none"),
//   );

//   section.style.display = "flex";
// }

// 1. Elements
// 2. User interaction
// 3. API
// 4. Data processing
// 5. UI rendering
// 6. Helper functions

// --------- FETCH ALL ELEMENTS ---------
const city_input = document.querySelector(".city_input");
const search_btn = document.querySelector(".search_btn");
const wearther_info = document.querySelector(".wearther_info");
const country_txt = document.querySelector(".country_txt");
const search_city = document.querySelector(".search_city");

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
  search_city.style.display = "none";
  wearther_info.style.display = "flex";
  country_txt.textContent = city_input.value;
}
