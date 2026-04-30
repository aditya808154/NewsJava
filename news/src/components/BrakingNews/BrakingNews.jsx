import React, { useEffect, useState } from "react";
import "./BrakingNews.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* ---------- HEADING ---------- */
const Heading = ({ title }) => (
  <div className="heading">
    <h2>{title}</h2>
    <hr />
  </div>
);

/* ---------- MODAL ---------- */
const NewsModal = ({ post, onClose }) => {
  if (!post) return null;
  return (
    <div className="news-modal-overlay" onClick={onClose}>
      <div className="news-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="modal-header">
          <img src={post.cover} alt={post.title} className="modal-image" />
          <div className="modal-category">
            <span>{post.category || post.catgeory || "General"}</span>
          </div>
        </div>
        <div className="modal-body">
          <h1 className="modal-title">{post.title}</h1>
          <div className="modal-meta-info">
            <span>📅 {post.date}</span>
            <span>💬 {post.comments} Comments</span>
          </div>
          <p className="modal-full-content">{post.content}</p>
        </div>
      </div>
    </div>
  );
};

/* ---------- MAIN COMPONENT ---------- */
const BrakingNews = () => {
  const [popular, setPopular] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const API_URL = "http://localhost:8080/api/news/popular";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Server error");
        const data = await res.json();

        let newsData = [];
        if (data && data.popularNews) {
          newsData = data.popularNews;
        } else if (Array.isArray(data)) {
          newsData = data;
        }

        // LATEST FIRST: Reverse the data
        setPopular([...newsData].reverse());
      } catch (err) {
        console.error("API ERROR in Slider:", err);
      }
    };
    fetchNews();
  }, []);

  const settings = {
    dots: true,
    infinite: popular.length > 1,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <>
      <NewsModal post={selectedPost} onClose={() => setSelectedPost(null)} />

      <section className="popular">
        <Heading title="Popular News" />

        {popular.length === 0 ? (
          <div className="no-data">
              <p style={{ textAlign: "center", padding: "40px", color: "gray" }}>
                No news found in database.
              </p>
          </div>
        ) : (
          <div className="popular-slider-wrapper">
            <Slider {...settings}>
              {popular.map((item) => (
                <div className="items" key={item.id || Math.random()}>
                  <div className="box" onClick={() => setSelectedPost(item)}>
                    <div className="images">
                      <img 
                        src={item.cover} 
                        alt={item.title} 
                        className="card-img"
                        onError={(e) => {e.target.src = "https://via.placeholder.com/800x400?text=No+Image"}}
                      />
                      <div className="category">
                        <span>{item.category || item.catgeory || "News"}</span>
                      </div>
                    </div>

                    <div className="text">
                      <h1 className="title">{item.title}</h1>
                      
                      {/* 1 LINE SUMMARY: Using the CSS class slider-desc from your file */}
                      <p className="slider-desc">
                        {item.content ? item.content.slice(0, 50) + "..." : "No description"}
                      </p>

                      {/* Date Section Fix */}
                      <div className="meta-info-container">
                        <span className="date-span">📅 {item.date || "No Date"}</span>
                        <span className="comment-span">💬 {item.comments ?? 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </section>
    </>
  );
};

export default BrakingNews;