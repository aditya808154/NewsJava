import React, { useState, useEffect } from 'react'; 
import './StateSection.css'; 

// Manual States
const MOCK_STATES = [
    { code: 'ALL', name: 'All India' },
    { code: 'UP', name: 'Uttar Pradesh' },
    { code: 'BR', name: 'Bihar' },
    { code: 'MP', name: 'Madhya Pradesh' },
    { code: 'RJ', name: 'Rajasthan' }
];

const truncateText = (text, limit) => {
    if (!text) return "";
    return text.length > limit ? text.substring(0, limit) + "..." : text;
};

// --- Sidebar Components ---
const SidebarRecentPost = ({ posts, onOpenNews }) => {
    const [showAll, setShowAll] = useState(false);
    const displayPosts = showAll ? posts : posts?.slice(0, 2);

    return (
        <div className="ss-sidebar-block ss-recent-posts">
            <h3 className="ss-sidebar-heading">Recent Posts</h3> 
            {displayPosts?.map((post) => (
                <div key={post.id} className="ss-recent-post-item" onClick={() => onOpenNews(post)} style={{cursor:'pointer'}}>
                    <img src={post.imageUrl || "https://via.placeholder.com/80x50"} alt={post.title} className="ss-recent-post-image" />
                    <div className="ss-post-info">
                        <span className="ss-post-category">{post.category}</span>
                        <p className="ss-post-title">{post.title}</p>
                        <span className="ss-post-date" style={{fontSize: '0.7em', color: '#888'}}>{post.date || post.time}</span>
                    </div>
                </div>
            ))}
            {posts?.length > 2 && (
                <button className="ss-see-more-btn" onClick={() => setShowAll(!showAll)}>
                    {showAll ? "Show Less" : "See More"}
                </button>
            )}
        </div>
    );
};

const SidebarHotCategory = ({ categories }) => {
    const [showAll, setShowAll] = useState(false);
    const reversedCats = [...(categories || [])].reverse();
    const displayCats = showAll ? reversedCats : reversedCats.slice(0, 2);

    return (
        <div className="ss-sidebar-block ss-hot-categories">
            <h3 className="ss-sidebar-heading">Hot Categories</h3> 
            <ul className="ss-category-list">
                {displayCats.length > 0 ? (
                    displayCats.map((cat, index) => (
                        <li key={index} className="ss-category-item">
                            <span style={{cursor:'pointer', display:'flex', justifyContent:'space-between', width:'100%'}}>
                                {cat.category || cat.title} <span className="ss-category-count">({cat.count || 0})</span>
                            </span>
                        </li>
                    ))
                ) : (
                    <li className="ss-category-item">No Hot Categories</li>
                )}
            </ul>
            {reversedCats.length > 2 && (
                <button className="ss-see-more-btn" onClick={() => setShowAll(!showAll)}>
                    {showAll ? "Show Less" : "See More"}
                </button>
            )}
        </div>
    );
};

const SocialMediaIcons = ({ links }) => {
    const defaultLinks = [
        { name: "Facebook", icon: "fab fa-facebook-f", color: "#3b5998", followers: "500K", url: "#" },
        { name: "Twitter", icon: "fab fa-twitter", color: "#1da1f2", followers: "200K", url: "#" }
    ];
    const displayLinks = links && links.length > 0 ? links : defaultLinks;

    return (
        <div className="ss-sidebar-block ss-social-media">
            <h3 className="ss-sidebar-heading">Follow Us</h3> 
            <div className="ss-social-grid">
                {displayLinks.map((link, index) => (
                    <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="ss-social-item" style={{ backgroundColor: link.color }}>
                        <i className={link.icon}></i>
                        <div className="ss-social-details">
                            <span className="ss-social-count">{link.followers}</span>
                            <span className="ss-social-name">{link.name}</span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

const StateSelector = ({ states, onSelectState, selectedState }) => (
    <div className="ss-sidebar-block ss-state-selector">
        <h3 className="ss-sidebar-heading">Select State</h3>
        <select className="ss-state-dropdown" onChange={(e) => onSelectState(e.target.value)} value={selectedState}>
            {states.map((state) => (
                <option key={state.code} value={state.code}>{state.name}</option>
            ))}
        </select>
    </div>
);

const StateNewsCard = ({ news, isFeature, isGrid, onOpenNews }) => {
    const [liked, setLiked] = useState(false);
    // Mocking an initial like count, you can change this to news.likes if your API provides it
    const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100) + 1); 

    if (!news) return null;
    let cardClass = isFeature ? 'ss-feature-card ss-feature-post-layout' : 'ss-grid-card';
    
    const handleLike = (e) => {
        e.stopPropagation(); 
        if (liked) {
            setLikeCount(prev => prev - 1);
        } else {
            setLikeCount(prev => prev + 1);
        }
        setLiked(!liked);
    };

    return (
        <div className={`ss-news-card ${cardClass}`} onClick={() => onOpenNews(news)} style={{cursor:'pointer', position:'relative'}}>
            <img src={news.imageUrl} alt={news.title} className={`ss-card-image ${isFeature ? 'ss-feature-image' : 'ss-grid-image'}`} />
            
            <div className="ss-card-content">
                {isGrid && (
                    <div className="ss-grid-meta-overlay">
                        <span className="ss-grid-category" style={{ background: '#000', color: '#fff' }}>{news.category}</span>
                        {/* <span className="ss-grid-time">{news.date || news.time}</span> */}
                    </div>
                )}
                
                {/* Meta Section: Date + Like Button combined */}
                <div className="ss-feature-meta-top" style={{marginTop: isGrid ? '15px' : '0', display: 'flex', alignItems: 'center', gap: '15px'}}>
                    <span className="ss-meta-item">
                        <i className="far fa-calendar-alt"></i> {news.date || news.time || "Today"}
                    </span>
                    
                    {/* Like Section beside Date */}
                    <span className="ss-meta-item" onClick={handleLike} style={{cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px'}}>
                        <i className={liked ? "fas fa-heart" : "far fa-heart"} style={{color: liked ? 'red' : '#757575'}}></i>
                        <span style={{fontWeight: '600'}}>{likeCount}</span>
                    </span>

                    {news.author && !isGrid && <span className="ss-meta-item">• {news.author}</span>}
                </div>

                <div className="ss-card-title-link">
                    <h3>{news.title}</h3>
                </div>
                <p className="ss-card-summary">{truncateText(news.summary, 120)}</p>
            </div>
        </div>
    );
};

function StateSection() {
    const [selectedNews, setSelectedNews] = useState(null);
    const [selectedStateCode, setSelectedStateCode] = useState('ALL');
    const [currentPage, setCurrentPage] = useState(1);
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const postsPerPage = 4; 

    const [data, setData] = useState({ 
        feature_posts: [], 
        grid_posts: [], 
        recent_posts: [], 
        hot_categories: [] 
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:8080/api/state-news/layout")
            .then(res => res.json())
            .then(json => {
                setData({
                    feature_posts: (json.stateNewsData?.feature || []).reverse(), 
                    grid_posts: (json.stateNewsData?.grid_posts || []).reverse(), 
                    recent_posts: (json.sidebarData?.recent_posts || []).reverse(),
                    hot_categories: json.sidebarData?.hot_categories || []
                });
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching news:", err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (data.feature_posts.length > 1) {
            const timer = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % data.feature_posts.length);
            }, 5000); 
            return () => clearInterval(timer);
        }
    }, [data.feature_posts]);

    const openNews = (news) => {
        setSelectedNews(news);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const closeNews = () => {
        setSelectedNews(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data.grid_posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(data.grid_posts.length / postsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

    if (loading) return <div style={{padding: '50px', textAlign: 'center'}}>लोड हो रहा है...</div>;

    return (
        <div className="ss-container">
            <header className="ss-main-header">
                <span className="ss-category-tag category-state" onClick={closeNews} style={{cursor:'pointer'}}>राज्य</span>
            </header>

            {selectedNews ? (
                <div className="ss-full-width-layout">
                    <div className="ss-news-detail-view">
                        <div className="ss-back-btn-wrapper">
                            <button className="ss-back-btn" onClick={closeNews}>← वापस जाएं</button>
                        </div>
                        <img src={selectedNews.imageUrl} className="ss-detail-hero-img" alt="" />
                        <h1 className="ss-detail-title">{selectedNews.title}</h1>
                        <div className="ss-detail-meta">
                            <span><i className="far fa-calendar-alt"></i> {selectedNews.date || selectedNews.time}</span>
                            {selectedNews.author && <span> • {selectedNews.author}</span>}
                        </div>
                        <div className="ss-detail-content">
                            <p className="ss-full-summary" style={{whiteSpace: 'pre-line'}}>{selectedNews.summary}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="ss-main-content-layout"> 
                    <div className="ss-left-main-blocks">
                        <section className="ss-feature-section" style={{ position: 'relative' }}>
                            {data.feature_posts.length > 0 && (
                                <>
                                    <StateNewsCard 
                                        news={data.feature_posts[currentSlide]} 
                                        isFeature={true} 
                                        onOpenNews={openNews} 
                                    />
                                    <div className="ss-slider-dots" style={{display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '10px'}}>
                                        {data.feature_posts.map((_, index) => (
                                            <span 
                                                key={index} 
                                                className={`ss-slider-dot ${currentSlide === index ? 'active' : ''}`}
                                                onClick={() => setCurrentSlide(index)}
                                                style={{ cursor: 'pointer' }}
                                            ></span>
                                        ))}
                                    </div>
                                </>
                            )}
                        </section>

                        <section className="ss-latest-releases-section">
                            <h2 className="ss-section-heading ss-state-heading">Local Updates</h2>
                            <div className="ss-releases-grid">
                                {currentPosts.length > 0 ? (
                                    currentPosts.map(item => (
                                        <StateNewsCard key={item.id} news={item} isFeature={false} isGrid={true} onOpenNews={openNews} />
                                    ))
                                ) : (
                                    <p style={{padding:'20px'}}>No grid posts found.</p>
                                )}
                            </div>
                            
                            <div className="ss-pagination">
                                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="ss-pagination-link" disabled={currentPage === 1}>Prev</button>
                                {pageNumbers.map(number => (
                                    <span key={number} onClick={() => setCurrentPage(number)} className={`ss-page-number ${currentPage === number ? 'ss-active-page' : ''}`}>{number}</span>
                                ))}
                                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} className="ss-pagination-link" disabled={currentPage === totalPages || totalPages === 0}>Next</button>
                            </div>
                        </section>
                    </div>

                    <aside className="ss-right-sidebar-news">
                        <SidebarRecentPost posts={data.recent_posts} onOpenNews={openNews} />
                        <SidebarHotCategory categories={data.hot_categories} />
                        <SocialMediaIcons links={[]} />
                        <StateSelector states={MOCK_STATES} onSelectState={setSelectedStateCode} selectedState={selectedStateCode} />
                    </aside>
                </div>
            )}
        </div>
    );
}

export default StateSection;