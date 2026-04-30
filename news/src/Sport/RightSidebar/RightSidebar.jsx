import React, { useState, useEffect } from 'react'; 
import { Link, useParams } from 'react-router-dom';
import './RightSidebar.css'; 

const RightSidebar = () => {
    const API_BASE = "http://localhost:8080/api/sidebar-article";
    
    const [mainArticles, setMainArticles] = useState([]); 
    const [currentArticle, setCurrentArticle] = useState(null); 
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sidebarData, setSidebarData] = useState({ recentPosts: [], categories: [], popularTags: [] });
    const [loading, setLoading] = useState(true);

    // Like State
    const [likes, setLikes] = useState({});

    // Comment States
    const [comments, setComments] = useState([]);
    const [commentForm, setCommentForm] = useState({ name: '', text: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch(`${API_BASE}/layout`);
            const data = await res.json();
            
            // --- DATA REVERSE LOGIC ---
            const recent = data.sidebar?.recentPosts ? [...data.sidebar.recentPosts].reverse() : [];
            const articles = data.main_articles ? [...data.main_articles].reverse() : [];

            setSidebarData({
                recentPosts: recent,
                categories: data.sidebar?.categories || [],
                popularTags: data.sidebar?.popularTags || []
            });

            setMainArticles(articles);
            
            if (articles.length > 0) {
                setCurrentArticle(articles[0]);
                setCurrentIndex(0);
            } else if (recent.length > 0) {
                setCurrentArticle(recent[0]);
            }

            setComments([{ id: 1, name: "Rahul Kumar", date: "Dec 20, 2025", text: "Bahut hi informative post hai bahi!" }]);
            setLoading(false);
        } catch (err) {
            console.error("API Fetch Error:", err);
            setLoading(false);
        }
    };

    const nextArticle = () => {
        if (mainArticles.length === 0) return;
        const nextIdx = (currentIndex + 1) % mainArticles.length;
        updateCurrentArticle(mainArticles[nextIdx], nextIdx);
    };

    const prevArticle = () => {
        if (mainArticles.length === 0) return;
        const prevIdx = (currentIndex - 1 + mainArticles.length) % mainArticles.length;
        updateCurrentArticle(mainArticles[prevIdx], prevIdx);
    };

    const updateCurrentArticle = (selected, index) => {
        if (selected) {
            setCurrentArticle(selected);
            setCurrentIndex(index !== undefined ? index : 0);
            setComments([]); 
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const toggleLike = (id) => {
        setLikes(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (commentForm.name && commentForm.text) {
            const newComment = {
                id: Date.now(),
                name: commentForm.name,
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                text: commentForm.text
            };
            setComments([newComment, ...comments]);
            setCommentForm({ name: '', text: '' });
        }
    };

    if (loading) return <div style={{textAlign:'center', padding:'100px'}}>Loading Content...</div>;
    if (!currentArticle) return <div style={{textAlign:'center', padding:'100px'}}>No Article Found.</div>;

    return (
        <div className="spd-page-container">
            <div className="spd-main-layout">
                
                {/* 1. LEFT COLUMN (SIDEBAR) */}
                <aside className="spd-sidebar">
                    <div className="spd-widget spd-recent-widget">
                        <h3 className="spd-widget-title">Recent Posts</h3>
                        
                        {/* --- SCROLLABLE BOX START --- */}
                        <div className="spd-recent-scroller" style={{
                            maxHeight: '420px', // Approx 4 cards ki height
                            overflowY: 'auto',
                            paddingRight: '5px',
                            // Custom Scrollbar Style (CSS in JS)
                            scrollbarWidth: 'thin',
                            scrollbarColor: '#007bff #f1f1f1'
                        }}>
                            <ul className="spd-recent-posts-list">
                                {sidebarData.recentPosts.map((post, idx) => (
                                    <li key={post.id || idx} className="spd-recent-post-item" onClick={() => updateCurrentArticle(post, idx)} style={{cursor: 'pointer'}}>
                                        <div className="spd-recent-post-link-wrapper">
                                            <img src={post.sidebarImageUrl || post.featuredImage} alt={post.title} className="spd-recent-post-thumb" />
                                            <div className="spd-recent-post-details">
                                                <p className="spd-recent-post-title" style={{color: currentArticle.id === post.id ? '#007bff' : '#333', fontWeight: currentArticle.id === post.id ? 'bold' : 'normal'}}>
                                                    {post.title}
                                                </p>
                                                <span className="spd-recent-post-date">{post.date}</span>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* --- SCROLLABLE BOX END --- */}
                        
                    </div>
                    
                    <div className="spd-widget spd-categories-dropdown">
                        <h3 className="spd-widget-title">Categories</h3>
                        <select className="spd-category-select">
                            <option>Select Category</option>
                            {sidebarData.categories.map((cat, index) => (
                                <option key={index} value={cat.categoryName}>{cat.categoryName} ({cat.categoryCount})</option>
                            ))}
                        </select>
                    </div>
                </aside>
                
                {/* 2. RIGHT COLUMN (MAIN CONTENT) */}
                <div className="spd-main-content">
                    
                    <div className="spd-slider-nav" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>
                        <button onClick={prevArticle} className="spd-nav-btn" style={{padding: '8px 15px', cursor: 'pointer'}}><i className="fas fa-arrow-left"></i> Previous</button>
                        <button onClick={nextArticle} className="spd-nav-btn" style={{padding: '8px 15px', cursor: 'pointer'}}>Next <i className="fas fa-arrow-right"></i></button>
                    </div>

                    <h1 className="spd-post-title">{currentArticle.title}</h1>
                    <div className="spd-post-meta">
                        <span><i className="fas fa-calendar-alt"></i> {currentArticle.date}</span> | 
                        <span><i className="fas fa-clock"></i> {currentArticle.time}</span> | 
                        <span><i className="fas fa-book-reader"></i> {currentArticle.readTime}</span>
                    </div>
                    
                    <div className="spd-featured-image-wrapper" style={{margin: '20px 0'}}>
                        <img src={currentArticle.featuredImage} alt={currentArticle.title} className="spd-featured-image" style={{width: '100%', borderRadius: '8px'}} />
                    </div>

                    <div className="spd-post-text" dangerouslySetInnerHTML={{ __html: currentArticle.content }} />
                    
                    <div className="spd-interaction-bar" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee', marginTop: '30px'}}>
                        <div className="spd-like-section">
                            <button 
                                onClick={() => toggleLike(currentArticle.id)} 
                                style={{background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: likes[currentArticle.id] ? '#e74c3c' : '#333'}}
                            >
                                <i className={`${likes[currentArticle.id] ? 'fas' : 'far'} fa-heart`}></i> 
                                <span style={{marginLeft: '8px', fontSize: '1rem'}}>{likes[currentArticle.id] ? 1 : 0} Likes</span>
                            </button>
                        </div>
                        
                        <div className="spd-social-share" style={{fontSize: '1.2rem', display: 'flex', gap: '15px'}}>
                            <i className="fab fa-facebook-f" style={{cursor:'pointer'}}></i>
                            <i className="fab fa-twitter" style={{cursor:'pointer'}}></i>
                            <i className="fab fa-whatsapp" style={{cursor:'pointer'}}></i>
                        </div>
                    </div>

                    <div className="spd-post-footer" style={{marginTop: '15px'}}>
                        <div className="spd-tags-list">
                            <span style={{fontWeight: 'bold'}}>Tags: </span>
                            {currentArticle.tags && currentArticle.tags.map((tag, index) => (
                                <span key={index} className="spd-tag-item" style={{marginRight: '10px', color: '#007bff'}}>#{tag}</span>
                            ))}
                        </div>
                    </div>

                    <div className="spd-comments-section" style={{marginTop: '50px'}}>
                        <h3 style={{borderBottom: '2px solid #007bff', display: 'inline-block', marginBottom: '20px'}}>{comments.length} Comments</h3>
                        
                        <div className="spd-comments-list">
                            {comments.map(c => (
                                <div key={c.id} style={{marginBottom: '15px', background: '#f9f9f9', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #007bff'}}>
                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <strong>{c.name}</strong>
                                        <small style={{color: '#888'}}>{c.date}</small>
                                    </div>
                                    <p style={{margin: '8px 0 0', color: '#444'}}>{c.text}</p>
                                </div>
                            ))}
                        </div>

                        <div className="spd-comment-form" style={{marginTop: '40px', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)'}}>
                            <h4>Leave a Reply</h4>
                            <form onSubmit={handleCommentSubmit} style={{marginTop: '15px'}}>
                                <input 
                                    type="text" placeholder="Your Name*" required 
                                    style={{width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ddd'}}
                                    value={commentForm.name}
                                    onChange={(e) => setCommentForm({...commentForm, name: e.target.value})}
                                />
                                <textarea 
                                    rows="4" placeholder="Your Comment*" required 
                                    style={{width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ddd'}}
                                    value={commentForm.text}
                                    onChange={(e) => setCommentForm({...commentForm, text: e.target.value})}
                                ></textarea>
                                <button type="submit" style={{backgroundColor: '#007bff', color: '#fff', padding: '10px 25px', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Post Comment</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RightSidebar;