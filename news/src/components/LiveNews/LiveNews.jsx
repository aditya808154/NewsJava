import React, { useState, useEffect } from "react";
import "./LiveNews.css"; 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaRegClock, FaTimes, FaPlayCircle } from "react-icons/fa";

const LiveHeading = ({ title }) => (
  <div className="live-heading">
    <h2>{title}</h2>
    <hr />
  </div>
);

const LiveNews = () => {
  const [liveArticleData, setLiveArticleData] = useState([]); 
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = "http://localhost:8080/api/live";

  const getEmbedUrl = (url) => {
    if (!url) return "";
    let videoId = "";
    if (url.includes("youtube.com/watch?v=")) {
      videoId = url.split("v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("/").pop();
    } else if (url.includes("youtube.com/embed/")) {
      return url;
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
  };

  useEffect(() => {
    const fetchLiveNews = async () => {
      try {
        const res = await fetch(`${API_BASE}/popular`);
        const data = await res.json();
        const rawData = data.liveArticleData || [];
        setLiveArticleData([...rawData].reverse());
        setLoading(false);
      } catch (err) {
        console.error("Error fetching live news:", err);
        setLoading(false);
      }
    };
    fetchLiveNews();
  }, []);

  // Slider settings updated for 2 cards
  const settings = {
    infinite: liveArticleData.length > 2,
    speed: 500,
    slidesToShow: 2, // Desktop par 2 card dikhane ke liye
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } } // Mobile par 1 card
    ],
  };

  const handleCardClick = (article) => {
    setSelectedArticle(article);
    document.body.style.overflow = 'hidden'; 
  };

  const closeModal = () => {
    setSelectedArticle(null);
    document.body.style.overflow = 'unset'; 
  };

  const ArticleModal = ({ article, onClose }) => {
    if (!article) return null;
    return (
      <div className="live-modal-overlay" onClick={onClose}>
        <div className="live-modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="live-close-btn" onClick={onClose}><FaTimes /></button>
          <div className="live-modal-header"> 
            {article.isBreaking ? (
              <span className="live-tag-modal">🔴 LIVE / BREAKING</span>
            ) : (
              <span className="live-category-tag-modal">{article.category}</span>
            )}
            <h1 className="live-modal-title">{article.title}</h1> 
            <div className="live-modal-meta-info"> 
              <span className="time-span"><FaRegClock /> {article.time}</span>
            </div>
          </div>
          <div className="live-modal-body"> 
            {article.mediaType === 'video' && article.videoUrl ? (
              <div className="live-modal-video-container" style={{marginBottom: '20px'}}>
                <iframe 
                  width="100%" 
                  height="350px" 
                  src={getEmbedUrl(article.videoUrl)} 
                  title="Live Video" 
                  frameBorder="0" 
                  allow="autoplay; encrypted-media" 
                  allowFullScreen
                  style={{borderRadius: '8px'}}
                ></iframe>
              </div>
            ) : (
              <img src={article.thumbnail} alt="" style={{width: '100%', borderRadius: '8px', marginBottom: '20px'}} />
            )}
            <p className="live-modal-full-content" style={{whiteSpace: 'pre-wrap'}}>{article.fullContent}</p> 
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div style={{padding: '50px', textAlign: 'center'}}>Loading Live News...</div>;

  return (
    <section className="live-section"> 
      <LiveHeading title="Live & Breaking News" />
      <div className="live-slider-wrapper"> 
        {liveArticleData.length > 0 ? (
          <Slider {...settings}>
            {liveArticleData.map((item) => (
              <div className="item-padding-fix" key={item.id}> 
                <div className="live-card-box" onClick={() => handleCardClick(item)}> 
                  <div className="live-image-area"> 
                    <img src={item.thumbnail} alt={item.title} className="live-thumb-preview" />
                    {item.mediaType === 'video' && (
                      <div className="video-play-overlay">
                        <FaPlayCircle />
                      </div>
                    )}
                    {item.isBreaking ? (
                      <span className="live-tag-on-card">🔴 LIVE</span>
                    ) : (
                      <span className="live-category-tag">{item.category}</span>
                    )}
                  </div>
                  <div className="live-text-content"> 
                    <h3 className="live-title">{item.title}</h3> 
                    <p className="live-summary">{item.summary}</p>
                    <div className="live-meta-info"> 
                      <span className="time-span"><FaRegClock /> {item.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <p style={{textAlign: 'center', padding: '20px'}}>No live updates at the moment.</p>
        )}
      </div>
      <ArticleModal article={selectedArticle} onClose={closeModal} />
    </section>
  );
};

export default LiveNews;