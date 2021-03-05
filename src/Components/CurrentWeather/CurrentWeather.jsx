import React from 'react'
import style from "./CurrentWeather.scss"
import { ReactComponent as Rain } from "./rain.svg"
import { ReactComponent as Wind } from "./wind.svg"
import { ReactComponent as Visibility } from "./visibility.svg"
import { ReactComponent as Humidity } from "./humidity.svg"
import { ReactComponent as Pressure } from "./pressure.svg"


const CurrentWeather = (props) => {
    const temperature = Math.floor(props.currentWeather.temp)
    const feelsLike = Math.floor(props.currentWeather.feels_like)

    return (
        <div className="current-weather">
            <div className="main-info">
                <div className="time-div">
                    <h4>{props.time}</h4>
                </div>
                <div className="city-div">
                    <h2>{props.city}</h2>
                </div>
                <div className="temperature-div">
                    <h6>{props.currentWeather.weather[0].main}</h6>
                    <div className="temperature">
                        <h1>{`${temperature}°C`}</h1>
                        <h6>Feels Like <span>{`${feelsLike}°C`}</span></h6>
                    </div>
                </div>

            </div>

            <div className="weather-details">
                <div className="detail-container">
                    <div className="detail-icon"><Rain /></div>
                    <div className="detail-info">
                        <h4>Chance to Rain</h4>
                        <h2>40%</h2>
                    </div>
                </div>
                <div className="detail-container">
                    <div className="detail-icon"><Wind /></div>
                    <div className="detail-info"></div>
                </div>
                <div className="detail-container">
                    <div className="detail-icon"><Visibility /></div>
                    <div className="detail-info"></div>
                </div>
                <div className="detail-container">
                    <div className="detail-icon"><Humidity /></div>
                    <div className="detail-info"></div>
                </div>
                <div className="detail-container">
                    <div className="detail-icon"><Pressure /></div>
                    <div className="detail-info"></div>
                </div>
            </div>
        </div>
    )
}

export default CurrentWeather;