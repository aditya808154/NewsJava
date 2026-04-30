import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    FaHeart, FaRegHeart, FaWhatsapp, FaFacebookF, 
    FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn 
} from 'react-icons/fa';
import './BusinessSection.css'; 

// --- Like Button Component ---
const LikeButton = ({ newsId, initialLikes }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(initialLikes || 0);

    useEffect(() => {
        const savedLikes = JSON.parse(localStorage.getItem("bsLikedNews") || "[]");
        if (savedLikes.includes(newsId)) setIsLiked(true);
    }, [newsId]);

    const handleLike = (e) => {
        e.stopPropagation();
        let savedLikes = JSON.parse(localStorage.getItem("bsLikedNews") || "[]");
        if (isLiked) {
            savedLikes = savedLikes.filter(id => id !== newsId);
            setLikeCount(prev => prev - 1);
        } else {
            savedLikes.push(newsId);
            setLikeCount(prev => prev + 1);
        }
        setIsLiked(!isLiked);
        localStorage.setItem("bsLikedNews", JSON.stringify(savedLikes));
    };

    return (
        <div onClick={handleLike} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#666', marginTop: '8px' }}>
            {isLiked ? <FaHeart color="#ff4d4d" /> : <FaRegHeart />}
            <span>{likeCount} Likes</span>
        </div>
    );
};

// --- Custom Slider Component ---
const CustomSlider = ({ newsList, onOpen, interval = 5000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (newsList.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev === newsList.length - 1 ? 0 : prev + 1));
        }, interval);
        return () => clearInterval(timer);
    }, [newsList.length, interval]);

    if (newsList.length === 0) return null;
    const currentNews = newsList[currentIndex];

    return (
        <div className="bs-slider-main-container" style={{ marginBottom: '30px' }}>
            <div className="bs-news-card bs-feature-card bs-feature-post-layout">
                <div onClick={() => onOpen(currentNews)} style={{ cursor: 'pointer' }}>
                    <img src={currentNews.imageUrl} alt={currentNews.title} className="bs-card-image" />
                </div>
                <div className="bs-card-content">
                    <h3 onClick={() => onOpen(currentNews)} style={{cursor:'pointer'}}>{currentNews.title}</h3>
                    <p className="bs-card-summary">
                        {currentNews.summary && currentNews.summary.length > 120 
                            ? currentNews.summary.substring(0, 120) + "..." 
                            : currentNews.summary}
                    </p>
                    <LikeButton newsId={currentNews.id} initialLikes={currentNews.comments} />
                </div>
            </div>
            {newsList.length > 1 && (
                <div className="bs-slider-dots" style={{ textAlign: 'center', marginTop: '15px' }}>
                    {newsList.map((_, idx) => (
                        <span key={idx} onClick={() => setCurrentIndex(idx)}
                            style={{
                                display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%',
                                background: currentIndex === idx ? '#000' : '#ccc',
                                margin: '0 5px', cursor: 'pointer', transition: '0.3s'
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// --- Sub-Components ---
const SidebarRecentPost = ({ posts, onSelect }) => (
    <div className="bs-sidebar-block bs-recent-posts">
        <h3 className="bs-sidebar-heading">Recent Posts</h3>
        {posts?.map((post) => (
            <div key={post.id} className="bs-recent-post-item" onClick={() => onSelect(post)} style={{cursor: 'pointer'}}>
                <img src={post.imageUrl} alt={post.title} className="bs-recent-post-image" />
                <div className="bs-post-info">
                    <span className="bs-post-category">{post.category}</span>
                    <p className="bs-post-title">{post.title}</p>
                </div>
            </div>
        ))}
    </div>
);

const SidebarHotCategory = ({ categories }) => (
    <div className="bs-sidebar-block bs-hot-categories">
        <h3 className="bs-sidebar-heading">Hot Categories</h3>
        <ul className="bs-category-list">
            {categories?.map((cat, index) => (
                <li key={index} className="bs-category-item">
                    <Link to={`/Business/${cat.title?.toLowerCase().replace(/\s/g, '-')}`} style={{display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit'}}>
                        <img src={cat.imageUrl} alt="" style={{width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover'}} />
                        <span style={{fontWeight: '500'}}>{cat.title}</span>
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

const SocialMediaIcons = ({ links }) => {
    // Default Data if API is empty
    const socialData = links?.length > 0 ? links : [
        { name: 'Facebook', followers: '15K', icon: <FaFacebookF />, url: '#', color: '#3b5998' },
        { name: 'Twitter', followers: '10K', icon: <FaTwitter />, url: '#', color: '#1da1f2' },
        { name: 'Instagram', followers: '25K', icon: <FaInstagram />, url: '#', color: '#e1306c' },
        { name: 'YouTube', followers: '50K', icon: <FaYoutube />, url: '#', color: '#ff0000' }
    ];

    return (
        <div className="bs-sidebar-block bs-social-media">
            <h3 className="bs-sidebar-heading">Follow Us</h3>
            <div className="bs-social-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '15px' }}>
                {socialData.map((link, index) => (
                    <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" 
                       className="bs-social-item" style={{ 
                           backgroundColor: link.color, 
                           display: 'flex', alignItems: 'center', padding: '10px', borderRadius: '6px', 
                           color: '#fff', textDecoration: 'none', gap: '10px' 
                       }}>
                        <span style={{fontSize: '18px'}}>{link.icon}</span>
                        <div className="bs-social-details" style={{display:'flex', flexDirection:'column'}}>
                            <span className="bs-social-count" style={{fontSize:'12px', fontWeight:'bold'}}>{link.followers}</span>
                            <span className="bs-social-name" style={{fontSize:'10px', opacity:'0.8'}}>{link.name}</span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

// --- Main Section ---
function BusinessSection() {
    const [layoutData, setLayoutData] = useState({ sidebarData: {}, businessNewsData: {} });
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedNews, setSelectedNews] = useState(null); 
    
    const postsPerPage = 4; // 2x2 Grid

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/business-data/layout");
                const data = await res.json();
                
                // Data Reverse for Latest First
                if (data.businessNewsData) {
                    if (data.businessNewsData.feature) data.businessNewsData.feature.reverse();
                    if (data.businessNewsData.grid_posts) data.businessNewsData.grid_posts.reverse();
                }
                if (data.sidebarData) {
                    if (data.sidebarData.recent_posts) data.sidebarData.recent_posts.reverse();
                    if (data.sidebarData.hot_categories) data.sidebarData.hot_categories.reverse();
                }

                setLayoutData(data);
                setLoading(false);
            } catch (err) { setLoading(false); }
        };
        fetchData();
    }, []);

    if (loading) return <div style={{padding: '50px', textAlign: 'center'}}>Loading...</div>;

    const bNews = layoutData.businessNewsData || {};
    const sData = layoutData.sidebarData || {};
    const gridList = bNews.grid_posts || [];
    const featureList = bNews.feature || [];

    const totalPages = Math.ceil(gridList.length / postsPerPage);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentGridData = gridList.slice(indexOfFirstPost, indexOfLastPost);

    const handlePageClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 400, behavior: 'smooth' });
        }
    };

    const handleNewsClick = (news) => {
        setSelectedNews(news);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="bs-container">
            <header className="bs-main-header" style={{backgroundColor: '#fff', padding: '10px 0'}}>
                <span className="bs-category-tag" style={{ color:'#000', padding:'5px 15px', borderRadius:'4px'}}>टेक्नोलॉजी & बिज़नेस</span>
            </header>

            <div className={`bs-main-content-layout ${selectedNews ? "full-width" : ""}`}> 
                <div className={selectedNews ? "bs-detail-view-full" : "bs-left-main-blocks"}>
                    
                    {selectedNews ? (
                        <div className="bs-detail-content-area">
                            <button onClick={() => setSelectedNews(null)} className="bs-back-button" style={{marginBottom:'20px', cursor:'pointer'}}>← Back to List</button>
                            <img src={selectedNews.imageUrl} alt="" className="bs-detail-img" style={{width:'100%', borderRadius:'12px'}} />
                            <h1 className="bs-detail-title" style={{margin:'20px 0'}}>{selectedNews.title}</h1>
                            <div className="bs-detail-text" style={{lineHeight:'1.8', fontSize:'1.1rem'}}>
                                <p><b>{selectedNews.summary}</b></p>
                                <p>{selectedNews.content || "Full article content will load here from API..."}</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <CustomSlider newsList={featureList} onOpen={handleNewsClick} />
                            
                            <section className="bs-latest-releases-section">
                                <h2 className="bs-section-heading" style={{borderLeft:'4px solid #000', paddingLeft:'10px', marginBottom:'20px'}}>मार्केट अपडेट्स</h2>
                                <div className="bs-releases-grid" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
                                    {currentGridData.map(item => (
                                        <div key={item.id} className="bs-news-card bs-grid-card" onClick={() => handleNewsClick(item)} style={{cursor: 'pointer', border:'1px solid #eee', borderRadius:'8px', overflow:'hidden'}}>
                                            <img src={item.imageUrl} alt="" className="bs-card-image" style={{width:'100%', height:'180px', objectFit:'cover'}} />
                                            <div className="bs-card-content" style={{padding:'15px'}}>
                                                <span className="bs-grid-category" style={{fontSize:'10px', background:'#f0f0f0', padding:'2px 8px', borderRadius:'10px'}}>{item.category}</span>
                                                <h3 style={{fontSize:'1rem', margin:'10px 0'}}>{item.title}</h3>
                                                <LikeButton newsId={item.id} initialLikes={item.comments} />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {totalPages > 1 && (
                                    <div className="bs-pagination" style={{display:'flex', justifyContent:'center', alignItems:'center', gap:'15px', marginTop:'40px'}}>
                                        <button className="bs-pagination-link" onClick={() => handlePageClick(currentPage - 1)} disabled={currentPage === 1}>Prev</button>
                                        <span style={{fontSize:'14px'}}>Page <b>{currentPage}</b> of {totalPages}</span>
                                        <button className="bs-pagination-link" onClick={() => handlePageClick(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                                    </div>
                                )}
                            </section>
                        </>
                    )}
                </div>

                {!selectedNews && (
                    <aside className="bs-right-sidebar-news">
                        <SidebarRecentPost posts={sData.recent_posts} onSelect={handleNewsClick} />
                        <SidebarHotCategory categories={sData.hot_categories} />
                        <SocialMediaIcons links={sData.social_links} />
                    </aside>
                )}
            </div>
        </div>
    );
}

export default BusinessSection;