import React, { useState, useEffect } from 'react';
import './CategoryDefault.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const categoryClass = (cat) => {
  if (!cat) return 'general';
  return cat.toString().toLowerCase().replace(/\s+/g, '-');
};

const getYTId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const LargeNewsCard = ({ news, onOpen }) => (
  <article className="large-news-card">
    <div className="large-card-image-link" onClick={() => onOpen(news)}>
      <img
        src={news.imageUrl || `https://img.youtube.com/vi/${getYTId(news.mediaUrl)}/maxresdefault.jpg`}
        alt={news.title}
        className="large-card-image"
        style={{ cursor: 'pointer' }}
      />
    </div>
    <div className="large-card-content">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <span className={`news-category category-${categoryClass(news.category)}`}>
          {news.category || 'General'}
        </span>
        {/* Likes aur Comments dikhega */}
        <span style={{fontSize:'13px', color:'#666'}}>
          ❤️ {news.likes || 0} | 💬 {news.comments || 0}
        </span>
      </div>
      <h2
        className="clickable-title"
        onClick={() => onOpen(news)}
        style={{ cursor: 'pointer', margin: '8px 0' }}
      >
        {news.title}
      </h2>
      <div className="news-meta">
        <span className="meta-item">
          <i className="fas fa-clock" /> {news.date || news.time || "Recently"}
        </span>
      </div>
      {news.summary && <p className="large-card-summary-one-line">{news.summary}</p>}
    </div>
  </article>
);

function CategoryDefault() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [newsData, setNewsData] = useState({
    feature: [], sidebar: [], sport: [], manoranjan: [], game: []
  });
  const [loading, setLoading] = useState(true);

  // Jab bhi selectedNews change ho, page ko top par le jaye
  useEffect(() => {
    if (selectedNews) {
      window.scrollTo(0, 0);
    }
  }, [selectedNews]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/category-default/all");
        const data = await res.json();
        const rev = (arr) => (Array.isArray(arr) ? [...arr].reverse() : (arr ? [arr] : []));
        setNewsData({
          feature: rev(data.feature),
          sidebar: rev(data.sidebar),
          sport: rev(data.sport),
          manoranjan: rev(data.manoranjan),
          game: rev(data.game)
        });
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div style={{textAlign:'center', padding:'50px'}}>खबरें लोड हो रही हैं...</div>;

  // Detail View
  if (selectedNews) {
    const ytId = getYTId(selectedNews.mediaUrl);
    return (
      <section className="category-default-container">
        <button onClick={() => setSelectedNews(null)} className="back-to-home-btn" style={{ marginBottom: '20px', padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #ccc', background:'#fff' }}>
          ← वापस जाएं
        </button>
        <div className="full-detail-wrapper" style={{ background: '#fff', padding: '20px', borderRadius: '10px' }}>
          
          <div style={{display:'flex', gap:'10px', marginBottom:'10px'}}>
             <span className={`news-category category-${categoryClass(selectedNews.category)}`}>{selectedNews.category}</span>
          </div>

          <h1 style={{ fontSize: '2.2rem', marginBottom: '10px' }}>{selectedNews.title}</h1>
          
          <div style={{marginBottom:'20px', color:'#666', borderBottom:'1px solid #eee', paddingBottom:'10px'}}>
             <span>📅 {selectedNews.date}</span> | <span>❤️ {selectedNews.likes || 0} Likes</span> | <span>💬 {selectedNews.comments || 0} Comments</span>
          </div>
          
          <div className="media-container" style={{ marginBottom: '20px' }}>
            {selectedNews.type === "video" && ytId ? (
              <iframe 
                width="100%" 
                height="450" 
                src={`https://www.youtube.com/embed/${ytId}`} 
                frameBorder="0" 
                allowFullScreen 
                style={{borderRadius: '10px'}}
                title="video"
              ></iframe>
            ) : (
              <img src={selectedNews.imageUrl} style={{ width: '100%', borderRadius: '10px' }} alt="" />
            )}
          </div>

          <div className="content-area">
            <h3 style={{borderLeft:'4px solid red', paddingLeft:'10px', marginBottom:'15px'}}>Summary & Details</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#333', whiteSpace: 'pre-line' }}>
              {selectedNews.summary || 'विस्तृत जानकारी जल्द ही अपडेट की जाएगी...'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="category-default-container">
      <header><h1>The Daily News Network</h1></header>

      <h2 className="main-section-heading breaking-heading">🚨 Breaking News & Updates</h2>
      <div className="top-section-layout">
        <div className="feature-block">
          <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 3000 }} pagination={{ clickable: true }}>
            {newsData.feature.map(n => (
              <SwiperSlide key={n.id}>
                <LargeNewsCard news={n} onOpen={setSelectedNews} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <aside className="right-sidebar">
          <h3 className="sidebar-heading video-heading">📺 Featured Video</h3>
          
          {newsData.sidebar.length > 0 && (
            <div className="sidebar-featured-item" onClick={() => setSelectedNews(newsData.sidebar[0])} style={{ cursor: 'pointer' }}>
              <div className="sidebar-video-card">
                {newsData.sidebar[0].type === "video" && getYTId(newsData.sidebar[0].mediaUrl) ? (
                  <div className="video-thumbnail-wrapper" style={{position:'relative'}}>
                    <img src={`https://img.youtube.com/vi/${getYTId(newsData.sidebar[0].mediaUrl)}/hqdefault.jpg`} className="actual-video-player" alt="" style={{width:'100%', borderRadius:'8px'}} />
                    <div className="play-icon-overlay" style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)', fontSize:'40px', color:'#fff', opacity:'0.8'}}><i className="fas fa-play-circle"></i></div>
                  </div>
                ) : (
                  <img src={newsData.sidebar[0].imageUrl} className="actual-video-player" style={{width:'100%', borderRadius:'8px', objectFit:'cover'}} alt="" />
                )}
              </div>
              <div className="sidebar-news-title featured-click-title" style={{ padding: '10px', fontWeight:'bold' }}>
                {newsData.sidebar[0].title}
                <div style={{fontSize:'12px', fontWeight:'normal', color:'#666'}}>❤️ {newsData.sidebar[0].likes || 0} Likes</div>
              </div>
            </div>
          )}

          <h3 className="sidebar-heading latest-news-heading">⚡ Latest News</h3>
          <div className="latest-news-list">
            {newsData.sidebar.slice(1, 7).map((item) => (
              <div key={item.id} className="sidebar-news-item" onClick={() => setSelectedNews(item)} style={{ cursor: 'pointer' }}>
                <span className={`news-category category-${categoryClass(item.category)}`} style={{fontSize:'10px', padding:'2px 8px'}}>{item.category || "News"}</span>
                <div className="sidebar-news-title" style={{fontSize:'14px'}}>{item.title}</div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <section className="news-block">
        <h2 className="main-section-heading sport-heading">🏏 Sports Arena</h2>
        <Swiper modules={[Autoplay, Pagination]} pagination={{ clickable: true }} autoplay={{ delay: 4000 }} spaceBetween={20} breakpoints={{ 0: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}>
          {newsData.sport.map((n) => (
            <SwiperSlide key={n.id}><LargeNewsCard news={n} onOpen={setSelectedNews} /></SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="news-block">
        <h2 className="main-section-heading entertainment-heading">🎬 Manoranjan World</h2>
        <Swiper modules={[Autoplay, Pagination]} pagination={{ clickable: true }} autoplay={{ delay: 4500 }} spaceBetween={20} breakpoints={{ 0: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}>
          {newsData.manoranjan.map((n) => (
            <SwiperSlide key={n.id}><LargeNewsCard news={n} onOpen={setSelectedNews} /></SwiperSlide>
          ))}
        </Swiper>
      </section>

      <h2 className="main-section-heading game-heading">🎮 Gaming & Tech Updates</h2>
      <Swiper modules={[Autoplay, Pagination]}  autoplay={{ delay: 5000 }} spaceBetween={15} breakpoints={{ 0: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}>
        {newsData.game.map((n) => (
          <SwiperSlide key={n.id}>
            <div className="game-list-item" onClick={() => setSelectedNews(n)} style={{ cursor: 'pointer', background: '#fff', padding: '15px', borderRadius: '10px', minHeight:'100px', display:'flex', flexDirection:'column', justifyContent:'center', border:'1px solid #eee' }}>
              <span className="game-list-title" style={{fontWeight:'bold', marginBottom:'5px'}}>{n.title}</span>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <span className="game-list-date" style={{fontSize:'12px', color:'#888'}}><i className="fas fa-calendar-alt"></i> {n.date}</span>
                <span style={{fontSize:'12px'}}>❤️ {n.likes || 0}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default CategoryDefault;