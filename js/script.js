// ?? ======================= GLOBAL VARIABLES ====================
const innerField = document.getElementById("input-field")
const btn = document.getElementById("find-btn")
const todayData = document.getElementById("today")
const tomorrowData = document.getElementById("tomorrow")
const dayAfterTomorrowData = document.getElementById("day-after-tomorrow")
const alertMessage = document.getElementById("alert-message")
// ?? ========================= HELPER FUNCTIONS ===================
function displayThreeDaysOfWeather(myData) {
  let dayOne = ""
  dayOne += `
       <div class="inner inner-card animate__animated animate__pulse">
              <div
                class="head d-flex justify-content-between align-items-center p-3">
                <h6>${new Date(myData.forecast.forecastday[0].date).toLocaleDateString("en-Us", { weekday: "long" })}</h6>
                <h6>${new Date(myData.forecast.forecastday[0].date).toLocaleDateString("en-US", { day: "numeric", month: "long" })}</h6>
              </div>
              <div class="content px-4 py-3">
                <p class="country-name">${myData.location.name || myData.location.country}</p>
                <h1 class="temprature-degree">${myData.current.temp_c}<sup>o</sup>C</h1>
                <img class="temprature-icon" alt="${myData.current.condition.text}" src="${myData.current.condition.icon}" />
                <p class="status">${myData.current.condition.text}</p>
                <div class="details d-flex gap-4 align-items-center">
                  <p>
                    <img src="./img/icon-umberella@2x.png" />
                    20%
                  </p>
                  <p>
                    <img src="./img/icon-wind@2x.png" />
                    ${myData.current.wind_degree}km/h
                  </p>
                  <p>
                    <img src="./img/icon-compass@2x.png" />
                    ${myData.current.wind_dir}
                  </p>
                </div>
              </div>
            </div>
    `
  todayData.innerHTML = dayOne
  let dayTwo = ""
  dayTwo +=
    `
     <div class="inner animate__animated animate__pulse">
            <div class="head text-center text-light py-3">
              <h6>${new Date(myData.forecast.forecastday[1].date).toLocaleDateString("en-US", { weekday: "long" })}</h6>
            </div>
            <div
              class="content-of-second-card d-flex flex-column justify-content-center align-items-center gap-4">
              <img src="${myData.forecast.forecastday[1].day.condition.icon}" class="sun-image" alt="${myData.forecast.forecastday[1].day.condition.text}" />
              <p class="max-temp-degree">${myData.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>c</p>
              <p class="min-temp-degree">${myData.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></p>
              <p class="status">${myData.forecast.forecastday[1].day.condition.text}</p>
            </div>
          </div>
    `
  tomorrowData.innerHTML = dayTwo
  let dayThree = ""
  dayThree += `
       <div class="inner animate__animated animate__pulse">
            <div class="head text-center text-light py-3">
              <h6>${new Date(myData.forecast.forecastday[2].date).toLocaleDateString("en-US", { weekday: "long" })}</h6>
            </div>
            <div
              class="content-of-second-card d-flex flex-column justify-content-center align-items-center gap-4">
              <img src="${myData.forecast.forecastday[2].day.condition.icon}" class="sun-image" alt="${myData.forecast.forecastday[2].day.condition.text}" />
              <p class="max-temp-degree">${myData.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>c</p>
              <p class="min-temp-degree">${myData.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></p>
              <p class="status">${myData.forecast.forecastday[2].day.condition.text}</p>
            </div>
          </div>
    `
  dayAfterTomorrowData.innerHTML = dayThree
}
// ?? ========================= MAIN FUNCTION ======================
async function getApi(country = "cairo") {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b851809d3dfb4f45a6d235351250405&q=${country}&days=7`)
    console.log(response)
    if (!(response.ok)) {
      throw new Error()
    }
    console.log(response)
    const data = await response.json()
    displayThreeDaysOfWeather(data)
  } catch (error) {
    console.log(error.message)
  }
}
// ?? ========================== EVENTS =========================
innerField.addEventListener("input", () => {
  const cityName = innerField.value.trim()
  if (cityName.length === 3)
    getApi(cityName)
  else if (cityName.length === 0)
    getApi()

})
btn.addEventListener("click", () => {
  const cityName = innerField.value.trim()
  if (cityName.length === 3)
    getApi(cityName)
  else if (cityName.length === 0)
    getApi()
})

document.addEventListener("DOMContentLoaded", () => {
  getApi()
})


