import React, { useState, useEffect } from 'react';
import './Main.scss';
import CurrentWeather from "./CurrentWeather/CurrentWeather";
import fullpage from "fullpage.js";
import HourlyWeather from "./HourlyWeather/HourlyWeather";
import DailyWeather from "./DailyWeather/DailyWeather";
import { gsap, TimelineMax } from "gsap";
import { ReactComponent as SearchIcon } from "./search-interface-symbol.svg"
import { ReactComponent as LocationIcon } from "./maps-and-flags.svg"
import Thunderstorm from './Backgrounds/Thunderstorm.jpg';
import Clouds from './Backgrounds/Clouds.jpg';
import Clear from './Backgrounds/Clear.jpg';
import Fog from './Backgrounds/Fog.jpg';
import Rain from './Backgrounds/Rain.jpg';
import Snow from './Backgrounds/Snow.jpg';
import Dust from './Backgrounds/Dust.jpg';

gsap.registerPlugin()
const Main = () => {
    const apiKey = "a5056b2cc7ebb66431740de544b8888f";

    const [city, setCity] = useState("");
    const [searchText, setSearchText] = useState("");
    const [coords, setCoords] = useState(null);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [hourlyWeather, setHourlyWeather] = useState(null);
    const [dailyWeather, setDailyWeather] = useState(null);
    const [background, setBackground] = useState(Clear);


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
        const bg_changer = () => {
            if (currentWeather) {
                switch (currentWeather.weather[0].main) {
                    case "Rain" || "Drizzle":
                        setBackground(Rain)
                        break;
                    case "Thunderstorm" || "Tornado" || "Squall":
                        setBackground(Thunderstorm)
                        break;
                    case "Clouds":
                        setBackground(Clouds)
                        console.log("clouds")
                        break;
                    case "Snow":
                        setBackground(Snow)
                        break;
                    case "Fog" || "Haze" || "Mist" || "Smoke":
                        setBackground(Fog)
                        break;
                    case "Ash" || "Dust" || "Sand":
                        setBackground(Dust)
                        break;
                    default:
                        setBackground(Clear)
                        console.log("clear")
                }

                const t2 = new TimelineMax()

                t2.fromTo(".background", {
                    css: {
                        opacity: 1,
                    }
                }, {
                    css: {
                        opacity: 0
                    },
                    duration: 0.4
                })
                    .fromTo(".background", {
                        css: {
                            opacity: 0,
                        }
                    }, {
                        css: {
                            opacity: 1
                        },
                        duration: 0.4,
                        delay: 0.4
                    })
            }
        }
        if (currentWeather) {
            bg_changer()
        }
    }, [currentWeather])

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

    let t1 = new TimelineMax();

    new fullpage('#fullpage', {
        autoScrolling: true,
        scrollingSpeed: 900,
        navigation: true,
        navigationPosition: 'right',
        // showActiveTooltip: true,
        anchors: ['currentWeather', 'hourlyWeather', 'dailyWeather'],
        navigationTooltips: ['Current Weather', 'Hourly Weather', 'Daily Weather'],
        verticalCentered: false,
        menu: '#menu',
        onLeave: (origin, destination, direction) => {
            gsap.fromTo(destination.item, {
                css: {
                    opacity: 0,
                    y: 40
                }
            },
                {
                    css: {
                        opacity: 1,
                        y: 0
                    },
                    duration: 0.5,
                    delay: 0.6
                })
        },
        afterRender: (origin) => {
            t1
                .fromTo(origin.item.querySelector(".current-weather .main-info"),
                    {
                        css: {
                            opacity: 0,
                            x: -40
                        }
                    }, {

                    css: {
                        opacity: 1,
                        x: 0
                    },
                    duration: 0.5,
                    delay: 0.4
                })
                .fromTo(origin.item.querySelector(".weather-details"),
                    {
                        css: {
                            opacity: 0,
                            x: 40
                        }
                    }, {

                    css: {
                        opacity: 1,
                        x: 0
                    },
                    duration: 0.5,
                }

                )
                .fromTo(origin.item.querySelector(".city-div"),
                    {
                        css: {
                            opacity: 0,
                            y: 20
                        }
                    },
                    {
                        css: {
                            opacity: 1,
                            y: 0
                        },
                        duration: 0.5,
                        delay: 0.2
                        // yoyo: true,
                        // stagger: 0.2
                    }
                )
                .fromTo(origin.item.querySelector(".temperature-div"),
                    {
                        css: {
                            opacity: 0,
                            y: 20
                        }
                    },
                    {
                        css: {
                            opacity: 1,
                            y: 0
                        },
                        duration: 0.5,
                        // delay: 0.2
                    }

                )
                .fromTo(origin.item.querySelectorAll(".detail-container"),
                    {
                        css: {
                            opacity: 0,
                            y: 20
                        }
                    },
                    {
                        css: {
                            opacity: 1,
                            y: 0,

                        },
                        duration: 0.5,
                        // delay: 0.3,
                        stagger: 0.2
                    }
                )
        }



    });

    if (currentWeather) {



        return (
            <div className="weather">
                <div className="background">
                    <img src={background} alt="Background" />
                    <div className="overlay"></div>
                </div>
                <div className="container">
                    <header>
                        <div className="top-header">
                            <div className="logo">
                                <h1><span>We</span>athers</h1>
                            </div>
                            <div className="nav">
                                <ul id="menu" class="nav-links">
                                    <li data-menuanchor="currentWeather" class="active"> <a href="#currentWeather">Current Weather</a> </li>
                                    <li data-menuanchor="hourlyWeather"> <a href="#hourlyWeather">Hourly Weather</a> </li>
                                    <li data-menuanchor="dailyWeather"> <a href="#dailyWeather">Daily Weather</a> </li>
                                </ul>
                            </div>
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


                    <main
                        id="fullpage"
                    >

                        <div className="section">
                            <CurrentWeather
                                city={city}
                                currentWeather={currentWeather}
                            />
                        </div>
                        <div className="section">
                            <HourlyWeather
                                city={city}
                                hourlyWeather={hourlyWeather} />
                        </div>
                        <div className="section">
                            <DailyWeather
                                city={city}
                                dailyWeather={dailyWeather} />
                        </div>


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