import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './GalleryPost.css'; 

const GallerySlider = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const totalImages = images?.length || 0;

    useEffect(() => {
        setCurrentImageIndex(0);
    }, [images]);

    const nextSlide = () => setCurrentImageIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentImageIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
    const goToSlide = (index) => setCurrentImageIndex(index);

    if (!images || images.length === 0) return null;

    return (
        <div className="gp-gallery-slider-wrapper">
            <div className="gp-slider-main-display" style={{ backgroundImage: `url(${images[currentImageIndex]})` }}>
                <div className="gp-slider-controls-overlay">
                    <i className="fas fa-chevron-left gp-slider-arrow" onClick={prevSlide}></i>
                    <i className="fas fa-chevron-right gp-slider-arrow" onClick={nextSlide}></i>
                </div>
            </div>
            <div className="gp-slider-thumbs-nav">
                {images.map((img, index) => (
                    <div 
                        key={index} 
                        className={`gp-slider-thumb-item ${index === currentImageIndex ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${img})` }}
                        onClick={() => goToSlide(index)} 
                    ></div>
                ))}
            </div>
        </div>
    );
};

const GalleryPost = () => {
    const [mainPosts, setMainPosts] = useState([]);
    const [sidebarPosts, setSidebarPosts] = useState([]);
    const [currentPost, setCurrentPost] = useState(null);
    const [originalPost, setOriginalPost] = useState(null); 
    const [isViewingRecent, setIsViewingRecent] = useState(false);
    const [commentData, setCommentData] = useState({ author: "Admin", text: "", date: "" });
    const [activeDotIndex, setActiveDotIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    // Like/Unlike Counters State
    const [likeCount, setLikeCount] = useState(125); 
    const [unlikeCount, setUnlikeCount] = useState(10); 
    const [userAction, setUserAction] = useState(null); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/gallery-post/layout");
                const data = await response.json();
                
                setMainPosts(data.main_post || []);
                setSidebarPosts(data.recent_posts || []);
                setCommentData(data.comment || { author: "Admin", text: "No comments yet.", date: "" });
                
                if (data.main_post && data.main_post.length > 0) {
                    setCurrentPost(data.main_post[0]);
                    setOriginalPost(data.main_post[0]);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching gallery data:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handlePostSwitch = (newPost, index = -1) => {
        setCurrentPost({
            ...newPost,
            galleryImages: newPost.galleryImages?.length > 0 
                ? newPost.galleryImages 
                : [newPost.imageUrl || "https://via.placeholder.com/800x500"],
            content: newPost.content || "<p>Full updates available soon.</p>",
            tags: newPost.tags || [],
            time: newPost.time || "10:00 AM",
            readTime: newPost.readTime || "5 min read",
            commentsCount: newPost.commentsCount || 0
        });

        if (index !== -1) {
            setActiveDotIndex(index);
            setIsViewingRecent(false);
        } else {
            setIsViewingRecent(true);
        }

        setUserAction(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLike = () => {
        if (userAction === 'liked') {
            setUserAction(null);
            setLikeCount(prev => prev - 1);
        } else {
            if (userAction === 'unliked') setUnlikeCount(prev => prev - 1);
            setUserAction('liked');
            setLikeCount(prev => prev + 1);
        }
    };

    const handleUnlike = () => {
        if (userAction === 'unliked') {
            setUserAction(null);
            setUnlikeCount(prev => prev - 1);
        } else {
            if (userAction === 'liked') setLikeCount(prev => prev - 1);
            setUserAction('unliked');
            setUnlikeCount(prev => prev + 1);
        }
    };

    if (loading || !currentPost) {
        return <div className="gp-loader">Loading Content...</div>;
    }

    return (
        <div className="gp-page-container">
            <div className="gp-main-layout">
                <div className="gp-main-content">
                    
                    {isViewingRecent && (
                        <button className="gp-back-btn" onClick={() => handlePostSwitch(originalPost, 0)}>
                            <i className="fas fa-arrow-left"></i> Back to Main
                        </button>
                    )}

                    <h1 className="gp-post-title">{currentPost.title}</h1>

                    <div className="gp-post-meta">
                        <span className="gp-meta-item"><i className="fas fa-calendar-alt"></i> {currentPost.date}</span>
                        <span className="gp-meta-separator">|</span>
                        <span className="gp-meta-item"><i className="fas fa-clock"></i> {currentPost.time}</span>
                        <span className="gp-meta-separator">|</span>
                        <span className="gp-meta-item"><i className="fas fa-stopwatch"></i> {currentPost.readTime}</span>
                    </div>
                    
                    <GallerySlider images={currentPost.galleryImages} />

                    {/* Dot Slider - Image ke theek neeche */}
                    <div className="gp-main-card-dots">
                        {mainPosts.map((post, idx) => (
                            <span 
                                key={post.id || idx} 
                                className={`gp-card-dot ${idx === activeDotIndex ? 'active' : ''}`}
                                onClick={() => handlePostSwitch(post, idx)}
                            ></span>
                        ))}
                    </div>

                    {/* Like Unlike Section with Counter Numbers */}
                    <div className="gp-interaction-bar">
                        <button className={`gp-like-btn ${userAction === 'liked' ? 'liked' : ''}`} onClick={handleLike}>
                            <i className="fas fa-thumbs-up"></i> 
                            <span className="gp-count">{likeCount}</span>
                        </button>
                        <button className={`gp-unlike-btn ${userAction === 'unliked' ? 'unliked' : ''}`} onClick={handleUnlike}>
                            <i className="fas fa-thumbs-down"></i> 
                            <span className="gp-count">{unlikeCount}</span>
                        </button>
                    </div>

                    <div className="gp-post-text" dangerouslySetInnerHTML={{ __html: currentPost.content }} />
                    
                    <div className="gp-post-footer">
                        <div className="gp-tags-list">
                            <span className="gp-tag-label">Tags:</span>
                            {currentPost.tags && currentPost.tags.map((tag, index) => (
                                <Link key={index} to={`/tag/${tag}`} className="gp-tag-item">{tag}</Link>
                            ))}
                        </div>
                    </div>

                    <div className="gp-comments-section">
                        <h4 className="gp-comments-count">{currentPost.commentsCount} Comments</h4>
                        <div className="gp-comment-item">
                            <div className="gp-comment-avatar">{commentData.author ? commentData.author[0] : "A"}</div>
                            <div className="gp-comment-body">
                                <div className="gp-comment-meta">
                                    <span className="gp-comment-author">{commentData.author}</span>
                                    <span className="gp-comment-date">{commentData.date}</span>
                                </div>
                                <p className="gp-comment-text">{commentData.text}</p>
                            </div>
                        </div>

                        <div className="gp-comment-form-container">
                            <h3>Leave a Reply</h3>
                            <form className="gp-comment-form" onSubmit={(e) => e.preventDefault()}>
                                <textarea placeholder="Write your comment here..." rows="5"></textarea>
                                <div className="gp-form-row">
                                    <input type="text" placeholder="Name*" />
                                    <input type="email" placeholder="Email*" />
                                </div>
                                <button type="submit" className="gp-submit-btn">Post Comment</button>
                            </form>
                        </div>
                    </div>
                </div>

                <aside className="gp-sidebar">
                    <div className="gp-widget gp-recent-widget">
                        <h3 className="gp-widget-title">Recent Posts</h3>
                        <ul className="gp-recent-posts-list">
                            {[...sidebarPosts].reverse().map(post => {
                                const sideImg = post.imageUrl || (post.galleryImages && post.galleryImages[0]) || "https://via.placeholder.com/150";
                                return (
                                    <li key={post.id} className="gp-recent-post-item" onClick={() => handlePostSwitch(post)} style={{cursor: 'pointer'}}>
                                        <img src={sideImg} alt="" className="gp-recent-post-thumb" />
                                        <div className="gp-recent-post-details">
                                            <p className="gp-recent-post-title">{post.title}</p>
                                            <span className="gp-recent-post-date">{post.date}</span>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default GalleryPost;