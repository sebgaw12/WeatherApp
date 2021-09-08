function showWeather(cityName, numOfDays){
    const key = " f41b46cc3a8840c88c3125528210109";
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${cityName}&days=${numOfDays}`)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            const info = document.querySelector(".weather__info");
            const details = document.querySelector(".weather__details");
            const foreCast = document.querySelector(".weather__forecast");
            const icon = document.querySelector(".weather__icon");
            icon.innerHTML = `<img src="${json.current.condition.icon}"/>`;
            info.innerHTML = `<div class="city">
                            <span class="city__name">${json.location.name}</span><span class="btn btn&#45;&#45;icon">
                            <i class="material-icons">edit</i></span>
                          </div>
                          <div class="temperature">
                            <span class="temperature__value">${json.current.temp_c}</span>&deg;C
                          </div>`;
            details.innerHTML = `<li>
                                <img src="/assets/icons/pressure.svg"/>
                                <span class="pressure__value">${json.current.pressure_mb}hPa</span>
                             </li>
                             <li>
                                <img src="/assets/icons/humidity.svg"/>
                                <span class="humidity__value">${json.current.humidity}%</span>
                             </li>
                             <li>
                                <img src="/assets/icons/wind-speed.svg"/>
                                <span class="wind-speed__value">${json.current.wind_kph} kph</span>
                             </li>`;

            foreCast.innerHTML = "";
            json.forecast.forecastday.forEach(el => {
                const days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"]
                let dayOfWeek = new Date (el.date);
                foreCast.innerHTML += (
                    `<li>
                      <span class="day">${days[dayOfWeek.getDay()]}</span>
                      <img src="${el.day.condition.icon}"/>
                      <span class="temperature">
                          <span class="temperature__value">${el.day.maxtemp_c}</span>&deg;C
                      </span>
                </li>`
                );
            });
            const close = document.getElementById("close_module");
            const weatherModule = document.querySelector(".module__weather")
            close.addEventListener("click", () => weatherModule.remove());
        })
        .catch(err => console.log(err));
}

showWeather("auto:ip", 5)

const buttonAddCity = document.querySelector(".btn_show");

const showSearch = () =>{
    const search = document.querySelector(".module__form");
    search.removeAttribute("hidden");
}

const hideSearch = (qualifiedName, value) =>{
    const search = document.querySelector(".module__form");
    search.setAttribute("hidden", value);
}

buttonAddCity.addEventListener("click", showSearch);

const hide = document.querySelector(".btn--close");
hide.addEventListener("click", hideSearch);

const getCityName = document.getElementById("search");


