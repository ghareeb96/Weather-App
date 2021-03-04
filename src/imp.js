const curunt_weather = {
    name: `api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}`,
    coords: `api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`,

}

dateObject.toLocaleString("en-US", {
    weekday: "long"
}) // Monday
dateObject.toLocaleString("en-US", {
    month: "long"
}) // December
dateObject.toLocaleString("en-US", {
    day: "numeric"
}) // 9
dateObject.toLocaleString("en-US", {
    year: "numeric"
}) // 2019
dateObject.toLocaleString("en-US", {
    hour: "numeric"
}) // 10 AM
dateObject.toLocaleString("en-US", {
    minute: "numeric"
}) // 30
dateObject.toLocaleString("en-US", {
    second: "numeric"
}) // 15
dateObject.toLocaleString("en-US", {
    timeZoneName: "short"
}) // 12/9/2019, 10:30:15 AM CST


const unix = 1609115724;
const ms = unix * 1000;
const date = new Date(ms);
console.log(date.toLocaleString());