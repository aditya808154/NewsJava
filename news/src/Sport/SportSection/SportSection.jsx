import React, { useState, useEffect } from "react"; 
import { FaClock, FaPlay, FaHeart, FaRegHeart, FaChevronLeft, FaChevronRight, FaTimes, FaCalendarAlt } from "react-icons/fa"; 
import "./SportSection.css";

const getSportCategoryColor = (category) => {
    const cat = category?.toLowerCase().replace(/\s/g, "-") || "";
    const colors = {
        cricket: { bg: '#2563eb', accent: '#3b82f6' },
        football: { bg: '#059669', accent: '#10b981' },
        tennis: { bg: '#f97316', accent: '#fb923c' },
        athletics: { bg: '#ef4444', accent: '#f87171' },
        kabaddi: { bg: '#7c3aed', accent: '#8b5cf6' },
        video: { bg: '#dc2626', accent: '#ef4444' }
    };
    return colors[cat] || { bg: '#4b5563', accent: '#6b7280' }; 
};

// --- VIDEO MODAL ---
const VideoModal = ({ videoUrl, title, onClose }) => {
    if (!videoUrl) return null;
    let finalSrc = videoUrl;
    if (videoUrl.includes("watch?v=")) finalSrc = videoUrl.replace("watch?v=", "embed/");
    else if (videoUrl.includes("youtu.be/")) finalSrc = videoUrl.replace("youtu.be/", "youtube.com/embed/");

    return (
        <div className="sp-video-modal-overlay" onClick={onClose} style={{position:'fixed', top:0, left:0, width:'100%', height:'100%', background:'rgba(0,0,0,0.95)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center'}}>
            <div className="sp-video-modal-content" onClick={e => e.stopPropagation()} style={{width:'95%', maxWidth:'900px', position:'relative', background:'#000', borderRadius:'15px', padding:'10px', boxShadow: '0 0 30px rgba(0,0,0,0.5)'}}>
                
                <button onClick={onClose} style={{position:'absolute', top:'15px', right:'15px', background:'white', border:'none', borderRadius:'50%', width:'35px', height:'35px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', color:'#000', fontSize:'18px', zIndex:10000, boxShadow:'0 0 10px rgba(0,0,0,0.5)'}}>
                    <FaTimes />
                </button>
                
                <div style={{overflow:'hidden', paddingBottom:'56.25%', position:'relative', height:0, borderRadius:'10px'}}>
                    <iframe style={{left:0, top:0, height:'100%', width:'100%', position:'absolute', borderRadius:'10px'}} src={`${finalSrc}?autoplay=1`} title={title} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                </div>
                <h3 style={{color:'#fff', marginTop:'15px', fontSize:'18px', padding:'0 5px'}}>{title}</h3>
            </div>
        </div>
    );
};

function SportSection() {
    const [openVideo, setOpenVideo] = useState(null); 
    const [selectedNews, setSelectedNews] = useState(null);
    const [newsData, setNewsData] = useState({ focus_story: [], major_grid: [], video_gallery: [] });
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    const [likedItems, setLikedItems] = useState([]);
    const [likeCounts, setLikeCounts] = useState({});

    const API_URL = "http://localhost:8080/api/sport-news/layout";

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                const focus = Array.isArray(data.focus_story) ? [...data.focus_story].reverse() : (data.focus_story ? [data.focus_story] : []);
                const major = (data.major_grid || []).reverse();
                const videos = (data.video_gallery || []).reverse();

                setNewsData({ focus_story: focus, major_grid: major, video_gallery: videos });

                const counts = {};
                [...focus, ...major, ...videos].forEach(item => {
                    counts[item.id] = Math.floor(Math.random() * 100) + 10;
                });
                setLikeCounts(counts);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    const toggleLike = (e, id) => {
        e.stopPropagation();
        const isLiked = likedItems.includes(id);
        if (isLiked) {
            setLikedItems(likedItems.filter(i => i !== id));
            setLikeCounts({ ...likeCounts, [id]: likeCounts[id] - 1 });
        } else {
            setLikedItems([...likedItems, id]);
            setLikeCounts({ ...likeCounts, [id]: likeCounts[id] + 1 });
        }
    };

    const nextSlide = () => setCurrentSlide((prev) => (prev === newsData.focus_story.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? newsData.focus_story.length - 1 : prev - 1));

    if (loading) return <div className="sp-loading">Loading...</div>;

    return (
        <div className="sp-container">
            <VideoModal videoUrl={openVideo?.videoUrl} title={openVideo?.title} onClose={() => setOpenVideo(null)} />

            <header className="sp-main-header">
                <span className="sp-category-title" onClick={() => setSelectedNews(null)} style={{cursor:'pointer'}}>Sports World</span>
                <p className="sp-tagline">Latest Global Sports Updates</p>
            </header>

            <div className="sp-main-layout">
                {/* FOCUS SLIDER */}
                <div className="sp-focus-wrapper" style={{position:'relative', overflow:'hidden', borderRadius:'15px', background:'#000'}}>
                    {newsData.focus_story.map((story, index) => (
                        <div key={story.id} 
                             style={{ display: index === currentSlide ? 'block' : 'none', backgroundImage: `linear-gradient(to bottom, transparent, rgba(0,0,0,0.9)), url(${story.imageUrl})`, height: '480px', backgroundSize:'cover', backgroundPosition:'center', cursor:'pointer' }}
                             onClick={() => setSelectedNews(story)}>
                            <div className="sp-focus-overlay" style={{position:'absolute', bottom:'30px', left:'30px', right:'30px'}}>
                                <span className="sp-category-tag" style={{ backgroundColor: getSportCategoryColor(story.category).bg, padding:'5px 15px', borderRadius:'5px', fontSize:'12px', textTransform:'uppercase', fontWeight:'bold' }}>{story.category}</span>
                                <h2 style={{color:'#fff', fontSize:'32px', margin:'15px 0', lineHeight:'1.2'}}>{story.title}</h2>
                                <div style={{display:'flex', alignItems:'center', gap:'15px', color:'#ccc', fontSize:'13px'}}>
                                    <span style={{display:'flex', alignItems:'center', gap:'5px'}}><FaCalendarAlt /> {story.date || "23 Dec 2025"}</span>
                                    <span style={{display:'flex', alignItems:'center', gap:'5px'}}><FaClock /> {story.time}</span>
                                    <div onClick={(e) => toggleLike(e, story.id)} style={{display:'flex', alignItems:'center', gap:'5px', cursor:'pointer', color: likedItems.includes(story.id) ? '#ff4757' : '#fff'}}>
                                        {likedItems.includes(story.id) ? <FaHeart /> : <FaRegHeart />}
                                        <span style={{fontWeight:'bold'}}>{likeCounts[story.id]}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {newsData.focus_story.length > 1 && (
                        <div className="slider-nav">
                            <button onClick={prevSlide} style={{position:'absolute', left:'15px', top:'50%', transform:'translateY(-50%)', background:'rgba(255,255,255,0.2)', border:'none', color:'#fff', width:'40px', height:'40px', borderRadius:'50%', cursor:'pointer'}}><FaChevronLeft /></button>
                            <button onClick={nextSlide} style={{position:'absolute', right:'15px', top:'50%', transform:'translateY(-50%)', background:'rgba(255,255,255,0.2)', border:'none', color:'#fff', width:'40px', height:'40px', borderRadius:'50%', cursor:'pointer'}}><FaChevronRight /></button>
                        </div>
                    )}
                </div>

                {/* MIDDLE GRID */}
                <div className="sp-middle-section">
                    <h2 className="sp-section-heading">Major Updates</h2>
                    <div className="sp-major-grid-2x2">
                        {newsData.major_grid.map((story) => (
                            <div key={story.id} className="sp-major-grid-card" onClick={() => setSelectedNews(story)} style={{background:'#fff', borderRadius:'10px', overflow:'hidden', boxShadow:'0 4px 10px rgba(0,0,0,0.05)'}}>
                                <img src={story.imageUrl} alt="" style={{width:'100%', height:'180px', objectFit:'cover'}} />
                                <div className="sp-grid-content" style={{padding:'15px'}}>
                                    <span style={{ color: getSportCategoryColor(story.category).accent, fontWeight:'bold', fontSize:'12px' }}>{story.category}</span>
                                    <h4 style={{margin:'10px 0', fontSize:'16px', color:'#222'}}>{story.title}</h4>
                                    <div style={{display:'flex', flexWrap:'wrap', alignItems:'center', gap:'12px', color:'#777', fontSize:'11px'}}>
                                        <span style={{display:'flex', alignItems:'center', gap:'4px'}}><FaCalendarAlt /> {story.date || "23 Dec 2025"}</span>
                                        <span style={{display:'flex', alignItems:'center', gap:'4px'}}><FaClock /> {story.time}</span>
                                        <div onClick={(e) => toggleLike(e, story.id)} style={{display:'flex', alignItems:'center', gap:'4px', cursor:'pointer', color: likedItems.includes(story.id) ? '#ff4757' : '#777'}}>
                                            {likedItems.includes(story.id) ? <FaHeart /> : <FaRegHeart />}
                                            <strong>{likeCounts[story.id]}</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SIDEBAR VIDEOS */}
                <aside className="sp-video-gallery-sidebar">
                    <h2 className="sp-section-heading">📺 Latest Videos</h2>
                    <div className="sp-video-list">
                        {newsData.video_gallery.map((video) => (
                            <div key={video.id} className="sp-video-item" onClick={() => setOpenVideo(video)} style={{display:'flex', gap:'10px', marginBottom:'15px', cursor:'pointer'}}>
                                <div style={{position:'relative', width:'120px', minWidth:'120px', height:'80px', borderRadius:'8px', overflow:'hidden'}}>
                                    <img src={video.imageUrl} alt="" style={{width:'100%', height:'100%', objectFit:'cover'}} />
                                    <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)', color:'#fff'}}><FaPlay /></div>
                                </div>
                                <div>
                                    <h5 style={{fontSize:'14px', margin:'0 0 5px 0', color:'#333', lineHeight:'1.4'}}>{video.title}</h5>
                                    <div style={{display:'flex', flexDirection:'column', gap:'3px', color:'#888', fontSize:'11px'}}>
                                        <div style={{display:'flex', gap:'8px'}}>
                                            <span><FaCalendarAlt /> {video.date || "23 Dec"}</span>
                                            <span><FaClock /> {video.time}</span>
                                        </div>
                                        <div onClick={(e) => toggleLike(e, video.id)} style={{display:'flex', alignItems:'center', gap:'4px', color: likedItems.includes(video.id) ? '#ff4757' : '#888'}}>
                                            {likedItems.includes(video.id) ? <FaHeart /> : <FaRegHeart />} {likeCounts[video.id]}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default SportSection;