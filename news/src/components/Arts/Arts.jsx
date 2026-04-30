import React from "react";
import "../BrakingNews/BrakingNews.css"; // CSS वही इस्तेमाल करेंगे
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Heading component
const Heading = ({ title }) => (
  <div className="heading">
    <h2>{title}</h2>
    <hr />
  </div>
);

// Arts news data
const artsNews = [
  {
    cover: "https://i.pinimg.com/1200x/84/06/fc/8406fc84e618457695096eb30a0d1e3e.jpg",
    title: "Modern art exhibition opens downtown",
    catgeory: "Exhibition",
    date: "Dec 8, 2025",
    comments: 10,
  },
  {
    cover: "https://i.pinimg.com/1200x/b0/3f/2c/b03f2cbdba0f08873f4076c409f918df.jpg",
    title: "Classical music concert thrills audience",
    catgeory: "Music",
    date: "Dec 7, 2025",
    comments: 7,
  },
  {
    cover: "https://i.pinimg.com/1200x/1a/65/ad/1a65ad44c2a5942b2fbc3b3c64628c35.jpg",
    title: "New sculpture installation in city park",
    catgeory: "Sculpture",
    date: "Dec 6, 2025",
    comments: 12,
  },
  {
    cover: "https://i.pinimg.com/736x/d6/c1/3f/d6c13fb0767a6267e09b0d6369f58f56.jpg",
    title: "Street performance festival showcases local talent",
    catgeory: "Performance",
    date: "Dec 5, 2025",
    comments: 15,
  },
];

const ArtsNews = () => {
   const settings = {
    
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Default 1 (Refresh fix)
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    mobileFirst: true, // CSS media queries ki tarah kaam karega
    responsive: [
      {
        breakpoint: 768, // Tablet
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 1024, // Desktop
        settings: { slidesToShow: 3 }
      }
    ],
  };

  return (
    <section className="popular">
      <Heading title="Arts" />
      <div className="popular-slider-wrapper">
        <Slider {...settings}>
          {artsNews.map((val, index) => (
            <div className="items" key={index}>
              <div className="box shadow">
                <div className="images">
                  <img src={val.cover} alt={val.title} />
                  <div className="category">
                    <span>{val.catgeory}</span>
                  </div>
                </div>
                <div className="text">
                  <h1 className="title">{val.title}</h1>
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
  );
};

export default ArtsNews;
