import React, { useState, useEffect } from "react"; 
import "../BrakingNews/BrakingNews.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Heading = ({ title }) => (
  <div className="heading">
    <h2>{title}</h2>
    <hr />
  </div>
);

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
            <span>{post.catgeory}</span>
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

const InnovationNews = () => {
  const [newsList, setNewsList] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchInnovationNews = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/innovation/popular");
        const data = await response.json();
        
        // Latest data first logic (Reverse)
        const rawData = data.innovationNews || [];
        setNewsList([...rawData].reverse()); 
      } catch (error) {
        console.error("Innovation news fetch error:", error);
      }
    };
    fetchInnovationNews();
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
    infinite: newsList.length > 1,
    speed: 500,
    slidesToShow: 2, // Default desktop view
    slidesToScroll: 1,
    arrows: false,
    autoplay: newsList.length > 1,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
      }
    ],
  };

  // 1-line truncation style for card uniformity
  const oneLineStyle = {
    display: "-webkit-box",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: "1.5em" 
  };

  return (
    <>
      <NewsModal post={selectedPost} onClose={closeModal} />

      <section className="popular">
        <Heading title="Innovation" />

        <div className="popular-slider-wrapper">
          <Slider {...settings}>
            {newsList.map((val, index) => (
              <div
                className="items"
                key={val.id || index}
                onClick={() => openModal(val)}
                style={{ cursor: "pointer" }}
              >
                <div className="box shadow">
                  <div className="images">
                    <img src={val.cover} alt={val.title} />
                    <div className="category">
                      <span>{val.catgeory}</span>
                    </div>
                  </div>

                  <div className="text">
                    {/* Title 1 line for alignment */}
                    <h1 className="title" style={{...oneLineStyle, fontWeight: "bold", fontSize: "18px", marginBottom: "10px"}}>
                        {val.title}
                    </h1>

                    {/* Summary/Description 1 line */}
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
        </div>
      </section>
    </>
  );
};

export default InnovationNews;