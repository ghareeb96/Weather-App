import React, { useState, useEffect } from 'react'
import "./DailyWeather.scss"
import { gsap, TimelineMax } from "gsap";
import { ReactComponent as Wind } from "../wind.svg"
import { ReactComponent as Clouds } from "../cloudy.svg"
import { ReactComponent as Humidity } from "../humidity.svg"
import { ReactComponent as Pressure } from "../pressure.svg"
import { ReactComponent as Rain } from "../rain.svg"
import { ReactComponent as Arrow } from "../left-arrow.svg"


const DailyWeather = (props) => {
    const [days, setDays] = useState(null);
    const [activeDay, setActiveDay] = useState(null)
    const t1 = new TimelineMax();

    useEffect(() => {
        if (props.dailyWeather) {
            setDays(props.dailyWeather.slice(1, 7))
            setActiveDay(props.dailyWeather[1])
        }
    }, [props.dailyWeather])

    useEffect(
        () => {
            if (activeDay) {
                t1.fromTo(".weather-section", {
                    css: {
                        opacity: 0
                    },
                }, {
                    css: {
                        opacity: 1
                    },
                    duration: 0.2
                })
                    .fromTo(".main-info", {
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
                    .fromTo(".weather-details", {
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
        }, [activeDay]
    )

    const get_time = (dt_time) => {
        const unix = new Date(dt_time * 1000);
        const time = unix.toLocaleString("en-US", {
            month: "long",
            day: "numeric"
        });
        return time;
    }
    const get_day = (dt_time) => {
        const unix = new Date(dt_time * 1000);
        const time = unix.toLocaleString("en-US", {
            weekday: "long"
        });
        return time;
    }

    if (activeDay) {

        const arrowStyle = {
            transform: `rotate(${activeDay.wind_deg}deg)`
        }
        return (
            <div className="daily-weather">
                <div className="weather-section">
                    <div className="main-info">
                        <div className="time-div">
                            <h4>{get_time(activeDay.dt)}</h4>
                        </div>
                        <div className="city-div">
                            <h2>{props.city}</h2>
                        </div>
                        <div className="temperature-div">
                            <h6>{activeDay.weather[0].main}</h6>
                            <h1>{`${Math.floor(activeDay.temp.max)}~${Math.floor(activeDay.temp.min)} °C`}</h1>
                        </div>
                    </div>

                    <div className="weather-details">
                        <div className="detail-container">
                            <div className="detail-icon"><Rain /></div>
                            <div className="detail-info">
                                <h4>Chance to Rain</h4>
                                <h2>{`${(activeDay.pop) * 100} %`}</h2>
                            </div>
                        </div>
                        <div className="detail-container">
                            <div className="detail-icon"><Wind /></div>
                            <div className="detail-info">
                                <h4>Wind Speed</h4>
                                <h2>{`${activeDay.wind_speed} km/h`}</h2>
                            </div>
                        </div>
                        <div className="detail-container">
                            <div className="detail-icon"><Arrow style={arrowStyle} /></div>
                            <div className="detail-info">
                                <h4>Wind Degree</h4>
                                <h2>{`${activeDay.wind_deg} °`}</h2>
                            </div>
                        </div>
                        <div className="detail-container">
                            <div className="detail-icon"><Clouds /></div>
                            <div className="detail-info">
                                <h4>Clouds</h4>
                                <h2>{`${activeDay.clouds} %`}</h2>
                            </div>
                        </div>
                        <div className="detail-container">
                            <div className="detail-icon"><Humidity /></div>
                            <div className="detail-info">
                                <h4>Humidity</h4>
                                <h2>{`${activeDay.humidity} %`}</h2>
                            </div>
                        </div>
                        <div className="detail-container">
                            <div className="detail-icon"><Pressure /></div>
                            <div className="detail-info">
                                <h4>Pressure</h4>
                                <h2>{`${activeDay.pressure} hPa`}</h2>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="days-section">
                    {
                        days.map((item, index) => (
                            <div className={activeDay.dt === item.dt ? "day-container active" : "day-container"} onClick={() => { setActiveDay(days[index]) }}>
                                <div className="day"><h4>{(get_day(item.dt))}</h4></div>
                                <div className="temperature"><h2>{`${Math.floor(item.temp.max)}~${Math.floor(item.temp.min)} °C`}</h2></div>
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

export default DailyWeather;