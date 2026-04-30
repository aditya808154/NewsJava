import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import './AudioPostDetail.css';

const AudioPlayer = ({ audioUrl }) => {
    if (!audioUrl) return <div className="ap-audio-player-wrapper"><p className="ap-no-audio">Select an episode to play.</p></div>;
    return (
        <div className="ap-audio-player-wrapper">
            <audio className="ap-audio-element" src={audioUrl} controls autoPlay key={audioUrl}>
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

const AudioPostDetail = () => {
    const { id } = useParams();
    const API_BASE = "http://localhost:8080/api/audio-podcast";

    const [audioPost, setAudioPost] = useState(null);
    const [allPodcasts, setAllPodcasts] = useState([]);
    const [sidebarData, setSidebarData] = useState({ categories: [] });
    const [loading, setLoading] = useState(true);
    const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
    const [showAllEpisodes, setShowAllEpisodes] = useState(false);

    // ⭐ Comments State
    const [comments, setComments] = useState([
        { id: 1, author: "Aman Sharma", date: "Dec 20, 2025", text: "Very informative podcast, loved the interest rates outlook!" }
    ]);
    const [newComment, setNewComment] = useState({ name: "", email: "", text: "" });

    useEffect(() => { fetchLayout(); }, []);

    const fetchLayout = async () => {
        try {
            const res = await fetch(`${API_BASE}/layout`);
            const data = await res.json();
            const reversedPodcasts = [...(data.main_podcasts || [])].reverse();
            setAllPodcasts(reversedPodcasts);
            setSidebarData({ categories: data.sidebar?.categories || [] });
            updateActivePodcast(reversedPodcasts[0]);
            setLoading(false);
        } catch (err) { console.error(err); setLoading(false); }
    };

    const updateActivePodcast = (selected) => {
        if (selected) {
            const episodes = selected.audioListData ? JSON.parse(selected.audioListData).reverse() : [];
            setAudioPost({ ...selected, audioList: episodes });
            setCurrentAudioIndex(0);
            setShowAllEpisodes(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // ⭐ Handle Comment Submit
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!newComment.name || !newComment.text) return;

        const timestamp = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        const commentObj = {
            id: Date.now(),
            author: newComment.name,
            date: timestamp,
            text: newComment.text
        };

        setComments([commentObj, ...comments]); // Naya comment sabse upar
        setNewComment({ name: "", email: "", text: "" }); // Reset form
        alert("Comment posted successfully!");
    };

    const currentAudioData = useMemo(() => audioPost?.audioList?.[currentAudioIndex], [audioPost, currentAudioIndex]);
    const displayedEpisodes = useMemo(() => showAllEpisodes ? audioPost?.audioList : audioPost?.audioList?.slice(0, 4), [audioPost, showAllEpisodes]);

    if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>;

    return (
        <div className="ap-page-container">
            <div className="ap-main-layout">
                {/* --- LEFT SECTION --- */}
                <div className="ap-main-content">
                    <h1 className="ap-post-title">{currentAudioData?.title || audioPost.baseTitle}</h1>
                    <div className="ap-post-meta">
                        <span><i className="fas fa-calendar-alt"></i> {audioPost.date}</span>
                        <span style={{ margin: '0 15px' }}>|</span>
                        <span><i className="fas fa-clock"></i> {audioPost.time}</span>
                    </div>

                    <AudioPlayer audioUrl={currentAudioData?.audioUrl} />

                    {/* Episodes List */}
                    <div className="ap-thumbnail-list-container" style={{ marginTop: '20px' }}>
                        <h3 style={{ marginBottom: '15px' }}>Series Episodes:</h3>
                        {displayedEpisodes?.map((ep, idx) => (
                            <div key={idx} onClick={() => setCurrentAudioIndex(idx)} style={{ ...episodeCard, background: currentAudioIndex === idx ? '#f0f7ff' : '#fff' }}>
                                <img src={ep.thumbnail} style={thumbStyle} alt="thumb" />
                                <p style={{ margin: 0, fontWeight: 'bold' }}>{ep.title}</p>
                            </div>
                        ))}
                        {audioPost.audioList.length > 4 && (
                            <button onClick={() => setShowAllEpisodes(!showAllEpisodes)} style={btnSeeMore}>
                                {showAllEpisodes ? 'Show Less' : `See More (${audioPost.audioList.length - 4})`}
                            </button>
                        )}
                    </div>

                    <div className="ap-post-text" style={{ marginTop: '30px' }} dangerouslySetInnerHTML={{ __html: currentAudioData?.content }} />

                    {/* --- ⭐ COMMENTS SECTION --- */}
                    <div className="ap-comments-section" style={{ marginTop: '50px', borderTop: '1px solid #eee', paddingTop: '30px' }}>
                        <h4 style={{ marginBottom: '20px' }}>{comments.length} Comments on this Episode</h4>
                        
                        {comments.map(c => (
                            <div key={c.id} style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                                <div style={avatarStyle}>{c.author[0]}</div>
                                <div>
                                    <div style={{ fontWeight: 'bold' }}>{c.author} <span style={dateStyle}>{c.date}</span></div>
                                    <p style={{ margin: '5px 0', color: '#555' }}>{c.text}</p>
                                </div>
                            </div>
                        ))}

                        <div style={formBoxStyle}>
                            <h3>Leave a Reply</h3>
                            <form onSubmit={handleCommentSubmit}>
                                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                    <input type="text" placeholder="Name *" style={inputStyle} value={newComment.name} onChange={(e) => setNewComment({ ...newComment, name: e.target.value })} required />
                                    <input type="email" placeholder="Email *" style={inputStyle} value={newComment.email} onChange={(e) => setNewComment({ ...newComment, email: e.target.value })} required />
                                </div>
                                <textarea placeholder="Comment *" rows="4" style={inputStyle} value={newComment.text} onChange={(e) => setNewComment({ ...newComment, text: e.target.value })} required></textarea>
                                <button type="submit" style={btnSubmitStyle}>Post Comment</button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT SIDEBAR --- */}
                <aside className="ap-sidebar">
                    <div className="ap-widget">
                        <h3 className="ap-widget-title">Recent Podcasts</h3>
                        {allPodcasts.slice(0, 5).map((post) => (
                            <div key={post.id} onClick={() => updateActivePodcast(post)} style={{ ...sidebarItem, background: audioPost.id === post.id ? '#f9f9f9' : 'transparent' }}>
                                <img src={post.imageUrl} style={{ width: '50px', height: '50px', borderRadius: '5px' }} />
                                <div>
                                    <h5 style={{ margin: 0, fontSize: '13px', color: audioPost.id === post.id ? '#4361ee' : '#333' }}>{post.baseTitle}</h5>
                                    <span style={{ fontSize: '11px', color: '#999' }}>{post.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    );
};

// --- INLINE STYLES ---
const episodeCard = { display: 'flex', alignItems: 'center', gap: '15px', padding: '10px', border: '1px solid #eee', borderRadius: '10px', cursor: 'pointer', marginBottom: '10px' };
const thumbStyle = { width: '60px', height: '45px', objectFit: 'cover', borderRadius: '5px' };
const btnSeeMore = { marginTop: '10px', padding: '10px', backgroundColor: '#4361ee', color: 'white', border: 'none', borderRadius: '5px', width: '100%', cursor: 'pointer' };
const avatarStyle = { width: '45px', height: '45px', background: '#4361ee', color: '#fff', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' };
const dateStyle = { fontSize: '11px', color: '#999', fontWeight: 'normal', marginLeft: '10px' };
const formBoxStyle = { background: '#f9f9f9', padding: '25px', borderRadius: '10px', marginTop: '30px' };
const inputStyle = { width: '100%', padding: '12px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '14px' };
const btnSubmitStyle = { marginTop: '10px', padding: '12px 25px', background: '#333', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
const sidebarItem = { display: 'flex', gap: '10px', marginBottom: '15px', cursor: 'pointer', padding: '8px', borderRadius: '8px', borderBottom: '1px solid #eee' };

export default AudioPostDetail;