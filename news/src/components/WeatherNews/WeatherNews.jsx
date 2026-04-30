import React from "react";
import "./WeatherNews.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiThunderstorm,
  WiSnow,
} from "react-icons/wi";

// Heading Component with English title
const WeatherHeading = ({ title }) => (
  <div className="wthr-heading">
    <h2>{title}</h2>
    <hr />
  </div>
);

// Today Weather Data (Updated to English)
const todayWeather = {
  city: "New Delhi",
  temp: "28°C",
  condition: "Partly Cloudy",
  icon: <WiCloud />,
};

// Weekly Forecast Data (Updated)
const nextDays = [
  { day: "TUE", temp: "32°C", icon: <WiDaySunny /> },
  { day: "WED", temp: "25°C", icon: <WiRain /> },
  { day: "THU", temp: "27°C", icon: <WiThunderstorm /> },
  { day: "FRI", temp: "21°C", icon: <WiSnow /> },
  { day: "SAT", temp: "29°C", icon: <WiCloud /> },
  { day: "SUN", temp: "33°C", icon: <WiDaySunny /> },
];

const WeatherNews = () => {
 const settings = {
    
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Default 1 (Refresh fix)
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    mobileFirst: true, // CSS media queries ki tarah kaam karega
    responsive: [
      {
        breakpoint: 768, // Tablet
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 1024, // Desktop
        settings: { slidesToShow: 3 }
      }
    ],
  };
  return (
    <section className="wthr-section">
      <WeatherHeading title="REGIONAL WEATHER FORECAST" /> {/* Updated Title */}

      <div className="wthr-main-container">
        {/* TODAY WEATHER BOX */}
        <div className="wthr-today-box">
          <div className="wthr-icon-big">{todayWeather.icon}</div>

          <div className="wthr-today-details">
            <h1 className="wthr-temp">{todayWeather.temp}</h1>
            <p className="wthr-condition">{todayWeather.condition}</p>
            <p className="wthr-city">{todayWeather.city}</p>
          </div>
        </div>

        {/* SLIDER FOR NEXT DAYS (SLIDER FIX APPLIED HERE) */}
        <div className="wthr-forecast-slider">
          <Slider {...settings}>
            {nextDays.map((item, index) => (
              <div className="wthr-day-card" key={index}>
                <div className="wthr-small-icon">{item.icon}</div>
                <h4 className="wthr-day-name">{item.day}</h4>
                <p className="wthr-day-temp">{item.temp}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default WeatherNews;