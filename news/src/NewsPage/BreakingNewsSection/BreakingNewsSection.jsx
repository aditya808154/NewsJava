import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { FaPlay, FaTimes } from 'react-icons/fa';
import './BreakingNewsSection.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// ----------------- Media Modal (Full News View) -----------------
const MediaModal = ({ media, onClose }) => {
    if (!media) return null;

    // YouTube link ko Embed link mein convert karne ka function
    const getYouTubeEmbedUrl = (url) => {
        if (!url) return "";
        let videoId = "";
        if (url.includes("v=")) videoId = url.split("v=")[1]?.split("&")[0];
        else if (url.includes("youtu.be/")) videoId = url.split("youtu.be/")[1]?.split("?")[0];
        else if (url.includes("embed/")) videoId = url.split("embed/")[1];
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    };

    const isYouTube = media.mediaUrl && (media.mediaUrl.includes("youtube.com") || media.mediaUrl.includes("youtu.be"));

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose}><FaTimes /></button>
                
                <div className="modal-media-wrapper">
                    {media.type === 'video' ? (
                        isYouTube ? (
                            <iframe
                                src={getYouTubeEmbedUrl(media.mediaUrl)}
                                title={media.heading}
                                className="modal-media"
                                frameBorder="0"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                style={{ width: '100%', aspectRatio: '16/9', borderRadius: '8px' }}
                            ></iframe>
                        ) : (
                            <video controls autoPlay className="modal-media">
                                <source src={media.mediaUrl} type="video/mp4" />
                            </video>
                        )
                    ) : (
                        <img src={media.imageUrl || media.mediaUrl} alt={media.heading} className="modal-media" />
                    )}
                </div>

                <div className="modal-caption">
                    <h3 className="modal-title">{media.heading}</h3>
                    <div className="modal-subtext" style={{ whiteSpace: 'pre-wrap' }}>{media.caption}</div>
                    <p className="article-meta" style={{ marginTop: '20px', fontWeight: 'bold' }}>
                        {media.time} | {media.region}
                    </p>
                </div>
            </div>
        </div>
    );
};

// ----------------- Main Slider Component -----------------
const BreakingNewsSlider = () => {
    const [newsList, setNewsList] = useState([]); 
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_URL = "http://localhost:8080/api/breaking/all";

    useEffect(() => {
        const fetchBreakingNews = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setNewsList(data.reverse());
            } catch (error) {
                console.error("Error fetching breaking news:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBreakingNews();
    }, []);

    const sliderSettings = {
        dots: true, // Dots on kiye hain taaki navigation dikhe
        infinite: newsList.length > 3,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1, dots: false } },
        ],
    };

    if (loading) return <div style={{textAlign:'center', padding:'50px'}}>Loading Breaking News...</div>;
    if (newsList.length === 0) return null;

    return (
        <div className="breaking-news-slider-container">
            <h2 className="section-title">🚨 Breaking / Important News</h2>
            
            <div className="slider-wrapper">
                <Slider {...sliderSettings}>
                    {newsList.map((article) => (
                        <div key={article.id} className="breaking-card-container">
                            <div className="breaking-card">
                                {/* Image/Video Thumbnail */}
                                <div className="breaking-card__image-wrapper" onClick={() => setSelectedMedia(article)}>
                                    <img className="breaking-card__image" src={article.imageUrl} alt={article.heading} />
                                    {article.type === 'video' && <span className="play-icon pulse"><FaPlay /></span>}
                                </div>

                                {/* Text Content */}
                                <div className="breaking-card__text">
                                    <h4 className="breaking-card__heading" onClick={() => setSelectedMedia(article)}>
                                        {article.heading}
                                    </h4>
                                    
                                    {/* Summary - Only one line through CSS */}
                                    <p className="breaking-card__summary">
                                        {article.caption}
                                    </p>
                                    
                                    <p className="breaking-card__meta">
                                        <span>{article.time}</span> | <span>{article.region}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

            <MediaModal media={selectedMedia} onClose={() => setSelectedMedia(null)} />
        </div>
    );
};

export default BreakingNewsSlider;