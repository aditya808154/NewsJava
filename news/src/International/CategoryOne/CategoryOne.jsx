import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CategoryOne.css";

// --- Reusable Card Component ---
const Card = ({ news, isFeature, onOpen }) => {
  // Like State ko LocalStorage se handle kar rahe hain (Per User)
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(news.comments || 0); // Using comments field as likes for now

  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem("likedNews") || "[]");
    if (savedLikes.includes(news.id)) {
      setIsLiked(true);
    }
  }, [news.id]);

  const handleLike = (e) => {
    e.stopPropagation(); // Card click/open detail ko rokne ke liye
    let savedLikes = JSON.parse(localStorage.getItem("likedNews") || "[]");

    if (isLiked) {
      // Unlike logic
      savedLikes = savedLikes.filter(id => id !== news.id);
      setIsLiked(false);
      setLikeCount(prev => prev - 1);
    } else {
      // Like logic
      savedLikes.push(news.id);
      setIsLiked(true);
      setLikeCount(prev => prev + 1);
    }
    localStorage.setItem("likedNews", JSON.stringify(savedLikes));
    
    // Note: Backend update ke liye aap yahan fetch API call kar sakte hain
  };

  if (!news) return null;

  return (
    <div className={`news-card ${isFeature ? "feature-card" : "regular-card"}`}>
      <div onClick={() => onOpen(news)} style={{ cursor: 'pointer' }}>
        <img src={news.imageUrl} alt={news.title} className="card-image" loading="lazy" />
      </div>
      <div className="card-content">
        <span className={`news-category category-${news.category?.toLowerCase() || 'general'}`}>
          {news.category || 'News'}
        </span>
        <h2 className="clickable-news-title" onClick={() => onOpen(news)} style={{ cursor: 'pointer' }}>
          {news.title}
        </h2>
        <div className="news-meta" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="meta-item"><i className="fas fa-clock"></i> {news.time || news.date}</span>
          
          {/* LIKE BUTTON (Comment ki jagah) */}
          <span className="meta-item" onClick={handleLike} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <i className={`fa-heart ${isLiked ? 'fas' : 'far'}`} style={{ color: isLiked ? '#ff4d4d' : '#888', transition: '0.3s' }}></i> 
            {likeCount}
          </span>
        </div>
        <p className="card-summary">{news.summary}</p>
      </div>
    </div>
  );
};

// --- Slider Component ---
const CustomSlider = ({ newsList, cardsPerSlide, isFeature, onOpen, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const groups = [];
  for (let i = 0; i < newsList.length; i += cardsPerSlide) {
    groups.push(newsList.slice(i, i + cardsPerSlide));
  }

  useEffect(() => {
    if (groups.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === groups.length - 1 ? 0 : prev + 1));
    }, interval);
    return () => clearInterval(timer);
  }, [groups.length, interval]);

  if (newsList.length === 0) return null;

  return (
    <div className="slider-main-container">
      <div className={cardsPerSlide === 2 ? "content-grid two-column-cards" : ""} 
           style={cardsPerSlide === 2 ? { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' } : {}}>
        {groups[currentIndex]?.map((news) => (
          <Card key={news.id} news={news} isFeature={isFeature} onOpen={onOpen} />
        ))}
      </div>
      
      {groups.length > 1 && (
        <div className="slider-dots" style={{ textAlign: 'center', marginTop: '15px' }}>
          {groups.map((_, idx) => (
            <span key={idx} onClick={() => setCurrentIndex(idx)}
              style={{
                display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%',
                background: currentIndex === idx ? (isFeature ? '#ff4d4d' : '#007bff') : '#ccc',
                margin: '0 5px', cursor: 'pointer', transition: '0.3s'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

function CategoryOne() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [newsData, setNewsData] = useState({ feature: [], business: [], it: [], states: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/category-one/layout");
        const data = await response.json();
        setNewsData({
          feature: Array.isArray(data.feature) ? data.feature : (data.feature ? [data.feature] : []),
          business: Array.isArray(data.business) ? data.business : [],
          it: Array.isArray(data.it) ? data.it : [],
          states: data.states || []
        });
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (selectedNews) {
    return (
      <div className="category-one-container">
        <button className="back-btn" onClick={() => setSelectedNews(null)}>← वापस जाएं</button>
        <article className="news-detail-view">
          <header className="detail-header">
            <h1>{selectedNews.title}</h1>
            <div className="news-meta"><span>{selectedNews.date} | {selectedNews.category}</span></div>
          </header>
          <img src={selectedNews.imageUrl} alt="" className="detail-main-image" />
          <div className="detail-content"><p>{selectedNews.summary}</p></div>
        </article>
      </div>
    );
  }

  if (loading) return <div style={{textAlign: 'center', padding: '50px'}}>Loading...</div>;

  return (
    <div className="category-one-container">
      <header className="main-header">
        <h1>Business & Technology Insights</h1>
        <p className="sub-heading">Analysis on IT and Finance trends.</p>
      </header>

      <div className="main-content-layout">
        <div className="left-news-blocks">
          <section className="feature-section" style={{ marginBottom: '50px' }}>
            <h2 className="section-heading primary-heading">🔥 Top Stories</h2>
            <CustomSlider newsList={newsData.feature} cardsPerSlide={1} isFeature={true} onOpen={setSelectedNews} interval={5000} />
          </section>

          <section className="content-grid-section" style={{ marginBottom: '50px' }}>
            <h2 className="section-heading secondary-heading" style={{borderLeft: '4px solid #007bff', paddingLeft: '10px', marginBottom:'20px'}}>💼 Business World</h2>
            <CustomSlider newsList={newsData.business} cardsPerSlide={2} isFeature={false} onOpen={setSelectedNews} interval={6000} />
          </section>

          <section className="content-grid-section">
            <h2 className="section-heading secondary-heading" style={{borderLeft: '4px solid #28a745', paddingLeft: '10px', marginBottom:'20px'}}>💻 IT & Tech</h2>
            <CustomSlider newsList={newsData.it} cardsPerSlide={2} isFeature={false} onOpen={setSelectedNews} interval={7000} />
          </section>
        </div>

        <aside className="right-sidebar-state">
          <div className="sidebar-box" style={{marginBottom: '30px'}}>
            <h3 className="sidebar-state-heading">📍 Browse States</h3>
            <div className="state-links-container">
              {newsData.states.map((s) => (
                <Link key={s.slug} to={`/CategoryOne/${s.slug}`} className="state-link">{s.name}</Link>
              ))}
            </div>
          </div>
          
          <div className="social-sidebar-box" style={{ background: '#f8f9fa', padding: '15px', borderRadius: '10px', border: '1px solid #ddd' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '15px', fontWeight: 'bold' }}>Social Connect</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="#" style={{ background: '#3b5998', color: '#fff', padding: '10px', textDecoration: 'none', borderRadius: '5px' }}><i className="fab fa-facebook-f"></i> Facebook</a>
              <a href="#" style={{ background: '#c13584', color: '#fff', padding: '10px', textDecoration: 'none', borderRadius: '5px' }}><i className="fab fa-instagram"></i> Instagram</a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default CategoryOne;