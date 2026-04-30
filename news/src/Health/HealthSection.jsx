import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart, FaCalendarAlt } from "react-icons/fa"; 
import "./HealthSection.css";

const getHealthCategoryColor = (category) => {
  const cat = category?.toLowerCase().replace(/\s/g, "-") || "";
  if (cat === "mental-health") return { bg: "#8b5cf6", text: "#ffffff" };
  if (cat === "nutrition") return { bg: "#22c55e", text: "#ffffff" };
  if (cat === "research") return { bg: "#f97316", text: "#ffffff" };
  if (cat === "fitness") return { bg: "#06b6d4", text: "#ffffff" };
  if (cat === "public-health") return { bg: "#ef4444", text: "#ffffff" };
  return { bg: "#4b5563", text: "#ffffff" };
};

// --- Helper: Detail News Layout ---
const NewsDetailView = ({ news, onBack, isLiked, onLike, count }) => (
  <div className="hs-detail-view">
    <button className="hs-back-btn" onClick={onBack}>← Back to News</button>
    <div className="hs-detail-header">
      <img src={news.imageUrl || "https://via.placeholder.com/800x400"} alt="" className="hs-detail-img" />
      <h1 className="hs-detail-title">{news.title}</h1>
      <div className="hs-detail-meta" style={{display:'flex', alignItems:'center', gap:'15px', flexWrap:'wrap'}}>
        <span className="hs-detail-cat">{news.category}</span>
        <span className="hs-detail-time"><FaCalendarAlt /> {news.date}</span>
        <div onClick={() => onLike(news.id)} style={{display:'flex', alignItems:'center', gap:'5px', cursor:'pointer', color: isLiked ? '#ef4444' : '#666'}}>
            {isLiked ? <FaHeart /> : <FaRegHeart />}
            <span style={{fontWeight:'bold', fontSize:'14px'}}>{count}</span>
        </div>
      </div>
    </div>
    <div className="hs-detail-body">
      <p className="hs-detail-summary">{news.summary}</p>
      <p>Health and wellness experts recommend staying updated with such medical advancements to lead a better life.</p>
    </div>
  </div>
);

const LeadStoryCard = ({ story, onOpen, isLiked, onLike, count }) => {
  const colors = getHealthCategoryColor(story.category);
  return (
    <div className="hs-lead-card">
      <img src={story.imageUrl} alt={story.title} className="hs-card-image" onClick={() => onOpen(story)} style={{cursor: 'pointer'}} />
      <div className="hs-card-content">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px'}}>
            <span className="hs-category-tag" style={{ backgroundColor: colors.bg, color: colors.text }}>{story.category}</span>
            <div style={{display:'flex', alignItems:'center', gap:'8px', color: '#666', fontSize:'13px'}}>
                <span style={{display:'flex', alignItems:'center', gap:'4px'}}><FaCalendarAlt /> {story.date}</span>
                <div onClick={() => onLike(story.id)} style={{display:'flex', alignItems:'center', gap:'4px', cursor:'pointer', color: isLiked ? '#ef4444' : '#666'}}>
                    {isLiked ? <FaHeart /> : <FaRegHeart />}
                    <span style={{fontWeight:'bold'}}>{count}</span>
                </div>
            </div>
        </div>
        <h3 onClick={() => onOpen(story)} style={{cursor: 'pointer'}}>{story.title}</h3>
        <p className="hs-summary">{story.summary}</p>
        <span className="hs-time">{story.time}</span>
      </div>
    </div>
  );
};

const GridStoryCard = ({ story, onOpen, isLiked, onLike, count }) => {
  const colors = getHealthCategoryColor(story.category);
  return (
    <div className="hs-grid-card">
      <div style={{position:'relative'}}>
        <img src={story.imageUrl} alt={story.title} className="hs-grid-image" onClick={() => onOpen(story)} style={{cursor: 'pointer'}} />
      </div>
      <div className="hs-card-content">
        <span className="hs-grid-category-tag" style={{ color: colors.bg }}>{story.category}</span>
        <h4 onClick={() => onOpen(story)} style={{cursor: 'pointer'}}>{story.title}</h4>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'10px', fontSize:'12px', color:'#777'}}>
            <span><FaCalendarAlt /> {story.date}</span>
            <div onClick={() => onLike(story.id)} style={{display:'flex', alignItems:'center', gap:'4px', cursor:'pointer', color: isLiked ? '#ef4444' : '#666'}}>
                {isLiked ? <FaHeart /> : <FaRegHeart />}
                <span style={{fontWeight:'bold'}}>{count}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

const MiniStoryLink = ({ story, onOpen }) => (
  <div className="hs-mini-story" onClick={() => onOpen(story)} style={{cursor: 'pointer'}}>
    <p className="hs-mini-title">{story.title}</p>
    <span className="hs-mini-time"><FaCalendarAlt /> {story.date} • {story.time}</span>
  </div>
);

function HealthSection() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [newsData, setNewsData] = useState({ lead_stories: [], grid_stories: [], mini_stories: [] });
  const [loading, setLoading] = useState(true);
  
  // Like and Count State
  const [likedItems, setLikedItems] = useState([]); 
  const [likeCounts, setLikeCounts] = useState({}); 

  const [leadIndex, setLeadIndex] = useState(0);
  const [gridIndex, setGridIndex] = useState(0);
  const [showAllMini, setShowAllMini] = useState(false);

  const fetchHealthNews = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/health-news/layout");
      if (response.ok) {
        const data = await response.json();
        setNewsData({
          lead_stories: (data.lead_stories || []).reverse(),
          grid_stories: (data.grid_stories || []).reverse(),
          mini_stories: (data.mini_stories || []).reverse()
        });

        // Initialize random like counts (ya backend se aa rahe hain toh wo use karein)
        const initialCounts = {};
        [...(data.lead_stories || []), ...(data.grid_stories || [])].forEach(item => {
          initialCounts[item.id] = Math.floor(Math.random() * 50) + 10; 
        });
        setLikeCounts(initialCounts);
      }
    } catch (error) { console.error("Error:", error); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchHealthNews(); }, []);

  const toggleLike = (id) => {
    const alreadyLiked = likedItems.includes(id);
    setLikedItems(prev => alreadyLiked ? prev.filter(item => item !== id) : [...prev, id]);
    
    // Update local count
    setLikeCounts(prev => ({
        ...prev,
        [id]: alreadyLiked ? prev[id] - 1 : prev[id] + 1
    }));
  };

  const nextLead = () => { if (leadIndex + 2 < newsData.lead_stories.length) setLeadIndex(leadIndex + 2); };
  const prevLead = () => { if (leadIndex - 2 >= 0) setLeadIndex(leadIndex - 2); };

  const nextGrid = () => { if (gridIndex + 6 < newsData.grid_stories.length) setGridIndex(gridIndex + 6); };
  const prevGrid = () => { if (gridIndex - 6 >= 0) setGridIndex(gridIndex - 6); };

  const handleOpenNews = (news) => {
    setSelectedNews(news);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return <div className="hs-container"><p>Loading...</p></div>;

  return (
    <div className="hs-container">
      <header className="hs-main-header">
        <span className="hs-category-title" onClick={() => setSelectedNews(null)}>Health & Wellness</span>
        <p className="hs-tagline">Latest scientific updates for good health</p>
      </header>

      {selectedNews ? (
        <NewsDetailView 
            news={selectedNews} 
            onBack={() => setSelectedNews(null)} 
            isLiked={likedItems.includes(selectedNews.id)}
            onLike={toggleLike}
            count={likeCounts[selectedNews.id] || 0}
        />
      ) : (
        <div className="hs-main-layout">
          <div className="hs-lead-section">
            <div className="hs-section-header">
              <h2 className="hs-section-heading hs-highlight-heading">Top Stories</h2>
              <div className="hs-nav-btns">
                <button onClick={prevLead} disabled={leadIndex === 0}><FaChevronLeft /></button>
                <button onClick={nextLead} disabled={leadIndex + 2 >= newsData.lead_stories.length}><FaChevronRight /></button>
              </div>
            </div>
            {newsData.lead_stories?.slice(leadIndex, leadIndex + 2).map((story) => (
              <LeadStoryCard 
                key={story.id} 
                story={story} 
                onOpen={handleOpenNews} 
                isLiked={likedItems.includes(story.id)}
                onLike={toggleLike}
                count={likeCounts[story.id] || 0}
              />
            ))}
          </div>

          <div className="hs-grid-section">
            <div className="hs-section-header">
              <h2 className="hs-section-heading">Latest Research and Lifestyle</h2>
              <div className="hs-nav-btns">
                <button onClick={prevGrid} disabled={gridIndex === 0}><FaChevronLeft /></button>
                <button onClick={nextGrid} disabled={gridIndex + 6 >= newsData.grid_stories.length}><FaChevronRight /></button>
              </div>
            </div>
            <div className="hs-grid-3-column">
              {newsData.grid_stories?.slice(gridIndex, gridIndex + 3).map((story) => (
                <GridStoryCard 
                    key={story.id} 
                    story={story} 
                    onOpen={handleOpenNews} 
                    isLiked={likedItems.includes(story.id)}
                    onLike={toggleLike}
                    count={likeCounts[story.id] || 0}
                />
              ))}
            </div>
            <div className="hs-divider"></div>
            <div className="hs-grid-3-column">
              {newsData.grid_stories?.slice(gridIndex + 3, gridIndex + 6).map((story) => (
                <GridStoryCard 
                    key={story.id} 
                    story={story} 
                    onOpen={handleOpenNews} 
                    isLiked={likedItems.includes(story.id)}
                    onLike={toggleLike}
                    count={likeCounts[story.id] || 0}
                />
              ))}
            </div>
          </div>

          <aside className="hs-mini-stories-sidebar">
            <h2 className="hs-section-heading">Other Important News</h2>
            {(showAllMini ? newsData.mini_stories : newsData.mini_stories.slice(0, 2)).map((story) => (
              <MiniStoryLink key={story.id} story={story} onOpen={handleOpenNews} />
            ))}
            
            {newsData.mini_stories.length > 2 && (
              <button 
                className="hs-see-more-btn" 
                onClick={() => setShowAllMini(!showAllMini)}
                style={{ background: 'none', border: 'none', color: '#27ae60', fontWeight: 'bold', cursor: 'pointer', padding: '10px 0' }}
              >
                {showAllMini ? "Show Less ↑" : "See More ↓"}
              </button>
            )}

            <div className="hs-sidebar-cta">
              <p>Consult your Doctor</p>
              <Link to="/contact-us" className="hs-cta-btn">Book Appointment</Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

export default HealthSection;