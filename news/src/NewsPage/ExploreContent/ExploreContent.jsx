import React, { useState, useEffect } from 'react';
import './ExploreContent.css';
import { FaTimes } from 'react-icons/fa';

// ----------------- MEDIA MODAL -----------------
const MediaModal = ({ media, onClose }) => {
    if (!media) return null;
    const detailedText = media.summary || media.subtext || "विवरण उपलब्ध नहीं है।";

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose}><FaTimes /></button>
                <div className="modal-media-wrapper">
                    <img src={media.imageUrl} alt={media.heading} className="modal-media" />
                </div>
                <div className="modal-caption">
                    <h3>{media.heading}</h3>
                    <div className="modal-detailed-text">{detailedText}</div>
                    {media.time && <p className="article-meta">{media.time} | {media.region}</p>}
                </div>
            </div>
        </div>
    );
};

// ----------------- SECTION COMPONENT -----------------
const SectionContent = ({ title, dataList }) => {
    const [selectedMedia, setSelectedMedia] = useState(null);

    // LOGIC: Left side = 1st item, Right side = 2nd & 3rd item, Bottom = rest
    const mainArticle = dataList[0]; 
    const rightArticles = dataList.slice(1, 3); // 2nd and 3rd items for right side
    const bottomRowArticles = dataList.slice(3); // 4th item onwards

    if (!mainArticle) return <div className="loading-placeholder">No Content Available</div>;

    return (
        <div className="explore-container">
            <header className="explore-header">{title}</header>

            {/* --- TOP SECTION: LEFT (1) + RIGHT (2) --- */}
            <div className="main-featured-layout">
                {/* Left Side: Big Card */}
                <div className="featured-content-box">
                    <div className="clickable" onClick={() => setSelectedMedia(mainArticle)}>
                        <h2 className="main-title">{mainArticle.heading}</h2>
                        <p className="main-desc">{mainArticle.summary?.substring(0, 150)}...</p>
                    </div>
                    <div className="featured-visual-mix clickable" onClick={() => setSelectedMedia(mainArticle)}>
                        <img src={mainArticle.imageUrl} alt="" className="featured-hero-img" />
                        <div className="hero-meta-overlay">
                            <span>{mainArticle.time} | {mainArticle.region}</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Two Stacked Cards */}
                <div className="side-featured-stack">
                    {rightArticles.map((article, idx) => (
                        <div key={article.id || idx} className="side-featured-box clickable" onClick={() => setSelectedMedia(article)}>
                            <img src={article.imageUrl} alt="" className="side-img" />
                            <div className="side-content">
                                <h3>{article.heading}</h3>
                                <p className="side-meta">{article.time} | {article.region}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- BOTTOM SECTION: All Other Cards --- */}
            <div className="bottom-articles-grid">
                {bottomRowArticles.map((article, i) => (
                    <div key={article.id || i} className="bottom-article-card">
                        <div className="image-wrapper clickable" onClick={() => setSelectedMedia(article)}>
                            <img src={article.imageUrl} alt={article.heading} />
                        </div>
                        <div className="article-text-wrapper">
                             <div className="clickable" onClick={() => setSelectedMedia(article)}>
                                <h4>{article.heading}</h4>
                                <p className="mini-meta">{article.time} • {article.region}</p>
                             </div>
                        </div>
                    </div>
                ))}
            </div>

            <MediaModal media={selectedMedia} onClose={() => setSelectedMedia(null)} />
        </div>
    );
};

// ----------------- MAIN WRAPPER -----------------
const AllSections = () => {
    const [exploreData, setExploreData] = useState([]);
    const [loading, setLoading] = useState(true);
    const API_URL = "http://localhost:8080/api/explore/all";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error("API Error");
                const result = await response.json();
                setExploreData(result.reverse());
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="sections-wrapper">
            {loading ? (
                <p style={{textAlign: 'center', padding: '50px'}}>Loading Content...</p>
            ) : exploreData.length > 0 ? (
                <SectionContent title="Latest News" dataList={exploreData} />
            ) : (
                <p style={{textAlign: 'center', padding: '50px'}}>No data found.</p>
            )}
        </div>
    );
};

export default AllSections;