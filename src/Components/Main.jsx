import React, { useState, useEffect } from 'react'
import main from './Main.module.scss';


const Main = () => {
    const apiKey = "a5056b2cc7ebb66431740de544b8888f";

    const [city, setCity] = useState({});
    const [searchText, setSearchText] = useState("");
    const [coords, setCoords] = useState({});
    const [weatherData, setWeatherData] = useState({});

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


    const handleChange = (e) => {
        setSearchText(e.target.value);
    }

    const get_weather = () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                setCity(data)
                setCoords({
                    lat: data.coord.lat,
                    long: data.coord.lon
                })
            })
            .then(setSearchText(""))

    }






    useEffect(() => {
        if (coords.lat) {
            const getCity = () => {
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&units=metric&appid=${apiKey}`)
                    .then(res => res.json())
                    .then(data => setCity(data))
            }

            const getLocation = () => {
                fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.long}&units=metric&appid=${apiKey}`)
                    .then(res => res.json())
                    .then(data => setWeatherData(data))
            }

            getLocation();
            getCity();
        }
    }, [coords])







    if (city.sys) {
        return (
            <div className={main.weather}>
                <form action="submit">
                    <input type="text" name="city" id="city" value={searchText}
                        onChange={handleChange}
                    />
                    <button type="submit" onClick={(e) => {
                        e.preventDefault()
                        get_weather(city)
                    }}>Get Weather</button>
                </form>


                <h1>{city.name + ", " + city.sys.country}</h1>
            </div>
        )
    }
    else {
        return (
            <div className="loading">

            </div>
        )
    }
}
export default Main;