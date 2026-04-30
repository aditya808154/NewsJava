import React, { useState, useEffect, useCallback } from 'react';
import './WeatherPage.css';

const WeatherPage = () => {
    const [cityInput, setCityInput] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    const apiKey = "0e66525efbeb05305b1aa06f65ebc16b";

    // 1. Live Clock
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // 2. Main Fetch Function (Supports both City Name and Lat/Lon)
    const fetchWeather = useCallback(async (params) => {
        try {
            setLoading(true);
            setError(null);

            let currentUrl, forecastUrl;

            if (params.type === 'coords') {
                currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${params.lat}&lon=${params.lon}&units=metric&appid=${apiKey}`;
                forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${params.lat}&lon=${params.lon}&units=metric&appid=${apiKey}`;
            } else {
                currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${params.city}&units=metric&appid=${apiKey}`;
                forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${params.city}&units=metric&appid=${apiKey}`;
            }

            const [currentRes, forecastRes] = await Promise.all([
                fetch(currentUrl),
                fetch(forecastUrl)
            ]);

            const currentData = await currentRes.json();
            const forecastData = await forecastRes.json();

            if (currentData.cod === 200 && forecastData.cod === "200") {
                const dailyForecast = [];
                for (let i = 0; i < forecastData.list.length; i += 8) {
                    const dayData = forecastData.list[i];
                    dailyForecast.push({
                        day: new Date(dayData.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
                        condition: dayData.weather[0].main,
                        high: Math.round(dayData.main.temp_max),
                        low: Math.round(dayData.main.temp_min),
                        icon: `https://openweathermap.org/img/wn/${dayData.weather[0].icon}.png`,
                    });
                }

                setWeatherData({
                    city: currentData.name,
                    country: currentData.sys.country,
                    lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    current: {
                        temp: Math.round(currentData.main.temp),
                        feelsLike: Math.round(currentData.main.feels_like),
                        condition: currentData.weather[0].description,
                        mainCond: currentData.weather[0].main,
                        icon: `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@4x.png`,
                        high: Math.round(currentData.main.temp_max),
                        low: Math.round(currentData.main.temp_min),
                        details: [
                            { label: 'Wind Speed', value: `${currentData.wind.speed} km/h` },
                            { label: 'Humidity', value: `${currentData.main.humidity}%` },
                            { label: 'Pressure', value: `${currentData.main.pressure} hPa` },
                            { label: 'Visibility', value: `${currentData.visibility / 1000} km` },
                            { label: 'Sunrise', value: new Date(currentData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
                            { label: 'Sunset', value: new Date(currentData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
                        ],
                    },
                    forecast: dailyForecast
                });
            } else {
                setError("Location not found.");
            }
        } catch (err) {
            setError("Network error occurred.");
        } finally {
            setLoading(false);
        }
    }, [apiKey]);

    // 3. Get User Location on Start
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchWeather({
                        type: 'coords',
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    });
                },
                () => {
                    // If user denies location, load New Delhi as fallback
                    fetchWeather({ type: 'city', city: 'New Delhi' });
                }
            );
        } else {
            fetchWeather({ type: 'city', city: 'New Delhi' });
        }
    }, [fetchWeather]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (cityInput.trim()) {
            fetchWeather({ type: 'city', city: cityInput });
        }
    };

    const getWeatherTip = (cond) => {
        const c = cond?.toLowerCase();
        if (c?.includes('rain')) return "Don't forget your umbrella today! ☔";
        if (c?.includes('cloud')) return "It's a bit gloomy, perfect for coffee! ☕";
        if (c?.includes('clear')) return "Sky is clear, enjoy the sun! ☀️";
        return "Have a wonderful day! 😊";
    };

    return (
        <div className="wp-page-container">
            <div className="wp-search-container">
                <form onSubmit={handleSearch} className="wp-search-form">
                    <input 
                        type="text" 
                        placeholder="Search city..." 
                        value={cityInput}
                        onChange={(e) => setCityInput(e.target.value)}
                        className="wp-search-input"
                    />
                    <button type="submit" className="wp-search-btn">Search</button>
                </form>
            </div>

            {loading && <div className="wp-status">Detecting your location...</div>}
            {error && <div className="wp-status error">{error}</div>}

            {weatherData && !loading && (
                <>
                    <div className="wp-current-section">
                        <h1 className="wp-location">{weatherData.city}, {weatherData.country}</h1>
                        <p className="wp-update-time">Last updated: {weatherData.lastUpdated}</p>
                        
                        <div className="wp-main-details">
                            <div className="wp-temp-display">
                                <img src={weatherData.current.icon} alt="weather icon" className="wp-icon-main" />
                                <span className="wp-temp">{weatherData.current.temp}°C</span>
                            </div>
                            <div className="wp-summary">
                                <h2 className="wp-condition-text">{weatherData.current.condition}</h2>
                                <p className="wp-feels">Feels like {weatherData.current.feelsLike}°C</p>
                                <p className="wp-high-low">High: {weatherData.current.high}°C | Low: {weatherData.current.low}°C</p>
                            </div>
                        </div>
                    </div>

                    <div className="wp-content-wrapper">
                        <div className="wp-left-column">
                            <div className="wp-forecast-container">
                                <h3 className="wp-section-title">5-Day Forecast</h3>
                                <div className="wp-forecast-list">
                                    {weatherData.forecast.map((day, index) => (
                                        <div key={index} className="wp-forecast-day">
                                            <span className="wp-day-name">{index === 0 ? 'Today' : day.day}</span>
                                            <img src={day.icon} alt="icon" className="wp-day-icon-img" />
                                            <span className="wp-day-condition">{day.condition}</span>
                                            <div className="wp-day-temp">
                                                <span className="wp-day-high">{day.high}°</span>
                                                <span className="wp-day-low">{day.low}°</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="wp-detail-grid-container">
                                <h3 className="wp-section-title">Current Conditions</h3>
                                <div className="wp-detail-grid">
                                    {weatherData.current.details.map((item, index) => (
                                        <div key={index} className="wp-detail-item">
                                            <span className="wp-detail-label">{item.label}</span>
                                            <span className="wp-detail-value">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="wp-right-column">
                             <div className="wp-widget">
                                <h3 className="wp-section-title">Live Weather Info</h3>
                                <div className="wp-placeholder-box">
                                    <h4 style={{fontSize: '1.5rem', margin: '10px 0'}}>{currentTime}</h4>
                                    <p>Showing updates for <strong>{weatherData.city}</strong>.</p>
                                    <hr style={{margin: '15px 0', opacity: '0.3'}} />
                                    <p style={{fontStyle: 'italic', color: '#555'}}>
                                        {getWeatherTip(weatherData.current.mainCond)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default WeatherPage;