import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./NewsNavbar.css";
import NewsGrid from "../../components/HeroSection/Hero";
import AllSections from "../ExploreContent/ExploreContent";
import BreakingNewsSection from "../BreakingNewsSection/BreakingNewsSection";
import VideoNews from "../../components/VideoNews/VideoNews";

function NewsNavbar() {
  const [active, setActive] = useState("India");

  return (
    <div className="news-nav-bar-container">
      <h2 className="news-nav-title">News</h2>

      {/* Link nav bar */}
      <div className="category-tags-wrapper">
        <Link
          to="/StandardPost"
          className={`category-tag ${active === "India" ? "tag-active" : ""}`}
          onClick={() => setActive("India")}
        >
          India
        </Link>

        <Link
          to="/StandardPost"
          className={`category-tag ${active === "World" ? "tag-active" : ""}`}
          onClick={() => setActive("World")}
        >
          World
        </Link>

        <Link
          to="/StandardPost"
          className={`category-tag ${active === "Local" ? "tag-active" : ""}`}
          onClick={() => setActive("Local")}
        >
          Local
        </Link>
      </div>

      <NewsGrid/>
      <hr />
      {/* <ExploreContent/>
      <hr /> */}
      <AllSections/>
      <hr />
      <VideoNews/>
      <hr />
      <BreakingNewsSection/>
      
    </div>
  );
}

export default NewsNavbar;
