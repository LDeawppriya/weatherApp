const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItetmsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
const months= ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

const API_KEY ='f2fa54d6c9dead633ab0f1f30c7b275b';


setInterval(()=> {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12:hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0' +hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes <10? '0' +minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]
},1000);
getWeatherData()
function getWeatherData(){
    navigator.geolocation.getCurrentPosition((success) => {

        let {latitude, longitude} = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res =>res.json()).then(data=>{
            
        console.log(data)
        showWeatherData(data);
        })
    })
}

function showWeatherData (data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

    timezone.innerHTML = data.timezone;

    currentWeatherItetmsEl.innerHTML=
    `<div class="weather-item">
    <div>Humidity</div>
    <div>${humidity}%</div>
</div>
<div class="weather-item">
    <div>Pressure</div>
    <div>${pressure}</div>
</div>
<div class="weather-item">
    <div>Wind speed</div>
    <div>${wind_speed}</div>
</div>

`;
let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML =`
            <img src=" http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon" />
                     <div class="other">
                        <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                        <div class="temp">Night - ${day.temp.night}°C </div>
                        <div class="temp">Day - ${day.temp.day}°C </div>
                     </div>
            `
        }else{
            otherDayForcast +=`
                <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src=" http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon" />
                <div class="temp">Night - ${day.temp.night}°C </div>
                <div class="temp">Day - ${day.temp.day}°C </div>
            </div>
            
            `
        }
    })

    weatherForecastEl.innerHTML = otherDayForcast;
}