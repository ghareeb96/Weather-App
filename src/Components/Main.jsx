import React, { useState, useEffect } from 'react'
import main from './Main.module.scss';


const Main = () => {
    const apiKey = "a5056b2cc7ebb66431740de544b8888f";

    const [city, setCity] = useState("");
    const [weather, setWeather] = useState({});
    const [coords, setCoords] = useState({});
    const handleChange = (e) => {
        setCity(e.target.value);
    }

    useEffect(() => {
        if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(position => {
                setCoords({
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                })
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }

    }, [])

    const getLocation = () => {
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.long}&units=metric&lang=ar&appid=${apiKey}`)
            // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&units=metric&lang=ar&appid=${apiKey}`)
            .then(res => res.json())
            .then(data => console.log(data))
    }
    const getLocation2 = () => {
        // fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.long}&units=metric&lang=ar&appid=${apiKey}`)
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&units=metric&lang=ar&appid=${apiKey}`)
            .then(res => res.json())
            .then(data => console.log(data))
    }

    const get_weather = (city) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
            .then(res => res.json())
            .then(data => console.log(data))
            .then(setCity(""))
    }
    const unix = 1609115724;
    const ms = unix * 1000;
    const date = new Date(ms);
    console.log(date.toLocaleString());

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
            <button onClick={getLocation}>Get Location</button>
            <button onClick={getLocation2}>Get Location</button>

        </div>
    )
}
export default Main;