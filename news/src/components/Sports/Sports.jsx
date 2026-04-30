import React, { useState, useEffect } from "react";
import "../BrakingNews/BrakingNews.css"; 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Heading Component
const Heading = ({ title }) => (
  <div className="heading">
    <h2>{title}</h2>
    <hr />
  </div>
);

// News Modal Component
const NewsModal = ({ post, onClose }) => {
  if (!post) return null;
  return (
    <div className="news-modal-overlay" onClick={onClose}>
      <div className="news-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <div className="modal-header">
          <img src={post.cover} alt={post.title} className="modal-image" />
          <div className="modal-category">
            <span>{post.category}</span>
          </div>
        </div>
        <div className="modal-body">
          <h1 className="modal-title">{post.title}</h1>
          <div className="modal-meta-info">
            <span className="modal-date">
              <i className="fas fa-calendar-days"></i> {post.date}
            </span>
            <span className="modal-comments">
              <i className="fas fa-comments"></i> {post.comments} Comments
            </span>
          </div>
          <p className="modal-full-content">{post.content}</p>
          <p className="modal-disclaimer">यह लेख केवल सूचनात्मक उद्देश्यों के लिए है।</p>
        </div>
      </div>
    </div>
  );
};

const SportsNews = () => {
  const [sportsNews, setSportsNews] = useState([]); 
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = "http://localhost:8080/api/sport";

  const fetchSportsData = async () => {
    try {
      const res = await fetch(`${API_URL}/popular`);
      const data = await res.json();
      const rawData = Array.isArray(data.popularNews) ? data.popularNews : [];
      setSportsNews([...rawData].reverse()); 
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching sports news:", err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSportsData();
  }, []);

  const openModal = (post) => {
    setSelectedPost(post);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedPost(null);
    document.body.style.overflow = "unset";
  };

  const settings = {
    infinite: sportsNews.length > 1,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } }
    ],
  };

  // Inline Style for 1-line summary
  const oneLineStyle = {
    display: "-webkit-box",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: "1.5em" // Fixed height taaki card hilay nahi
  };

  if (isLoading) return <div className="loading">Loading Sports News...</div>;

  return (
    <>
      <NewsModal post={selectedPost} onClose={closeModal} />

      <section className="popular">
        <Heading title="Sports" />

        <div className="popular-slider-wrapper">
          {sportsNews.length > 0 ? (
            <Slider {...settings}>
              {sportsNews.map((val) => (
                <div
                  className="items"
                  key={val.id}
                  onClick={() => openModal(val)}
                >
                  <div className="box shadow">
                    <div className="images">
                      <img src={val.cover} alt={val.title} />
                      <div className="category">
                        <span>{val.category}</span>
                      </div>
                    </div>

                    <div className="text">
                      <h1 className="title" style={{...oneLineStyle, fontWeight: "bold", fontSize: "18px", marginBottom: "10px"}}>{val.title}</h1>
                      
                      {/* Summary fixed to 1 line */}
                      <p className="short-description" style={oneLineStyle}>
                        {val.content}
                      </p>

                      <div className="meta-info-container">
                        <div className="date">
                          <i className="fas fa-calendar-days"></i>
                          <label>{val.date}</label>
                        </div>
                        <div className="comment">
                          <i className="fas fa-comments"></i>
                          <label>{val.comments}</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <p className="no-data">No sports news available.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default SportsNews;