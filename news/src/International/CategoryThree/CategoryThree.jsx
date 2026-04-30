import React, { useState, useEffect } from 'react';
import './CategoryThree.css';

function CategoryThree() {
    const API_BASE = "http://localhost:8080/api/category-three";
    
    const [layoutData, setLayoutData] = useState({
        feature: [],
        latest_releases: [],
        recent_posts: [],
        hot_categories: []
    });

    const [selectedNews, setSelectedNews] = useState(null);
    const [visibleLatest, setVisibleLatest] = useState(4); 
    const [visibleRecent, setVisibleRecent] = useState(3); 
    const [currentSlide, setCurrentSlide] = useState(0);
    const [likedItems, setLikedItems] = useState(() => {
        return JSON.parse(localStorage.getItem('c3_liked_news') || '[]');
    });

    useEffect(() => {
        const fetchLayout = async () => {
            try {
                const res = await fetch(`${API_BASE}/layout`);
                const data = await res.json();
                
                // DATA REVERSE logic
                setLayoutData({
                    feature: Array.isArray(data.feature) ? [...data.feature].reverse() : (data.feature ? [data.feature] : []),
                    latest_releases: data.latest_releases ? [...data.latest_releases].reverse() : [],
                    recent_posts: data.recent_posts ? [...data.recent_posts].reverse() : [],
                    hot_categories: data.hot_categories || []
                });
            } catch (err) { console.error("API Error:", err); }
        };
        fetchLayout();
    }, []);

    useEffect(() => {
        if (layoutData.feature.length > 1) {
            const timer = setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % layoutData.feature.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [layoutData.feature]);

    const handleOpenNews = (news) => {
        setSelectedNews(news);
        window.scrollTo(0, 0);
    };

    // LIKE / UNLIKE TOGGLE
    const handleLikeToggle = async (e, newsId) => {
        e.stopPropagation();
        const isAlreadyLiked = likedItems.includes(newsId);

        try {
            let updatedItem = null;
            const allItems = [...layoutData.feature, ...layoutData.latest_releases, ...layoutData.recent_posts];
            updatedItem = allItems.find(item => item.id === newsId);

            if (updatedItem) {
                const newLikes = isAlreadyLiked ? (updatedItem.comments || 0) - 1 : (updatedItem.comments || 0) + 1;
                
                const res = await fetch(`${API_BASE}/update/${newsId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...updatedItem, comments: Math.max(0, newLikes) })
                });

                if (res.ok) {
                    let newLikedList = isAlreadyLiked 
                        ? likedItems.filter(id => id !== newsId) 
                        : [...likedItems, newsId];
                    
                    setLikedItems(newLikedList);
                    localStorage.setItem('c3_liked_news', JSON.stringify(newLikedList));
                    
                    const updateList = (list) => list.map(item => item.id === newsId ? {...item, comments: Math.max(0, newLikes)} : item);
                    setLayoutData(prev => ({
                        ...prev,
                        feature: updateList(prev.feature),
                        latest_releases: updateList(prev.latest_releases),
                        recent_posts: updateList(prev.recent_posts)
                    }));
                }
            }
        } catch (err) { console.error("Like Toggle Error:", err); }
    };

    const MusicCard = ({ news, isFeature }) => {
        const isLiked = likedItems.includes(news.id);
        return (
            <div className={`music-card ${isFeature ? 'feature-music-card' : 'regular-music-card'}`}>
                <div className="image-wrapper" onClick={() => handleOpenNews(news)} style={{cursor: 'pointer'}}>
                    <img src={news.imageUrl} alt={news.title} className="music-card-image" loading="lazy" />
                </div>
                <div className="card-content">
                    <span className={`news-category category-${news.category?.toLowerCase().replace(/\s/g, '-')}`}>
                        {news.category}
                    </span>
                    <div className="card-title-link" onClick={() => handleOpenNews(news)} style={{cursor: 'pointer'}}>
                        <h2 title="View Details">{news.title}</h2>
                    </div>
                    {isFeature && <p className="card-summary">{news.summary}</p>}
                    <div className="news-meta">
                        <span className="meta-item"><i className="fas fa-clock"></i> {news.time}</span>
                        <span className="meta-item" 
                              style={{cursor: 'pointer', color: isLiked ? '#ff4757' : 'inherit'}} 
                              onClick={(e) => handleLikeToggle(e, news.id)}>
                            <i className={isLiked ? "fas fa-heart" : "far fa-heart"}></i> {news.comments || 0}
                        </span>
                    </div>
                </div>
            </div>
        );
    };

    if (selectedNews) {
        return (
            <div className="c3-container detail-view">
                <button className="back-btn" onClick={() => setSelectedNews(null)}>
                    <i className="fas fa-arrow-left"></i> Back to Feed
                </button>
                <div className="full-news-content">
                    <span className="news-category">{selectedNews.category}</span>
                    <h1 className="detail-title" style={{cursor:'pointer'}} onClick={() => console.log(selectedNews)}>{selectedNews.title}</h1>
                    <div className="detail-meta">
                        <span><i className="fas fa-calendar-alt"></i> {selectedNews.date}</span>
                        <span><i className="fas fa-clock"></i> {selectedNews.time}</span>
                        <span><i className="fas fa-heart"></i> {selectedNews.comments || 0} Likes</span>
                    </div>
                    <img src={selectedNews.imageUrl} alt={selectedNews.title} className="detail-image" />
                    <div className="detail-body">
                        <p className="summary-text">{selectedNews.summary}</p>
                        <p>{selectedNews.content || "Detailed content for this article will be displayed here."}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="c3-container">
            <header className="c3-main-header">
                <h1>Entertainment News</h1>
                <p className="c3-sub-heading">Global cinema, music charts, and exclusive reviews.</p>
            </header>

            <div className="c3-main-content-layout">
                <div className="c3-left-music-blocks">
                    {/* SPOTLIGHT SLIDER */}
                    <section className="c3-feature-section">
                        <h2 className="c3-section-heading">Spotlight</h2>
                        {layoutData.feature.length > 0 && (
                            <div className="slider-wrapper">
                                <MusicCard news={layoutData.feature[currentSlide]} isFeature={true} />
                                <div className="slider-dots-container">
                                    {layoutData.feature.map((_, idx) => (
                                        <span key={idx} 
                                              className={`s-dot ${idx === currentSlide ? 'active' : ''}`} 
                                              onClick={() => setCurrentSlide(idx)}>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>

                    {/* LATEST NEWS 2x2 WITH SEE MORE/LESS */}
                    <section className="c3-latest-releases-section">
                        <h2 className="c3-section-heading">Latest News</h2>
                        <div className="c3-releases-grid">
                            {layoutData.latest_releases.slice(0, visibleLatest).map(item => (
                                <MusicCard key={item.id} news={item} isFeature={false} />
                            ))}
                        </div>
                        <div className="c3-btn-group">
                            {visibleLatest < layoutData.latest_releases.length && (
                                <button className="c3-load-more-btn" onClick={() => setVisibleLatest(prev => prev + 4)}>See More</button>
                            )}
                            {visibleLatest > 4 && (
                                <button className="c3-load-less-btn" onClick={() => setVisibleLatest(4)}>See Less</button>
                            )}
                        </div>
                    </section>
                </div>

                <aside className="c3-right-sidebar-music">
                    {/* RECENT UPDATES WITH VIEW MORE/LESS */}
                    <div className="c3-sidebar-block">
                        <h3 className="c3-sidebar-heading">Recent Updates</h3>
                        {layoutData.recent_posts.slice(0, visibleRecent).map(p => (
                            <div key={p.id} className="c3-sidebar-recent-post" onClick={() => handleOpenNews(p)} style={{cursor: 'pointer'}}>
                                <img src={p.imageUrl} alt={p.title} className="recent-post-image" />
                                <div className="post-text-content">
                                    <span className="c3-recent-post-title">{p.title}</span>
                                    <span className="c3-post-date">{p.date}</span>
                                </div>
                            </div>
                        ))}
                        <div className="c3-sidebar-btn-group">
                            {visibleRecent < layoutData.recent_posts.length && (
                                <button className="c3-sidebar-more-btn" onClick={() => setVisibleRecent(prev => prev + 3)}>View More</button>
                            )}
                            {visibleRecent > 3 && (
                                <button className="c3-sidebar-less-btn" onClick={() => setVisibleRecent(3)}>View Less</button>
                            )}
                        </div>
                    </div>

                    {/* POPULAR TRENDS (1x3 Vertical Layout) */}
                    <div className="c3-sidebar-block">
                        <h3 className="c3-sidebar-heading">Popular Trends</h3>
                        <div className="c3-hot-categories-vertical-stack">
                            {layoutData.hot_categories.slice(0, 3).map((cat, index) => (
                                <div key={index} className="c3-sidebar-hot-category-item-v">
                                    <div className="category-image-overlay-v">
                                        <img src={cat.imageUrl} className="c3-category-bg-image-v" alt={cat.category} />
                                        <div className="c3-category-info-v">
                                            <span className="c3-category-name-v">{cat.category}</span>
                                            <span className="c3-category-count-v">{cat.title} Posts</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SOCIAL MEDIA */}
                    <div className="c3-sidebar-block">
                        <div className="c3-social-media-follow">
                            <h4 className="c3-social-heading">Follow Us</h4>
                            <div className="c3-social-icons-container">
                                <div className="c3-social-box facebook">
                                    <i className="fa-brands fa-facebook-f"></i>
                                    <div className="social-text"><span className="social-title">Facebook</span></div>
                                </div>
                                <div className="c3-social-box instagram">
                                    <i className="fa-brands fa-instagram"></i>
                                    <div className="social-text"><span className="social-title">Instagram</span></div>
                                </div>
                                <div className="c3-social-box youtube">
                                    <i className="fa-brands fa-youtube"></i>
                                    <div className="social-text"><span className="social-title">YouTube</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default CategoryThree;