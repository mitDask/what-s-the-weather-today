const container = document.querySelector(".container");
const error = document.querySelector(".error");
const search = document.querySelector(".searchDiv button");
const details = document.querySelector(".details");
const weather = document.querySelector(".box");
const searchDiv = document.querySelector(".searchDiv");
const humidity = document.querySelector(".humidity");

const API_KEY = "efce75c76c508fa4f5efbe2a03f224f0";
const API_URL =
  "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}";

details.style.display = "none";

search.addEventListener("click", function () {
  const city = document.querySelector(".searchbox").value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.display = "none";
        details.style.display = "none";
        error.style.display = "block";
        error.classList.add("showUp");
        return;
      }

      error.style.display = "none";
      error.classList.remove("showUp");
      const image = document.querySelector(".box-img");
      const temperature = document.querySelector(".temp");
      const description = document.querySelector(".descr");
      const humidity = document.querySelector(".humidity");
      const wind = document.querySelector(".wind");

      // switch (json.weather[0].main) {
      //documentation
      switch (json.weather[0].main) {
        case "Clear":
          image.src = "img/sun-w-cloudd.jpg";
          break;

        case "Rain":
          image.src = "img/rain-w-cloud.jpg";

        case "Storm":
          image.src = "img/storm.avif";
          break;

        case "Cloudy":
          image.src = "img/cloudy.jpg";
          break;

        case "scattered clouds":
          image.src = "img/cloudy.jpg";
          break;

        case "Snow":
          image.src = "img/snow-rain.jpg";
          break;

        case "Haze":
          image.src = "img/cloudy.jpg";
          break;

        default:
          document.querySelector(".wind-par").style.display = "none";
          image.src = "";
          break;
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}°C`;
      wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;
      humidity.innerHTML = `${json.main.humidity}%`;
      description.innerHTML = `${json.weather[0].description}`;

      weather.style.display = "";
      weather.classList.add("showUp");
      details.style.display = "";
      details.classList.add("showUp");
      container.style.height = "590px";
    });
});
