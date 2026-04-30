import React, { useState, useEffect } from "react";
import "./hero.css";

function NewsGrid() {
  const [index, setIndex] = useState(0);
  const [activePost, setActivePost] = useState(null);
  const [newsList, setNewsList] = useState([]); // API से डेटा यहाँ आएगा

  // --- API Fetch Function ---
  const fetchSliderNews = async () => {
    try {
      // आपके Controller के @GetMapping("/popular") का उपयोग
      const response = await fetch("http://localhost:8080/api/homenews/popular");
      const data = await response.json();
      
      if (data.homeNewsData) {
        // .reverse() करने से Latest news सबसे पहले आएगी
        setNewsList(data.homeNewsData.reverse());
      }
    } catch (error) {
      console.error("Error loading slider news:", error);
    }
  };

  useEffect(() => {
    fetchSliderNews();
  }, []);

  // --- Auto Slider Timer ---
  useEffect(() => {
    if (!activePost && newsList.length > 0) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % newsList.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [activePost, newsList.length]);

  // --- Full Detail View ---
  if (activePost) {
    return (
      <div className="detail-page-container">
        <div className="detail-wrapper">
          <button className="back-btn" onClick={() => setActivePost(null)}>
            ← Back to Home
          </button>
          <div className="detail-main-content">
            <img src={activePost.img} alt="" className="detail-hero-img" />
            <div className="detail-text-box">
              <span className="detail-tag">{activePost.cat}</span>
              <h1 className="detail-heading">{activePost.title}</h1>
              <p className="detail-meta-info">{activePost.time}</p>
              <div className="detail-divider"></div>
              <p className="detail-body-text">{activePost.summary}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Slider View ---
  return (
    <div className="full-slider-container">
      <div className="hero-main-slider">
        {newsList.length > 0 ? (
          newsList.map((slide, i) => (
            <div 
              key={slide.id || i} 
              className={`hero-slide ${i === index ? "active" : ""}`}
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              <div className="hero-overlay">
                <div className="hero-content">
                  <span className="hero-cat-tag">{slide.cat}</span>
                  <h2 className="hero-main-title" onClick={() => setActivePost(slide)}>
                    {slide.title}
                  </h2>
                  <div className="hero-sub-meta">
                    <span>{slide.time}</span>
                    <span className="read-more-hint" onClick={() => setActivePost(slide)}>
                      Read Full Story →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="loading-slider">Loading News...</div>
        )}
        
        {/* Navigation Dots */}
        <div className="hero-dots">
          {newsList.map((_, i) => (
            <span 
              key={i} 
              className={`hero-dot ${i === index ? "active" : ""}`} 
              onClick={() => setIndex(i)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsGrid;