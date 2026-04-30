import React, { useState, useEffect } from 'react';
import './CategoryTwo.css'; 

// --- Like Button Component ---
const LikeButton = ({ id, initialLikes }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(initialLikes || 0);

  useEffect(() => {
    const likedItems = JSON.parse(localStorage.getItem("likedCat2") || "[]");
    if (likedItems.includes(id)) setIsLiked(true);
  }, [id]);

  const toggleLike = (e) => {
    e.stopPropagation();
    let likedItems = JSON.parse(localStorage.getItem("likedCat2") || "[]");
    if (isLiked) {
      likedItems = likedItems.filter(item => item !== id);
      setCount(count - 1);
    } else {
      likedItems.push(id);
      setCount(count + 1);
    }
    setIsLiked(!isLiked);
    localStorage.setItem("likedCat2", JSON.stringify(likedItems));
  };

  return (
    <span className="meta-item" onClick={toggleLike} style={{ cursor: 'pointer' }}>
      <i className={`${isLiked ? 'fas' : 'far'} fa-heart`} style={{ color: isLiked ? '#ff4d4d' : '' }}></i> {count}
    </span>
  );
};

// --- Slider Component (1x3 Layout) ---
const SectionSlider = ({ newsList, cardsPerSlide, CardComponent, onOpen }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const groups = [];
  for (let i = 0; i < newsList.length; i += cardsPerSlide) {
    groups.push(newsList.slice(i, i + cardsPerSlide));
  }

  useEffect(() => {
    if (groups.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === groups.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [groups.length]);

  if (newsList.length === 0) return null;

  return (
    <div className="slider-main-container">
      <div className={`grid-layout cards-${cardsPerSlide}`}>
        {groups[currentIndex]?.map((news) => (
          <CardComponent key={news.id} news={news} onOpen={onOpen} />
        ))}
      </div>
      {groups.length > 1 && (
        <div className="slider-dots">
          {groups.map((_, idx) => (
            <span key={idx} className={`dot ${currentIndex === idx ? "active" : ""}`} onClick={() => setCurrentIndex(idx)} />
          ))}
        </div>
      )}
    </div>
  );
};

// --- Card Components ---

const TopBannerCard = ({ news, onOpen }) => (
  <div className="top-banner-card" onClick={() => onOpen(news)}>
    <img src={news.imageUrl} alt="" className="banner-card-image" />
    <div className="banner-card-content">
      <span className="news-category">{news.category || "BREAKING NEWS"}</span>
      <h2 className="banner-title" onClick={() => onOpen(news)}>{news.title}</h2>
      <div className="news-meta">
        <span className="meta-item"><i className="fas fa-calendar-alt"></i> {news.date}</span>
        <span className="meta-item"><i className="fas fa-clock"></i> {news.time}</span>
        <LikeButton id={news.id} initialLikes={news.comments} />
      </div>
    </div>
  </div>
);

const HealthcareCard = ({ news, onOpen }) => (
  <div className="healthcare-card" onClick={() => onOpen(news)}>
    <img src={news.imageUrl} alt="" className="healthcare-card-image" />
    <div className="healthcare-card-content">
      <span className="news-category category-healthcare">{news.category || "HEALTHCARE"}</span>
      <h4 className="healthcare-title" onClick={() => onOpen(news)}>{news.title}</h4>
      <p className="healthcare-short-desc">{news.summary}</p>
      <div className="news-meta">
        <span className="meta-item"><i className="fas fa-calendar-alt"></i> {news.date}</span>
        <LikeButton id={news.id} initialLikes={news.comments} />
      </div>
    </div>
  </div>
);

const HotelFoodCard = ({ news, onOpen }) => (
  <div className="hotelfood-card" onClick={() => onOpen(news)}>
    <div className="hotelfood-img-wrapper">
      <img src={news.imageUrl} alt="" className="hotelfood-image" />
    </div>
    <div className="hotelfood-content">
      <span className="news-category category-food-review">{news.category || "HOSPITALITY"}</span>
      <h3 className="hotelfood-title" onClick={() => onOpen(news)}>{news.title}</h3>
      <div className="news-meta">
        <span className="meta-item"><i className="fas fa-calendar-alt"></i> {news.date}</span>
        <LikeButton id={news.id} initialLikes={news.comments} />
      </div>
    </div>
  </div>
);

// --- Main Component ---
function CategoryTwo() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [newsData, setNewsData] = useState({ banner: [], healthcare: [], hotel_restaurant: [] });
  const [showAllHotels, setShowAllHotels] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/category-two/layout")
      .then(res => res.json())
      .then(data => {
        setNewsData({
          banner: Array.isArray(data.banner) ? [...data.banner].reverse() : [],
          healthcare: Array.isArray(data.healthcare) ? [...data.healthcare].reverse() : [],
          hotel_restaurant: Array.isArray(data.hotel_restaurant) ? [...data.hotel_restaurant].reverse() : []
        });
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Updating Insights...</div>;

  if (selectedNews) {
    return (
      <div className="category-two-container">
        <button className="back-btn" onClick={() => setSelectedNews(null)}>
          <i className="fas fa-arrow-left"></i> Back to Insights
        </button>
        <article className="news-detail-view-cat2">
          <span className="news-category">{selectedNews.category || "Updates"}</span>
          <h1>{selectedNews.title}</h1>
          <div className="news-meta">
            <span><i className="fas fa-calendar-alt"></i> {selectedNews.date} | </span>
            <span><i className="fas fa-clock"></i> {selectedNews.time}</span>
          </div>
          <img src={selectedNews.imageUrl} alt="" className="detail-image-cat2" />
          <div className="detail-content-cat2">
            {/*リード (Lead) showing Summary */}
            <p className="lead">{selectedNews.summary}</p>
            {/* Full Content showing Subtext */}
            <p className="full-text-content">{selectedNews.subtext}</p>
          </div>
        </article>
      </div>
    );
  }

  // Pehle 6 cards (2 rows x 3 columns) dikhao
  const visibleHotels = showAllHotels ? newsData.hotel_restaurant : newsData.hotel_restaurant.slice(0, 6);

  return (
    <div className="category-two-container">
      {/* 1. Banner Slider */}
      <section className="top-banner-section">
        <SectionSlider newsList={newsData.banner} cardsPerSlide={1} CardComponent={TopBannerCard} onOpen={setSelectedNews} />
      </section>

      {/* 2. Healthcare Slider (1x3) */}
      <section className="healthcare-section">
        <h2 className="main-section-heading hospital-heading">Hospital & Wellness Innovation</h2>
        <SectionSlider 
          newsList={newsData.healthcare} 
          cardsPerSlide={3} 
          CardComponent={HealthcareCard} 
          onOpen={setSelectedNews} 
        />
      </section>

      {/* 3. Hotel Section (2x3 Grid + See More) */}
      <section className="hotel-food-section">
        <h2 className="main-section-heading food-heading">Restaurant & Hotel Spotlight</h2>
        <div className="hotelfood-grid">
          {visibleHotels.map(news => (
            <HotelFoodCard key={news.id} news={news} onOpen={setSelectedNews} />
          ))}
        </div>
        
        {newsData.hotel_restaurant.length > 6 && (
          <div className="see-more-container">
            <button className="see-more-btn" onClick={() => setShowAllHotels(!showAllHotels)}>
              {showAllHotels ? "Show Less" : "See More Stories"}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default CategoryTwo;