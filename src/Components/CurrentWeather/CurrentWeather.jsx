import React from 'react'
import "./CurrentWeather.scss"
import { ReactComponent as Wind } from "../wind.svg"
import { ReactComponent as Visibility } from "../visibility.svg"
import { ReactComponent as Clouds } from "../cloudy.svg"
import { ReactComponent as Arrow } from "../left-arrow.svg"
import { ReactComponent as Humidity } from "../humidity.svg"
import { ReactComponent as Pressure } from "../pressure.svg"


const CurrentWeather = (props) => {
    const temperature = Math.floor(props.currentWeather.temp)
    const feelsLike = Math.floor(props.currentWeather.feels_like)

    const unix = new Date(props.currentWeather.dt * 1000);
    const time = unix.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    });
    const arrowStyle = {
        transform: `rotate(${props.currentWeather.wind_deg}deg)`
    }
    return (
        <div className="current-weather">
            <div className="main-info">
                <div className="time-div">
                    <h4>{time}</h4>
                </div>
                <div className="city-div">
                    <h2>{props.city}</h2>
                </div>
                <div className="temperature-div">
                    <h1>{`${temperature}°C`}</h1>
                    <h6>{props.currentWeather.weather[0].main}</h6>
                    <h6>Feels Like <span>{`${feelsLike}°C`}</span></h6>
                </div>

            </div>

            <div className="weather-details">
                <div className="detail-container">
                    <div className="detail-icon"><Wind /></div>
                    <div className="detail-info">
                        <h4>Wind Speed</h4>
                        <h2>{`${props.currentWeather.wind_speed} km/h`}</h2>
                    </div>
                </div>
                <div className="detail-container">
                    <div className="detail-icon"><Arrow style={arrowStyle} /></div>
                    <div className="detail-info">
                        <h4>Wind Degree</h4>
                        <h2>{`${props.currentWeather.wind_deg} °`}</h2>
                    </div>
                </div>
                <div className="detail-container">
                    <div className="detail-icon"><Clouds /></div>
                    <div className="detail-info">
                        <h4>Clouds</h4>
                        <h2>{`${props.currentWeather.clouds} %`}</h2>
                    </div>
                </div>
                <div className="detail-container">
                    <div className="detail-icon"><Visibility /></div>
                    <div className="detail-info">
                        <h4>Visibility</h4>
                        <h2>{`${props.currentWeather.visibility / 1000} km`}</h2>
                    </div>
                </div>
                <div className="detail-container">
                    <div className="detail-icon"><Humidity /></div>
                    <div className="detail-info">
                        <h4>Humidity</h4>
                        <h2>{`${props.currentWeather.humidity} %`}</h2>
                    </div>
                </div>
                <div className="detail-container">
                    <div className="detail-icon"><Pressure /></div>
                    <div className="detail-info">
                        <h4>Pressure</h4>
                        <h2>{`${props.currentWeather.pressure} hPa`}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentWeather;