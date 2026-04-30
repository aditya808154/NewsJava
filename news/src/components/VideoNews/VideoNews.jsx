import React, { useState, useEffect } from "react";
import "./VideoNews.css"; 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// React Icons Imports
import { FaRegCalendarAlt, FaPlay, FaTimes, FaComments } from "react-icons/fa";

const Heading = ({ title }) => (
  <div className="vdo-heading">
    <h2>{title}</h2>
    <hr />
  </div>
);

const VideoNews = () => {
  const [videoList, setVideoList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/videos/popular");
        const data = await response.json();
        
        // Reverse logic: Latest video first
        const rawData = data.videoData || [];
        setVideoList([...rawData].reverse()); 
      } catch (error) {
        console.error("Error fetching video news:", error);
      }
    };

    fetchVideos();
  }, []);

  // Card UI Sync Style (Strictly 1 line)
  const oneLineStyle = {
    display: "-webkit-box",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: "1.5em" 
  };

  const settings = {
    infinite: videoList.length > 1,
    speed: 500,
    slidesToShow: 2, // Change to 3 for standard layout or keep your 1
    slidesToScroll: 1,
    arrows: false,
    autoplay: videoList.length > 1,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ],
  };

  const handleCardClick = (video) => {
    setSelectedVideo(video);
    document.body.style.overflow = 'hidden'; 
  };

  const closeModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'unset'; 
  };

  const VideoModal = ({ video, onClose }) => {
    if (!video) return null;
    return (
      <div className="vdo-modal-overlay" onClick={onClose}>
        <div className="vdo-modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="vdo-close-btn" onClick={onClose}>
            <FaTimes />
          </button>
          <div className="vdo-player-area"> 
            <iframe
              src={video.videoUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={video.title}
            ></iframe>
          </div>
          <div className="vdo-modal-body"> 
            <span className="vdo-modal-category-tag">{video.category}</span> 
            <h1 className="vdo-modal-title">{video.title}</h1> 
            <div className="vdo-modal-meta-info"> 
              <span className="date-span">
                <FaRegCalendarAlt /> {video.date}
              </span>
              <span className="comment-span">
                <FaComments /> {video.comments} Comments
              </span>
            </div>
            <p className="vdo-modal-full-content">{video.description}</p> 
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="vdo-section"> 
      <Heading title="Latest Video News" />

      <div className="vdo-slider-wrapper"> 
        <Slider {...settings}>
          {videoList.map((item, index) => (
            <div className="items" key={item.id || index}> 
              <div className="vdo-card-box" onClick={() => handleCardClick(item)}> 
                <div className="vdo-media-area"> 
                  <img src={item.thumbnail} alt={item.title} className="video-thumb-preview" />
                  <div className="vdo-play-button"> 
                    <FaPlay />
                  </div>
                  <span className="vdo-category-tag">{item.category}</span> 
                </div>
                <div className="vdo-text-content"> 
                  {/* Title also synced to 1 line */}
                  <h3 className="vdo-title" style={oneLineStyle}>{item.title}</h3> 
                  
                  {/* Description fixed to exactly 1 line */}
                  <p className="vdo-short-description" style={oneLineStyle}>
                    {item.description}
                  </p>

                  <div className="vdo-meta-info"> 
                    <span className="date-span">
                      <FaRegCalendarAlt /> {item.date}
                    </span>
                    <span className="comment-span">
                      <FaComments /> {item.comments}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      
      <VideoModal video={selectedVideo} onClose={closeModal} />
    </section>
  );
};

export default VideoNews;