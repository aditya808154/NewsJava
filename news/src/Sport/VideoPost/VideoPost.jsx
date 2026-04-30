import React, { useState, useEffect, useMemo } from 'react'; 
import { Link } from 'react-router-dom';
import './VideoPost.css'; 

// Local fallback data
import { videoPostData as postData } from './VideoPostData'; 

// --- UPDATED VIDEO PLAYER (Pehele Image dikhegi) ---
const VideoPlayer = ({ videoId, thumbnail }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    // Jab video change ho (sidebar se), to reset karke wapas image dikhao
    useEffect(() => {
        setIsPlaying(false);
    }, [videoId]);

    if (!videoId) return <div className="vp-video-player-wrapper"><p className="vp-no-video">Select a video to play.</p></div>;

    const isLocalVideo = typeof videoId === 'string' && (videoId.includes('.mp4') || videoId.startsWith('/static') || videoId.startsWith('blob:')); 

    const getEmbedUrl = (url) => {
        if (isLocalVideo) return url;
        
        let embedUrl = "";
        if (url.includes('watch?v=')) {
            const vid = url.split('v=')[1].split('&')[0];
            embedUrl = `https://www.youtube.com/embed/${vid}`;
        } else if (url.includes('youtube.com/shorts/')) {
            const vid = url.split('/shorts/')[1].split('?')[0];
            embedUrl = `https://www.youtube.com/embed/${vid}`;
        } else if (url.includes('youtu.be/')) {
            const vid = url.split('youtu.be/')[1].split('?')[0];
            embedUrl = `https://www.youtube.com/embed/${vid}`;
        } else if (url.includes('youtube.com/embed/')) {
            embedUrl = url;
        } else {
            embedUrl = `https://www.youtube.com/embed/${url}`;
        }

        // Click karne ke baad auto-play ho isliye ?autoplay=1 lagaya hai
        return `${embedUrl}${embedUrl.includes('?') ? '&' : '?'}autoplay=1&rel=0`;
    };

    return (
        <div className="vp-video-player-wrapper" style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px', background: '#000', minHeight: '350px' }}>
            {!isPlaying ? (
                // --- THUMBNAIL OVERLAY ---
                <div 
                    className="vp-video-thumbnail-container" 
                    onClick={() => setIsPlaying(true)} 
                    style={{ cursor: 'pointer', position: 'relative', width: '100%', height: '350px' }}
                >
                    <img 
                        src={thumbnail} 
                        alt="Video Thumbnail" 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        onError={(e) => { e.target.src = "https://via.placeholder.com/800x450?text=Click+to+Play"; }}
                    />
                    {/* Play Button Icon */}
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        background: 'rgba(255, 0, 0, 0.8)', color: '#fff', padding: '15px 25px', borderRadius: '50%',
                        fontSize: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <i className="fas fa-play"></i>
                    </div>
                </div>
            ) : (
                // --- ACTUAL VIDEO ---
                isLocalVideo ? (
                    <video className="vp-youtube-player" src={videoId} controls autoPlay style={{ width: '100%', height: '350px' }}>
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <iframe
                        className="vp-youtube-player"
                        src={getEmbedUrl(videoId)} 
                        title="YouTube video player"
                        style={{ width: '100%', height: '350px', border: 'none' }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        key={videoId} 
                    ></iframe>
                )
            )}
        </div>
    );
};

const VideoPost = () => {
    const [apiData, setApiData] = useState([]); 
    const [liked, setLiked] = useState(false);
    const [unliked, setUnliked] = useState(false);
    const [selectedSidebarPost, setSelectedSidebarPost] = useState(null);

    // --- API FETCH LOGIC ---
    useEffect(() => {
        fetch("http://localhost:8080/api/videos/popular")
            .then(res => res.json())
            .then(data => {
                setApiData(data.videoData || []);
            })
            .catch(err => console.log("API Error", err));
    }, []);

    const handleSidebarClick = (post) => {
        setSelectedSidebarPost(post);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentDisplayData = useMemo(() => {
        // 1. Agar sidebar se select kiya hai
        if (selectedSidebarPost) {
            return {
                title: selectedSidebarPost.title,
                id: selectedSidebarPost.videoUrl, 
                thumbnail: selectedSidebarPost.thumbnail, // Thumbnail add kiya
                content: selectedSidebarPost.description || `<p>No description available.</p>`,
                tags: [selectedSidebarPost.category || "General"],
                commentsCount: selectedSidebarPost.comments,
                date: selectedSidebarPost.date,
                category: selectedSidebarPost.category
            };
        }
        
        // 2. Default: Last element of API data
        if (apiData.length > 0) {
            const lastVideo = apiData[apiData.length - 1];
            return {
                ...lastVideo,
                id: lastVideo.videoUrl,
                thumbnail: lastVideo.thumbnail, // Thumbnail add kiya
                content: lastVideo.description,
                tags: [lastVideo.category],
                commentsCount: lastVideo.comments,
            };
        }

        // 3. Fallback
        return { title: "Loading...", id: "", thumbnail: "", content: "", tags: [], commentsCount: 0 };
    }, [selectedSidebarPost, apiData]);

    return (
        <div className="vp-page-container">
            <div className="vp-main-layout">
                <div className="vp-main-content">
                    
                    {selectedSidebarPost && (
                        <button onClick={() => setSelectedSidebarPost(null)} className="vp-back-btn" style={{ marginBottom: '15px', cursor: 'pointer', padding: '8px 20px', backgroundColor: '#f0f0f0', border: '1px solid #ddd', borderRadius: '5px', fontWeight: 'bold' }}>
                            ← Back to Latest
                        </button>
                    )}

                    <h1 className="vp-post-title">{currentDisplayData.title}</h1>
                    <div className="vp-post-meta">
                        <span className="vp-meta-item"><i className="fas fa-calendar-alt"></i> {currentDisplayData.date}</span>
                        <span className="vp-meta-separator">|</span>
                        <span className="vp-meta-item"><i className="fas fa-video"></i> {currentDisplayData.category || 'Video'}</span>
                    </div>
                    
                    {/* Yaha ab hum thumbnail bhi pass kar rahe hain */}
                    <VideoPlayer videoId={currentDisplayData.id} thumbnail={currentDisplayData.thumbnail} />

                    <div className="vp-interaction-bar" style={{ display: 'flex', gap: '20px', margin: '15px 0', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                        <button onClick={() => { setLiked(!liked); setUnliked(false); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: liked ? '#3498db' : '#666', fontSize: '18px' }}>
                            <i className="fas fa-thumbs-up"></i> {liked ? 'Liked' : 'Like'}
                        </button>
                        <button onClick={() => { setUnliked(!unliked); setLiked(false); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: unliked ? '#e74c3c' : '#666', fontSize: '18px' }}>
                            <i className="fas fa-thumbs-down"></i> {unliked ? 'Unliked' : 'Unlike'}
                        </button>
                    </div>

                    <div className="vp-post-text" style={{ marginTop: '20px' }} dangerouslySetInnerHTML={{ __html: currentDisplayData.content }} />
                    
                    <div className="vp-post-footer">
                        <div className="vp-social-share">
                            <i className="vp-social-icon fab fa-facebook-f"></i>
                            <i className="vp-social-icon fas fa-envelope"></i>
                            <i className="vp-social-icon fab fa-twitter"></i>
                            <i className="vp-social-icon fab fa-whatsapp"></i>
                        </div>
                        <div className="vp-tags-list">
                            <span className="vp-tag-label">Tags:</span>
                            {(Array.isArray(currentDisplayData.tags) ? currentDisplayData.tags : []).map((tag, index) => (
                                <Link key={index} to="#" className="vp-tag-item">{tag}</Link>
                            ))}
                        </div>
                    </div>

                    <div className="vp-comments-section">
                        <h4 className="vp-comments-count">{currentDisplayData.commentsCount} comments</h4>
                        <div className="vp-reply-form">
                            <h3>Leave a Reply</h3>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <textarea placeholder="Comment *" rows="6" required></textarea>
                                <button type="submit" className="vp-post-comment-btn">Post Comment</button>
                            </form>
                        </div>
                    </div>
                </div>

                <aside className="vp-sidebar">
                    <div className="vp-widget vp-recent-widget">
                        <h3 className="vp-widget-title">Latest Videos</h3>
                        <ul className="vp-recent-posts-list" style={{ maxHeight: '450px', overflowY: 'auto', paddingRight: '5px' }}>
                            {[...apiData].reverse().map(post => (
                                <li key={post.id} className="vp-recent-post-item" onClick={() => handleSidebarClick(post)} style={{cursor: 'pointer'}}>
                                    <div className="vp-recent-post-link-wrapper">
                                        <img src={post.thumbnail} alt={post.title} className="vp-recent-post-thumb" />
                                        <div className="vp-recent-post-details">
                                            <p className="vp-recent-post-title">{post.title}</p>
                                            <span className="vp-recent-post-date">{post.date}</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="vp-widget vp-tag-cloud-widget">
                        <h3 className="vp-widget-title">Popular Tags</h3>
                        <div className="vp-tag-cloud">
                             <Link to="#" className="vp-cloud-tag-item">Trending</Link>
                             <Link to="#" className="vp-cloud-tag-item">New</Link>
                             <Link to="#" className="vp-cloud-tag-item">Video</Link>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default VideoPost;