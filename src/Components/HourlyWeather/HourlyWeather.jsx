import React, { useState, useEffect } from 'react'
import "./HourlyWeather.scss"
import { gsap, TimelineMax } from "gsap";
import { ReactComponent as Wind } from "../wind.svg"
import { ReactComponent as Visibility } from "../visibility.svg"
import { ReactComponent as Humidity } from "../humidity.svg"
import { ReactComponent as Pressure } from "../pressure.svg"
import { ReactComponent as Rain } from "../rain.svg"
import { ReactComponent as Arrow } from "../left-arrow.svg"


const HourlyWeather = (props) => {
    const [hours, setHours] = useState(null);
    const [activeHour, setActiveHour] = useState(null)
    const t1 = new TimelineMax();

    useEffect(() => {
        if (props.hourlyWeather) {
            setHours(props.hourlyWeather.slice(1, 7))
            setActiveHour(props.hourlyWeather[1])
        }
    }, [props.hourlyWeather])

    useEffect(
        () => {
            if (activeHour) {
                t1.fromTo(".hourly-weather .weather-section", {
                    css: {
                        opacity: 0
                    },
                }, {
                    css: {
                        opacity: 1
                    },
                    duration: 0.2
                })
                    .fromTo(".hourly-weather .main-info", {
                        css: {
                            opacity: 0,
                            x: -50
                        }
                    },
                        {
                            css: {
                                opacity: 1,
                                x: 0
                            },
                            duration: 0.4
                        })
                    .fromTo(".hourly-weather .weather-details", {
                        css: {
                            opacity: 0,
                            x: 50
                        }
                    },
                        {
                            css: {
                                opacity: 1,
                                x: 0
                            },
                            duration: 0.4
                        }

                    )
            }
        }, [activeHour]
    )

    const get_time = (dt_time) => {
        const unix = new Date(dt_time * 1000);
        const time = unix.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            month: "long",
            day: "numeric"
        });

        return time;
    }
    const get_hour = (dt_time) => {
        const unix = new Date(dt_time * 1000);
        const time = unix.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric"
        });

        return time;
    }




    if (activeHour) {

        const arrowStyle = {
            transform: `rotate(${activeHour.wind_deg}deg)`
        }
        return (
            <div className="hourly-weather">
                <div className="weather-section">
                    <div className="main-info">
                        <div className="time-div">
                            <h4>{get_time(activeHour.dt)}</h4>
                        </div>
                        <div className="city-div">
                            <h2>{props.city}</h2>
                        </div>
                        <div className="temperature-div">
                            <h1>{`${Math.floor(activeHour.temp)}°C`}</h1>
                            <h6>{activeHour.weather[0].main}</h6>
                            <h6>Feels Like <span>{`${Math.floor(activeHour.feels_like)}°C`}</span></h6>
                        </div>
                    </div>

                    <div className="weather-details">
                        <div className="detail-container">
                            <div className="detail-icon"><Rain /></div>
                            <div className="detail-info">
                                <h4>Chance to Rain</h4>
                                <h2>{`${Math.floor((activeHour.pop) * 100)} %`}</h2>
                            </div>
                        </div>
                        <div className="detail-container">
                            <div className="detail-icon"><Wind /></div>
                            <div className="detail-info">
                                <h4>Wind Speed</h4>
                                <h2>{`${activeHour.wind_speed} km/h`}</h2>
                            </div>
                        </div>
                        <div className="detail-container">
                            <div className="detail-icon"><Arrow style={arrowStyle} /></div>
                            <div className="detail-info">
                                <h4>Wind Degree</h4>
                                <h2>{`${activeHour.wind_deg} °`}</h2>
                            </div>
                        </div>
                        <div className="detail-container">
                            <div className="detail-icon"><Visibility /></div>
                            <div className="detail-info">
                                <h4>Visibility</h4>
                                <h2>{`${activeHour.visibility / 1000} km`}</h2>
                            </div>
                        </div>
                        <div className="detail-container">
                            <div className="detail-icon"><Humidity /></div>
                            <div className="detail-info">
                                <h4>Humidity</h4>
                                <h2>{`${activeHour.humidity} %`}</h2>
                            </div>
                        </div>
                        <div className="detail-container">
                            <div className="detail-icon"><Pressure /></div>
                            <div className="detail-info">
                                <h4>Pressure</h4>
                                <h2>{`${activeHour.pressure} hPa`}</h2>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="hours-section">
                    {
                        hours.map((item, index) => (
                            <div className={activeHour.dt === item.dt ? "hour-container active" : "hour-container"} onClick={() => { setActiveHour(hours[index]) }}>
                                <div className="hour"><h4>{(get_hour(item.dt))}</h4></div>
                                <div className="temperature"><h2>{`${Math.floor(item.temp)} °C`}</h2></div>
                            </div>

                        ))
                    }
                </div>
            </div>
        )

    } else {
        return (
            <></>
        )
    }
}

export default HourlyWeather;