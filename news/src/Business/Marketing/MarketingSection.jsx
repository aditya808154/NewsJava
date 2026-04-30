import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MarketingSection.css"; 
import { sidebarData, marketingNewsData } from "./MarketingData";

// --- Helper: Text ko chota karne ke liye ---
const truncateText = (text, limit) => {
  if (!text) return "";
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};

// --- Reusable Sidebar Components ---
const SidebarRecentPost = ({ posts, onOpenNews }) => (
  <div className="mk-sidebar-block mk-recent-posts">
    <h3 className="mk-sidebar-heading">Recent Posts</h3>
    {posts.map((post) => (
      <div key={post.id} className="mk-recent-post-item" onClick={() => onOpenNews(post)} style={{cursor:'pointer'}}>
        <img src={post.imageUrl} alt={post.title} className="mk-recent-post-image" />
        <div className="mk-post-info">
          <span className="mk-post-category">NEWS</span>
          <p className="mk-post-title">{post.title}</p>
        </div>
      </div>
    ))}
  </div>
);

const SidebarHotCategory = ({ categories }) => (
  <div className="mk-sidebar-block mk-hot-categories">
    <h3 className="mk-sidebar-heading">Hot Categories</h3>
    <ul className="mk-category-list">
      {categories.map((cat, index) => (
        <li key={index} className="mk-category-item">
          <Link to={`/Marketing/${cat.name.toLowerCase().replace(/\s/g, "-")}`}>
            {cat.name} <span className="mk-category-count">({cat.count})</span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const SocialMediaIcons = ({ links }) => (
  <div className="mk-sidebar-block mk-social-media">
    <h3 className="mk-sidebar-heading">Follow Us</h3>
    <div className="mk-social-grid">
      {links.map((link, index) => (
        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="mk-social-item" style={{ backgroundColor: link.color }}>
          <i className={link.icon}></i>
          <div className="mk-social-details">
            <span className="mk-social-count">{link.followers}</span>
            <span className="mk-social-name">{link.name}</span>
          </div>
        </a>
      ))}
    </div>
  </div>
);

// --- NewsCard Component ---
const MarketingNewsCard = ({ news, isFeature, isGrid, onOpenNews }) => {
  let cardClass = isFeature ? "mk-feature-card mk-feature-post-layout" : "mk-grid-card";
  
  const getCategoryColor = (category) => {
    const cat = category?.toLowerCase().replace(/\s/g, "-") || "";
    if (cat === "ब्रांडिंग" || cat === "टेक्नोलॉजी") return { bg: "#f97316", text: "#ffffff" };
    return { bg: "#4b5563", text: "#ffffff" };
  };
  const colors = getCategoryColor(news.category);

  return (
    <div className={`mk-news-card ${cardClass}`} onClick={() => onOpenNews(news)} style={{cursor:'pointer'}}>
      <img src={news.imageUrl} alt={news.title} className={isFeature ? "mk-feature-image" : "mk-grid-image"} />
      <div className="mk-card-content">
        {isGrid && (
          <div className="mk-grid-meta-overlay">
            <span className="mk-grid-category" style={{ backgroundColor: colors.bg, color: colors.text }}>{news.category}</span>
            <span className="mk-grid-time">{news.time}</span>
          </div>
        )}
        {isFeature && (
          <div className="mk-feature-meta-top">
            <span className="mk-meta-item"><i className="far fa-calendar-alt"></i> {news.date}</span>
            {news.author && <span className="mk-meta-item">• {news.author}</span>}
          </div>
        )}
        <div className="mk-card-title-link">
            <h3>{news.title}</h3>
        </div>
        {/* Yahan summary ko truncate (chota) kiya gaya hai */}
        <p className="mk-card-summary">{truncateText(news.summary, 120)}</p>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
function MarketingSection() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

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
  const currentPosts = marketingNewsData.grid_posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(marketingNewsData.grid_posts.length / postsPerPage);
  
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

  return (
    <div className="mk-container">
      <header className="mk-main-header">
        <span className="mk-category-tag category-marketing" onClick={closeNews} style={{cursor:'pointer'}}>
          मार्केटिंग
        </span>
      </header>

      {selectedNews ? (
        /* --- FULL NEWS VIEW (Jab click karenge tab poori summary dikhegi) --- */
        <div className="mk-full-width-layout">
           <div className="mk-news-detail-view">
              <div className="mk-back-btn-wrapper">
                <button className="mk-back-btn" onClick={closeNews}>← वापस जाएं</button>
              </div>
              <img src={selectedNews.imageUrl} className="mk-detail-hero-img" alt="" />
              <h1 className="mk-detail-title">{selectedNews.title}</h1>
              <div className="mk-detail-meta">
                <span><i className="far fa-calendar-alt"></i> {selectedNews.date || selectedNews.time}</span>
              </div>
              <div className="mk-detail-content">
                {/* Poora data yahan show hoga */}
                <p className="mk-full-summary">{selectedNews.summary}</p>
                <div className="mk-read-more-info">
                   <p>DayNightNews के माध्यम से आप तक यह जानकारी पहुँचाई जा रही है। ताज़ा अपडेट्स के लिए जुड़े रहें।</p>
                </div>
              </div>
           </div>
        </div>
      ) : (
        /* --- LIST VIEW (Short Summary) --- */
        <div className="mk-main-content-layout">
          <div className="mk-left-main-blocks">
            <section className="mk-feature-section">
              <MarketingNewsCard news={marketingNewsData.feature} isFeature={true} onOpenNews={openNews} />
            </section>
            
            <section className="mk-latest-releases-section">
              <h2 className="mk-section-heading mk-marketing-heading">🎯 मार्केटिंग ट्रेंड्स</h2>
              <div className="mk-releases-grid">
                {currentPosts.map((item) => (
                  <MarketingNewsCard key={item.id} news={item} isFeature={false} isGrid={true} onOpenNews={openNews} />
                ))}
              </div>

              <div className="mk-pagination">
                <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} className="mk-pagination-link" disabled={currentPage === 1}>Prev</button>
                {pageNumbers.map((number) => (
                  <span key={number} onClick={() => setCurrentPage(number)} className={`mk-page-number ${currentPage === number ? "mk-active-page" : ""}`}>{number}</span>
                ))}
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} className="mk-pagination-link" disabled={currentPage === totalPages}>Next</button>
              </div>
            </section>
          </div>

          <aside className="mk-right-sidebar-news">
            <SidebarRecentPost posts={sidebarData.recent_posts} onOpenNews={openNews} />
            <SidebarHotCategory categories={sidebarData.hot_categories} />
            <SocialMediaIcons links={sidebarData.social_links} />
          </aside>
        </div>
      )}
    </div>
  );
}

export default MarketingSection;