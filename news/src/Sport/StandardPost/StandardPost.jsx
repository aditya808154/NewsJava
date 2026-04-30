import React, { useState, useEffect } from 'react';
import './StandardPost.css'; 
import { Link } from 'react-router-dom';
import { postData as staticData } from './StandardPostData'; 
// Icons ke liye (Agar font-awesome hai to theek, nahi to arrows standard text se chalenge)

const StandardPost = () => {
    const API_BASE = "http://localhost:8080/api/post-details";

    // --- STATES ---
    const [mainPosts, setMainPosts] = useState([]);    
    const [sidebarPosts, setSidebarPosts] = useState([]); 
    const [categories, setCategories] = useState([]);  
    const [currentPost, setCurrentPost] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0); // Slider index
    const [loading, setLoading] = useState(true);

    // Like/Unlike States
    const [likes, setLikes] = useState(Math.floor(Math.random() * 100)); 
    const [unlikes, setUnlikes] = useState(Math.floor(Math.random() * 10));
    const [userAction, setUserAction] = useState(null); // 'liked' or 'unliked'

    // --- FETCH DATA ---
    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await fetch(`${API_BASE}/layout`);
                const data = await res.json();

                const mPosts = Array.isArray(data.main_post) ? [...data.main_post].reverse() : (data.main_post ? [data.main_post] : []);
                setMainPosts(mPosts);
                
                if (mPosts.length > 0) {
                    setCurrentPost(mPosts[0]);
                    setCurrentIndex(0);
                }

                const sPosts = Array.isArray(data.recent_posts) ? [...data.recent_posts].reverse() : [];
                setSidebarPosts(sPosts);

                const mappedCats = (data.category_list || []).map(c => ({
                    name: c.categoryName,
                    count: c.count,
                    bg: c.bgImage
                }));
                setCategories(mappedCats);
                
                setLoading(false);
            } catch (err) {
                console.error("API Error:", err);
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // --- SLIDER FUNCTIONS ---
    const goToNext = () => {
        const nextIndex = (currentIndex + 1) % mainPosts.length;
        setCurrentIndex(nextIndex);
        setCurrentPost(mainPosts[nextIndex]);
        resetReactions();
    };

    const goToPrev = () => {
        const prevIndex = (currentIndex - 1 + mainPosts.length) % mainPosts.length;
        setCurrentIndex(prevIndex);
        setCurrentPost(mainPosts[prevIndex]);
        resetReactions();
    };

    const resetReactions = () => {
        setLikes(Math.floor(Math.random() * 100));
        setUnlikes(Math.floor(Math.random() * 10));
        setUserAction(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // --- LIKE/UNLIKE HANDLERS ---
    const handleLike = () => {
        if (userAction === 'liked') {
            setLikes(likes - 1);
            setUserAction(null);
        } else {
            setLikes(likes + 1);
            if (userAction === 'unliked') setUnlikes(unlikes - 1);
            setUserAction('liked');
        }
    };

    const handleUnlike = () => {
        if (userAction === 'unliked') {
            setUnlikes(unlikes - 1);
            setUserAction(null);
        } else {
            setUnlikes(unlikes + 1);
            if (userAction === 'liked') setLikes(likes - 1);
            setUserAction('unliked');
        }
    };

    if (loading || !currentPost) return <div style={{padding: '50px', textAlign: 'center'}}>Loading News...</div>;

    const isCustomPost = currentPost.id !== mainPosts[0]?.id;

    const handlePostSwitch = (newPost) => {
        setCurrentPost(newPost);
        // Index update karo agar sidebar se main post select ki jaye
        const foundIndex = mainPosts.findIndex(p => p.id === newPost.id);
        if(foundIndex !== -1) setCurrentIndex(foundIndex);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="sp-page-container">
            <div className="sp-main-layout">
                
                {/* --- LEFT COLUMN --- */}
                <div className="sp-main-content">
                    
                    <div className="sp-slider-nav" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>
                        {isCustomPost ? (
                            <button onClick={() => handlePostSwitch(mainPosts[0])} className="sp-back-btn">
                                ← Back to Latest
                            </button>
                        ) : <div/>}
                        
                        {/* LEFT-RIGHT ARROWS */}
                        <div className="sp-arrow-controls" style={{display: 'flex', gap: '10px'}}>
                            <button onClick={goToPrev} className="sp-nav-arrow" title="Previous Post"> ❮ </button>
                            <span style={{alignSelf: 'center', fontSize: '14px', fontWeight: 'bold'}}>
                                {currentIndex + 1} / {mainPosts.length}
                            </span>
                            <button onClick={goToNext} className="sp-nav-arrow" title="Next Post"> ❯ </button>
                        </div>
                    </div>

                    <h1 className="sp-post-title">{currentPost.title}</h1>

                    <div className="sp-post-meta">
                        <span className="sp-meta-item"><i className="fas fa-calendar-alt"></i> {currentPost.date}</span>
                        <span className="sp-meta-separator">|</span>
                        <span className="sp-meta-item"><i className="fas fa-clock"></i> {currentPost.time}</span>
                        <span className="sp-meta-separator">|</span>
                        <span className="sp-meta-item"><i className="fas fa-book-reader"></i> {currentPost.readTime}</span>
                    </div>
                    
                    <div className="sp-post-text" dangerouslySetInnerHTML={{ __html: currentPost.content }} />
                    
                    <div className="sp-post-media-wrapper">
                        <img src={currentPost.mainImage} alt="Post Media" className="sp-post-main-media" />
                    </div>

                    {/* LIKE & UNLIKE SECTION */}
                    <div className="sp-reaction-bar" style={{display: 'flex', gap: '20px', padding: '15px 0', borderBottom: '1px solid #eee'}}>
                        <button 
                            onClick={handleLike} 
                            style={{background: 'none', border: 'none', cursor: 'pointer', color: userAction === 'liked' ? '#007bff' : '#555', fontSize: '18px'}}
                        >
                            <i className={`${userAction === 'liked' ? 'fas' : 'far'} fa-thumbs-up`}></i> Like ({likes})
                        </button>
                        <button 
                            onClick={handleUnlike} 
                            style={{background: 'none', border: 'none', cursor: 'pointer', color: userAction === 'unliked' ? '#dc3545' : '#555', fontSize: '18px'}}
                        >
                            <i className={`${userAction === 'unliked' ? 'fas' : 'far'} fa-thumbs-down`}></i> Unlike ({unlikes})
                        </button>
                    </div>

                    <div className="sp-post-footer">
                        <div className="sp-social-share">
                            <i className="sp-social-icon fab fa-facebook-f"></i>
                            <i className="sp-social-icon fas fa-envelope"></i>
                            <i className="sp-social-icon fab fa-twitter"></i>
                            <i className="sp-social-icon fab fa-whatsapp"></i>
                            <i className="sp-social-icon fas fa-plus"></i>
                        </div>
                        <div className="sp-tags-list">
                            <span className="sp-tag-label">Tags:</span>
                            {Array.isArray(currentPost.tags) && currentPost.tags.map((tag, index) => (
                                <Link key={index} to={`/category/${tag}`} className="sp-tag-item">{tag}</Link>
                            ))}
                        </div>
                    </div>

                    <div className="sp-comments-section">
                        <h4 className="sp-comments-count">Comments on “{currentPost.title}”</h4>
                        <div className="sp-comment-item">
                            <div className="sp-comment-avatar">A</div>
                            <div className="sp-comment-body">
                                <div className="sp-comment-meta">
                                    <span className="sp-comment-author">{staticData.comment.author}</span>
                                    <span className="sp-comment-date">{staticData.comment.date}</span>
                                </div>
                                <p className="sp-comment-text">{staticData.comment.text}</p>
                                <button className="sp-comment-reply-btn">Reply</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT COLUMN --- */}
                <aside className="sp-sidebar">
                    <div className="sp-widget sp-recent-widget">
                        <h3 className="sp-widget-title">Recent Posts</h3>
                        <ul className="sp-recent-posts-list">
                            {sidebarPosts.map(post => (
                                <li key={post.id} className="sp-recent-post-item" onClick={() => handlePostSwitch(post)} style={{ cursor: 'pointer' }}>
                                    <div className="sp-recent-post-link-wrapper">
                                        <img src={post.gridImage || post.mainImage} alt="" className="sp-recent-post-thumb" />
                                        <div className="sp-recent-post-details">
                                            <p className="sp-recent-post-title">{post.title}</p>
                                            <span className="sp-recent-post-date">{post.date}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="sp-widget sp-categories-widget">
                        <h3 className="sp-widget-title">Hot Categories</h3>
                        <div className="sp-category-grid">
                            {categories.map((cat, index) => (
                                <div key={index} className="sp-category-item-tile" style={{ backgroundImage: `url(${cat.bg})`, cursor: 'pointer' }}>
                                    <span className="sp-category-name">{cat.name}</span>
                                    <span className="sp-category-count">{cat.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="sp-widget sp-categories-dropdown">
                        <h3 className="sp-widget-title">State / Location</h3>
                        <select className="sp-category-select">
                            <option>Select State</option>
                            {staticData.state.map((s, i) => <option key={i} value={s}>{s}</option>)}
                        </select>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default StandardPost;