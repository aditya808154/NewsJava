import React, { useState, useEffect } from 'react';
import './CategoryFour.css'; 

const NewsCard = ({ news, isFeature, isGrid, onOpen, onLike }) => {
    if (!news) return null;
    let cardClass = isFeature ? 'c4-feature-card c4-feature-post-layout' : isGrid ? 'c4-grid-card' : 'c4-regular-card';

    const getCategoryColor = (category) => {
        const cat = category?.toLowerCase().replace(/\s/g, '-') || '';
        const colors = {
            'विधानसभा-चुनाव': '#f59e0b',
            'लखनऊ': '#10b981',
            'tech': '#6366f1',
            'entertainment': '#7c3aed'
        };
        return colors[cat] || '#7c3aed'; 
    };

    return (
        <div className={`c4-news-card ${cardClass}`} style={{ position: 'relative' }}>
            <div onClick={() => onOpen(news)} style={{ cursor: 'pointer' }}>
                <img 
                    src={news.imageUrl} 
                    alt={news.title} 
                    className={`c4-card-image ${isFeature ? 'c4-feature-image' : isGrid ? 'c4-grid-image' : ''}`}
                />
            </div>

            <div className="c4-card-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span className="c4-grid-category" style={{ backgroundColor: getCategoryColor(news.category), width: 'fit-content' }}>
                            {news.category}
                        </span>
                        <span style={{ fontSize: '0.8rem', color: '#666' }}>
                            <i className="far fa-calendar-alt"></i> {news.date || "Today"}
                        </span>
                    </div>

                    <button 
                        className="c4-like-btn" 
                        onClick={(e) => { e.stopPropagation(); onLike(news.id); }}
                        style={{ 
                            background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem',
                            color: news.userLiked ? '#e11d48' : '#666', transition: '0.3s'
                        }}
                    >
                        {news.userLiked ? '❤️' : '🤍'} <span style={{ fontSize: '0.9rem', color: '#666' }}>{news.likes || 0}</span>
                    </button>
                </div>

                <div className="c4-card-title-link" onClick={() => onOpen(news)} style={{ cursor: 'pointer', marginTop: '10px' }}>
                    <h3 style={{ margin: 0 }}>{news.title}</h3>
                </div>

                {(isFeature || isGrid) && <p className="c4-card-summary">{news.summary}</p>}
            </div>
        </div>
    );
};

function CategoryFour() {
    const API_BASE = "http://localhost:8080/api/category-four";
    const [featurePosts, setFeaturePosts] = useState([]);
    const [gridPosts, setGridPosts] = useState([]);
    const [selectedNews, setSelectedNews] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [sliderIndex, setSliderIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    const postsPerPage = 3; 

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await fetch(`${API_BASE}/layout`);
                const data = await res.json();
                const initData = (arr) => (arr || []).map(item => ({...item, userLiked: false})).sort((a, b) => b.id - a.id);
                setFeaturePosts(initData(data.feature));
                setGridPosts(initData(data.grid_posts));
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    const handleNextSlide = () => setSliderIndex((prev) => (prev >= featurePosts.length - 1 ? 0 : prev + 1));
    const handlePrevSlide = () => setSliderIndex((prev) => (prev <= 0 ? featurePosts.length - 1 : prev - 1));

    const handleLike = (id) => {
        const toggle = (list) => list.map(p => 
            p.id === id ? {...p, userLiked: !p.userLiked, likes: p.userLiked ? (p.likes || 1) - 1 : (p.likes || 0) + 1} : p
        );
        setFeaturePosts(toggle(featurePosts));
        setGridPosts(toggle(gridPosts));
    };

    const totalPages = Math.ceil(gridPosts.length / postsPerPage);
    const currentGridBatch = gridPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

    const getPageNumbers = () => {
        let pages = [];
        for (let i = 1; i <= totalPages; i++) pages.push(i);
        return pages;
    };

    if (loading) return <div style={{textAlign:'center', padding:'50px'}}>Loading...</div>;

    if (selectedNews) {
        return (
            <div className="c4-container c4-detail-view">
                <button className="c4-back-btn" onClick={() => setSelectedNews(null)}>← वापस जाएं</button>
                <article className="c4-full-content">
                    <header className="c4-detail-header">
                        <span className="c4-grid-category" style={{background: '#7c3aed', padding: '5px 15px', color:'white', borderRadius:'4px'}}>{selectedNews.category}</span>
                        <h1 className="c4-detail-title">{selectedNews.title}</h1>
                    </header>
                    <img src={selectedNews.imageUrl} alt="" className="c4-detail-main-image" />
                    <div className="c4-detail-body">
                        <p className="c4-large-text">{selectedNews.summary}</p>
                        <p>{selectedNews.content || "विवरण जल्द आएगा..."}</p>
                    </div>
                </article>
            </div>
        );
    }

    return (
        <div className="c4-container">
            <header className="c4-main-header">
                <span className="c4-category-tag">मनोरंजन</span>
            </header>

            <div className="c4-main-content-layout">
                {featurePosts.length > 0 && (
                    <section className="c4-feature-section" style={{ position: 'relative', marginBottom: '40px' }}>
                        <NewsCard news={featurePosts[sliderIndex]} isFeature={true} onOpen={setSelectedNews} onLike={handleLike} />
                        <button onClick={handlePrevSlide} style={arrowStyle(true)}>❮</button>
                        <button onClick={handleNextSlide} style={arrowStyle(false)}>❯</button>
                    </section>
                )}

                <section className="c4-latest-releases-section">
                    <h2 className="c4-section-heading">Latest Updates</h2>
                    <div className="c4-releases-grid">
                        {currentGridBatch.map(item => (
                            <NewsCard key={item.id} news={item} isFeature={false} isGrid={true} onOpen={setSelectedNews} onLike={handleLike} />
                        ))}
                    </div>
                    
                    {totalPages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '30px', paddingBottom: '30px' }}>
                            <button 
                                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} 
                                disabled={currentPage === 1}
                                style={pageBtnStyle(currentPage === 1)}
                            >
                                Prev
                            </button>
                            
                            {getPageNumbers().map(n => (
                                <button key={n} onClick={() => setCurrentPage(n)} style={numBtnStyle(currentPage === n)}>
                                    {n}
                                </button>
                            ))}
                            
                            <button 
                                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} 
                                disabled={currentPage === totalPages}
                                style={pageBtnStyle(currentPage === totalPages)}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

const arrowStyle = (isLeft) => ({
    position: 'absolute', [isLeft ? 'left' : 'right']: '10px', top: '50%', transform: 'translateY(-50%)',
    zIndex: 10, background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', width: '40px', height: '40px',
    borderRadius: '50%', cursor: 'pointer', fontSize: '20px'
});

const pageBtnStyle = (disabled) => ({
    padding: '8px 20px', background: '#7c3aed', color: 'white', border: 'none', borderRadius: '4px',
    cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1
});

const numBtnStyle = (active) => ({
    padding: '8px 12px', cursor: 'pointer', backgroundColor: active ? '#7c3aed' : 'white',
    color: active ? 'white' : '#7c3aed', border: '1px solid #7c3aed', borderRadius: '4px'
});

export default CategoryFour;