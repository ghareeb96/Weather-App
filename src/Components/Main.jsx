import React, { useState, useEffect } from 'react'


const Main = () => {
    const apiKey = "a5056b2cc7ebb66431740de544b8888f";

    const [city, setCity] = useState("");
    const [weather, setWeather] = useState({});

    const handleChange = (e) => {
        setCity(e.target.value);
    }

    const get_weather = (city) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
            .then(res => res.json())
            .then(data => console.log(data))
            .then(setCity(""))
    }

    return (
        <div className="weather">
            <h1>Hello Weather</h1>
            <form action="submit">
                <input type="text" name="city" id="city" value={city}
                    onChange={handleChange}
                />
                <button type="submit" onClick={(e) => {
                    e.preventDefault()
                    get_weather(city)
                }}>Get Weather</button>
            </form>
        </div>
    )
}
export default Main;