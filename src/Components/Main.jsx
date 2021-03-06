import React, { useState, useEffect } from 'react';
import CurrentWeather from "./CurrentWeather/CurrentWeather";
import HourlyWeather from "./HourlyWeather/HourlyWeather";
import DailyWeather from "./DailyWeather/DailyWeather";
import main from './Main.scss';
import Palestine from './Palestine.jpg';
import { ReactComponent as SearchIcon } from "./search-interface-symbol.svg"
import { ReactComponent as LocationIcon } from "./maps-and-flags.svg"


const Main = () => {
    const apiKey = "a5056b2cc7ebb66431740de544b8888f";

    const [city, setCity] = useState("");
    const [searchText, setSearchText] = useState("");
    const [coords, setCoords] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [hourlyWeather, setHourlyWeather] = useState(null);
    const [dailyWeather, setDailyWeather] = useState(null);





    const handleChange = (e) => {
        setSearchText(e.target.value);
    }

    const get_weather = () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                setCoords({
                    lat: data.coord.lat,
                    long: data.coord.lon
                })
            })
            .then(setSearchText(""))
    }

    const getLocationWeather = () => {
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
    }


    useEffect(() => {
        const defaultWeather = () => {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=Palestine&appid=${apiKey}`)
                .then(res => res.json())
                .then(data => {
                    setCoords({
                        lat: data.coord.lat,
                        long: data.coord.lon
                    })
                })
        }

        defaultWeather()
    }, [])


    useEffect(() => {
        if (coords) {
            const getCity = () => {
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&units=metric&appid=${apiKey}`)
                    .then(res => res.json())
                    .then(data => {
                        setCity(data.name + ", " + data.sys.country)
                        // console.log(data)
                    })
            }

            const getLocation = () => {
                fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.long}&units=metric&appid=${apiKey}`)
                    .then(res => res.json())
                    .then(data => {
                        setCurrentWeather(data.current)
                        setHourlyWeather(data.hourly)
                        setDailyWeather(data.daily)
                    })
            }

            getLocation();
            getCity();
        }

    }, [coords])

    if (currentWeather) {
        const unix = new Date(currentWeather.dt * 1000);
        const time = unix.toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        });


        return (
            <div className="weather">
                <div className="background">
                    <img src={Palestine} alt="Background" />
                </div>
                <div className="container">
                    <header>
                        <div className="logo">
                            <h1><span>We</span>athers</h1>
                        </div>
                        <div className="locationBar">
                            <h3>Change Location</h3>
                            <div className="searchBar">
                                <input type="text" name="city" id="city" value={searchText}
                                    onChange={handleChange}
                                />
                                <button onClick={(e) => {
                                    e.preventDefault()
                                    get_weather()
                                }}> <SearchIcon /> </button>
                            </div>
                            <div className="locationBtn">
                                <button onClick={() => getLocationWeather()}>
                                    <LocationIcon />
                                    My Location
                                    </button>
                            </div>
                        </div>
                    </header>
                    <main>
                        <CurrentWeather
                            time={time}
                            city={city}
                            currentWeather={currentWeather}
                        />
                        {/* <HourlyWeather />
                        <DailyWeather /> */}
                    </main>
                </div>


            </div>
        )
    }
    else {
        return (
            <>
            </>
        )
    }


}
export default Main;