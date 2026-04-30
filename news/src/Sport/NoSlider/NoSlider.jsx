import React, { useState, useEffect } from 'react';
import './NoSlider.css'; 
import { Link } from 'react-router-dom';

const NoSlider = () => {
    const API_BASE = "http://localhost:8080/api/sidebar-article";
    
    const [mainArticles, setMainArticles] = useState([]); 
    const [currentArticle, setCurrentArticle] = useState(null); 
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sidebarData, setSidebarData] = useState({ recentPosts: [], categories: [] });
    const [loading, setLoading] = useState(true);
    const [likes, setLikes] = useState({}); // Like State

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch(`${API_BASE}/layout`);
            const data = await res.json();
            
            // --- 1. Reverse Logic (Last data pehle) ---
            const reversedArticles = data.main_articles ? [...data.main_articles].reverse() : [];
            const reversedRecent = data.sidebar?.recentPosts ? [...data.sidebar.recentPosts].reverse() : [];

            setMainArticles(reversedArticles);
            setSidebarData({
                recentPosts: reversedRecent,
                categories: data.sidebar?.categories || []
            });

            if (reversedArticles.length > 0) {
                setCurrentArticle(reversedArticles[0]);
                setCurrentIndex(0);
            } else if (reversedRecent.length > 0) {
                setCurrentArticle(reversedRecent[0]);
            }

            setLoading(false);
        } catch (err) {
            console.error("API Fetch Error:", err);
            setLoading(false);
        }
    };

    // --- 2. Arrow Navigation Logic ---
    const nextArticle = () => {
        if (mainArticles.length === 0) return;
        const nextIdx = (currentIndex + 1) % mainArticles.length;
        changeContent(mainArticles[nextIdx], nextIdx);
    };

    const prevArticle = () => {
        if (mainArticles.length === 0) return;
        const prevIdx = (currentIndex - 1 + mainArticles.length) % mainArticles.length;
        changeContent(mainArticles[prevIdx], prevIdx);
    };

    // --- 3. Click Handler (Same Page Update) ---
    const changeContent = (article, index) => {
        setCurrentArticle(article);
        if (index !== undefined) {
            setCurrentIndex(index);
        } else {
            const foundIdx = mainArticles.findIndex(a => a.id === article.id);
            if (foundIdx !== -1) setCurrentIndex(foundIdx);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // --- 4. Like/Unlike Logic ---
    const toggleLike = (id) => {
        setLikes(prev => ({ ...prev, [id]: !prev[id] }));
    };

    if (loading) return <div style={{textAlign:'center', padding:'100px'}}>Loading Content...</div>;
    if (!currentArticle) return <div style={{textAlign:'center', padding:'100px'}}>No Article Found.</div>;

    return (
        <div className="ns-page-container">
            <div className="ns-top-bottom-layout">
                
                {/* 1. TOP SECTION (MAIN CONTENT) */}
                <div className="ns-main-content">
                    <div className="ns-nav-wrapper" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                        <button onClick={prevArticle} style={{padding: '8px 15px', cursor: 'pointer', border: '1px solid #ddd', background: '#fff', borderRadius: '4px'}}>
                            <i className="fas fa-arrow-left"></i> Previous
                        </button>
                        <button onClick={nextArticle} style={{padding: '8px 15px', cursor: 'pointer', border: '1px solid #ddd', background: '#fff', borderRadius: '4px'}}>
                            Next <i className="fas fa-arrow-right"></i>
                        </button>
                    </div>

                    <h1 className="ns-post-title">{currentArticle.title}</h1>

                    <div className="ns-post-meta">
                        <span className="ns-meta-item"><i className="fas fa-calendar-alt"></i> {currentArticle.date}</span> | 
                        <span className="ns-meta-item"><i className="fas fa-clock"></i> {currentArticle.time || "10:30 AM"}</span> | 
                        <span className="ns-meta-item"><i className="fas fa-book-reader"></i> {currentArticle.readTime || "5 min read"}</span>
                    </div>
                    
                    <div className="ns-post-media-wrapper" style={{margin: '20px 0'}}>
                        <img 
                            src={currentArticle.featuredImage || currentArticle.sidebarImageUrl} 
                            alt={currentArticle.title} 
                            style={{width: '100%', borderRadius: '8px'}}
                        />
                    </div>

                    <div className="ns-post-text" dangerouslySetInnerHTML={{ __html: currentArticle.content }} />
                    
                    <div className="ns-interaction-bar" style={{display: 'flex', justifyContent: 'space-between', padding: '20px 0', borderTop: '1px solid #eee', marginTop: '30px'}}>
                        <button onClick={() => toggleLike(currentArticle.id)} style={{background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: likes[currentArticle.id] ? '#e74c3c' : '#333'}}>
                            <i className={`${likes[currentArticle.id] ? 'fas' : 'far'} fa-heart`}></i>
                            <span style={{marginLeft: '10px', color: '#333', fontSize: '1rem'}}>Like</span>
                        </button>
                        <div className="ns-social-share" style={{display: 'flex', gap: '15px', fontSize: '1.2rem'}}>
                            <i className="fab fa-facebook-f" style={{cursor:'pointer'}}></i>
                            <i className="fab fa-twitter" style={{cursor:'pointer'}}></i>
                            <i className="fab fa-whatsapp" style={{cursor:'pointer'}}></i>
                        </div>
                    </div>

                    <div className="ns-post-footer">
                        <div className="ns-tags-list">
                            <span className="ns-tag-label">Tags:</span>
                            {currentArticle.tags && currentArticle.tags.map((tag, index) => (
                                <span key={index} className="ns-tag-item" style={{marginLeft: '8px', color: '#007bff'}}>#{tag}</span>
                            ))}
                        </div>
                    </div>

                    <div className="ns-comments-section" style={{marginTop: '40px'}}>
                        <h4 className="ns-comments-count">Leave a Comment</h4>
                        <div className="ns-reply-form">
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="ns-form-row" style={{display: 'flex', gap: '10px', marginBottom: '10px'}}>
                                    <input type="text" placeholder="Name *" required style={{flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ddd'}} />
                                    <input type="email" placeholder="Email *" required style={{flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ddd'}} />
                                </div>
                                <textarea placeholder="Comment *" rows="5" required style={{width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', marginBottom: '10px'}}></textarea>
                                <button type="submit" className="ns-post-comment-btn" style={{padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Post Comment</button>
                            </form>
                        </div>
                    </div>
                </div>
                
                {/* 2. BOTTOM SECTION (FIXED SCROLL AREA) */}
                <aside className="ns-bottom-sidebar" style={{marginTop: '50px', borderTop: '2px solid #eee', paddingTop: '30px'}}>
                    
                    <div className="spd-widget spd-recent-widget">
                        <h3 className="spd-widget-title" style={{fontSize: '22px', marginBottom: '20px'}}>Recent Posts</h3>
                        
                        {/* --- SCROLLABLE BOX (Fixed height for 4 cards) --- */}
                        <div className="sidebar-scroll-box" style={{
                            height: '420px',      // 4 cards ke liye fixed height
                            overflowY: 'scroll',   // Scroll hamesha active rahega agar data zyada ho
                            paddingRight: '10px',
                            background: '#fff'
                        }}>
                            <ul className="spd-recent-posts-list" style={{listStyle: 'none', padding: 0}}>
                                {sidebarData.recentPosts.map((post, idx) => (
                                    <li key={post.id || idx} className="spd-recent-post-item" onClick={() => changeContent(post)} style={{cursor: 'pointer', marginBottom: '20px'}}>
                                        <div className="spd-recent-post-link-wrapper" style={{display: 'flex', gap: '15px'}}>
                                            <img 
                                                src={post.sidebarImageUrl || post.featuredImage} 
                                                alt={post.title} 
                                                style={{width: '90px', height: '75px', borderRadius: '6px', objectFit: 'cover'}} 
                                            />
                                            <div className="spd-recent-post-details">
                                                <p style={{
                                                    margin: '0 0 5px 0',
                                                    fontSize: '15px',
                                                    color: currentArticle.id === post.id ? '#007bff' : '#333', 
                                                    fontWeight: currentArticle.id === post.id ? 'bold' : '500'
                                                }}>
                                                    {post.title}
                                                </p>
                                                <span style={{fontSize: '12px', color: '#888'}}>{post.date}</span>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    
                    {/* Categories section niche hi rahega */}
                    <div className="spd-widget spd-categories-dropdown" style={{marginTop: '40px'}}>
                        <h3 className="spd-widget-title">Hot Categories</h3>
                        <div className="ns-category-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px'}}>
                            {sidebarData.categories.map((cat, index) => (
                                <div key={index} style={{padding: '10px', background: '#f8f9fa', borderRadius: '5px', textAlign: 'center', border: '1px solid #eee'}}>
                                    <span style={{display: 'block', fontWeight: 'bold'}}>{cat.categoryName}</span>
                                    <span style={{fontSize: '0.8rem', color: '#666'}}>{cat.categoryCount} Posts</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default NoSlider;