import React, { useState, useEffect, useMemo } from 'react';
import './Live.css'; 
import { FaPlayCircle } from 'react-icons/fa'; // Play icon ke liye

const trendingTopics = [
    { title: '#DigitalIndia', count: '1.2M posts' },
    { title: 'Budget 2026 Expectations', count: '500K articles' },
    { title: 'Global Climate Summit', count: '250K views' },
];

const socialMediaLinks = [
    { platform: 'Facebook', icon: '🔵', url: 'https://facebook.com', color: '#1877F2' },
    { platform: 'Twitter', icon: '⚫', url: 'https://twitter.com', color: '#000000' },
    { platform: 'Instagram', icon: '📸', url: 'https://instagram.com', color: '#E4405F' },
    { platform: 'YouTube', icon: '🔴', url: 'https://youtube.com', color: '#FF0000' },
];

const Live = () => {
    const [allContent, setAllContent] = useState([]); 
    const [activeDetail, setActiveDetail] = useState(null);
    const [visibleCount, setVisibleCount] = useState(9);
    const [isPlaying, setIsPlaying] = useState(false);
    const [tickerIndex, setTickerIndex] = useState(0);

    // 1. YouTube Link ko Embed mein badalne ka logic
    const getEmbedUrl = (url) => {
        if (!url) return "";
        let videoId = "";
        if (url.includes("youtube.com/watch?v=")) {
            videoId = url.split("v=")[1].split("&")[0];
        } else if (url.includes("youtu.be/")) {
            videoId = url.split("/").pop();
        } else if (url.includes("youtube.com/embed/")) {
            return url; // Pehle se embed hai
        }
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    };

    useEffect(() => {
        fetch("http://localhost:8080/api/live/popular")
            .then(res => res.json())
            .then(data => {
                const articles = data.liveArticleData || [];
                const sortedArticles = [...articles].reverse();
                setAllContent(sortedArticles);
                if (sortedArticles.length > 0) {
                    setActiveDetail(sortedArticles[0]);
                }
            })
            .catch(err => console.error("Error fetching live articles:", err));
    }, []);

    // 2. Breaking News Ticker logic (Real data se)
    const breakingNews = useMemo(() => {
        const liveItems = allContent.filter(item => item.isBreaking);
        return liveItems.length > 0 ? liveItems : [{ title: "Stay tuned for live updates..." }];
    }, [allContent]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTickerIndex((prev) => (prev + 1) % breakingNews.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [breakingNews]);

    const gridItems = useMemo(() => {
        if (!activeDetail) return allContent;
        return allContent.filter(item => item.id !== activeDetail.id);
    }, [allContent, activeDetail]);

    const handleViewDetails = (item) => {
        setActiveDetail(item);
        setIsPlaying(false); 
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Main Player Media Component
    const MainMediaDisplay = ({ item }) => {
        if (!item) return null;

        if (item.mediaType === 'video' && !isPlaying) {
            return (
                <div className="ns-media-player-wrapper" onClick={() => setIsPlaying(true)} style={{ cursor: 'pointer', position: 'relative' }}>
                    <img src={item.thumbnail} alt={item.title} className="ns-image-viewer" />
                    <div className="ns-main-play-overlay">
                        <FaPlayCircle size={80} color="white" />
                        <p style={{color: 'white', marginTop: '10px', fontWeight: 'bold'}}>CLICK TO WATCH LIVE</p>
                    </div>
                </div>
            );
        }

        if (item.mediaType === 'video' && isPlaying) {
            let embedUrl = getEmbedUrl(item.videoUrl);
            // Autoplay enable karna
            const finalUrl = embedUrl.includes('?') ? `${embedUrl}&autoplay=1` : `${embedUrl}?autoplay=1`;
            
            return (
                <div className="ns-media-player-wrapper">
                    <iframe className="ns-video-player" src={finalUrl} title="Live" allow="autoplay; encrypted-media" allowFullScreen frameBorder="0"></iframe>
                </div>
            );
        }

        return (
            <div className="ns-media-player-wrapper">
                <img src={item.thumbnail} alt="News" className="ns-image-viewer" />
            </div>
        );
    };

    return (
        <div className="ns-live-news-container">
            {/* Real Ticker from Breaking News */}
            <div className="ns-breaking-ticker">
                <span className="ns-ticker-label">BREAKING 🔴</span>
                <div className="ns-ticker-content">
                    {breakingNews[tickerIndex]?.title}
                </div>
            </div>

            <h2 className="ns-live-main-title">Live Multimedia Coverage</h2>

            <div className="ns-live-content-wrapper">
                <div className="ns-main-feed-area">
                    <div className="ns-primary-media-container">
                        {activeDetail ? (
                            <div className="ns-detail-card">
                                <MainMediaDisplay item={activeDetail} />
                                <div className="ns-text-details">
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <span className="ns-detail-source">{activeDetail.category} | {activeDetail.time}</span>
                                        {activeDetail.isBreaking && <span className="ns-live-badge">🔴 LIVE NOW</span>}
                                    </div>
                                    <h3 className="ns-detail-headline">{activeDetail.title}</h3>
                                    <p className="ns-detail-content">{activeDetail.fullContent}</p>
                                </div>
                            </div>
                        ) : <div className="ns-detail-placeholder">Loading Latest Updates...</div>}
                    </div>
                    
                    <h3 className="ns-section-header">Latest Multimedia Reports</h3>
                    <div className="ns-content-grid">
                        {gridItems.slice(0, visibleCount).map((item) => (
                            <div key={item.id} className="ns-content-card" onClick={() => handleViewDetails(item)}>
                                <div className="ns-card-media">
                                    <img src={item.thumbnail} alt={item.title} className="ns-card-thumbnail" />
                                    {item.mediaType === 'video' && (
                                        <div className="ns-play-icon-small">
                                            <FaPlayCircle size={24} />
                                        </div>
                                    )}
                                </div>
                                <div className="ns-card-info">
                                    <span className="ns-card-source">{item.category} | {item.time}</span>
                                    <h4 className="ns-card-headline">{item.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>

                    {visibleCount < gridItems.length && (
                        <button className="ns-load-more-button" onClick={() => setVisibleCount(prev => prev + 6)}>
                            See More Content
                        </button>
                    )}
                </div>

                <div className="ns-trending-sidebar">
                    <div className="ns-sidebar-box">
                        <h3 className="ns-section-header trending">🔥 Trending Topics</h3>
                        <ul className="ns-trending-list">
                            {trendingTopics.map((topic, index) => (
                                <li key={index} className="ns-trending-item">
                                    <span className="ns-rank">{index + 1}.</span>
                                    <span className="ns-topic-title">{topic.title}</span>
                                    <span className="ns-topic-count">{topic.count}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="ns-sidebar-box" style={{ marginTop: '20px' }}>
                        <h3 className="ns-section-header trending">📱 Follow Us</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', padding: '10px' }}>
                            {socialMediaLinks.map((social, idx) => (
                                <a key={idx} href={social.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', background: '#f8f9fa', border: `1px solid ${social.color}`, color: '#333', fontSize: '13px', borderRadius: '4px' }}>
                                    {social.icon} {social.platform}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Live;