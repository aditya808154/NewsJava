import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Head.css";
import Logo from "../../assets/Image/DNN-LOGO.webp";

function Head() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);

  useEffect(() => {
    // 12-15 Important Languages (Hindi, English, Marathi, etc.)
    const languages = 'hi,en,mr,gu,ta,te,kn,bn,pa,ar,fr,es,de,ru,ja'; 
    
    const addScript = document.createElement("script");
    addScript.setAttribute("src", "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit");
    document.body.appendChild(addScript);

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: languages,
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
      }, 'google_translate_element');
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    if (isMenuOpen) {
      setActiveDropdown(null);
      setActiveSubDropdown(null);
    }
  };

  const toggleDropdown = (e, title) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === title ? null : title);
    setActiveSubDropdown(null);
  };

  const toggleSubDropdown = (e, name) => {
    e.stopPropagation();
    setActiveSubDropdown(activeSubDropdown === name ? null : name);
  };

  const menuItems = [
    { title: "Home", hasDropdown: true, submenu: [{ name: "Page", subsubmenu: [{ title: "Page1", link: "/" }, { title: "Page2", link: "/" }, { title: "Page3", link: "/" }] }] },
    { title: "National", hasDropdown: true, submenu: [{ title: "About", link: "/about" }, { title: "Team", link: "/team" }, { title: "Author", link: "/author" }, { title: "Contact", link: "/contact" }] },
    { title: "News", hasDropdown: true, submenu: [{ title: "News", link: "/news" }, { title: "India", link: "/StandardPost" }, { title: "World", link: "/StandardPost" }, { title: "Local", link: "/StandardPost" }] },
    { title: "International", hasDropdown: true, submenu: [{ title: "Category Default", link: "/CategoryDefault" }, { title: "Category One", link: "/CategoryOne" }, { title: "Category Two", link: "/CategoryTwo" }, { title: "Category Three", link: "/CategoryThree" }, { title: "Category Four", link: "/CategoryFour" }] },
    { title: "Business", hasDropdown: true, submenu: [{ title: "Business", link: "/business/market" }, { title: "Market", link: "/Business/market" }, { title: "Finance", link: "/business/finance" }, { title: "Startups", link: "/business/startups" }] },
    { title: "राज्य", hasDropdown: true, submenu: [{ title: "Latest News", link: "/State/latest-news" }, { title: "Top Stories", link: "/State/top-stories" }, { title: "Trending News", link: "/State/trending-news" }, { title: "Hot News", link: "/State/hot-news" }] },
    { title: "Health", hasDropdown: true, submenu: [{ title: "Blog", link: "/Health/blog" }, { title: "Blog Single", link: "/Health/blog-single" }] },
    { title: "Sport", hasDropdown: true, submenu: [{ title: "Sports", link: "/sport" }, { title: "Standard Post", link: "/StandardPost" }, { title: "Gallery Post", link: "/GalleryPost" }, { title: "Video Post", link: "/VideoPost" }, { title: "Audio Post", link: "/AudioPostDetail" }, { title: "Right sidebar", link: "/RightSidebar" }, { title: "Left sidebar", link: "/StandardPost" }, { title: "No sidebar", link: "/NoSlider" }] },
    { title: "Story", hasDropdown: true, submenu: [{ title: "Shop", link: "/Shop" }, { title: "Shop Single", link: "/SingleShopItem" }, { title: "Cart", link: "/Cart" }, { title: "Checkout", link: "/Checkout" }, { title: "My Account", link: "/MyAccount" }] },
    { title: "Live", hasDropdown: true, submenu: [{ title: "Live News", link: "/Live" }] },
    { title: "Weather", hasDropdown: false, link: "/WeatherPage" },
    { title: "Register", hasDropdown: false, link: "/Register/register" },
    { title: "Sign in", hasDropdown: false, link: "/SignIn/signin" },
    { title: "AdminLogin", hasDropdown: false, link: "/AdminLogin/adminlogin" },
  ];

  return (
    <>
      <header className="head-container">
        <div className="head-left">
          <i className="fas fa-bars" onClick={toggleMenu}></i>
        </div>

        <div className="head-logo">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        <div className="right-actions">
          <div id="google_translate_element"></div>
          <div className="btn-head">
            <button className="btn-register">
              <Link to="/Register/register">Register</Link>
            </button>
            <button className="btn-signin">
              <Link to="/SignIn/signin">Sign in</Link>
            </button>
          </div>
        </div>
      </header>

      <aside className={`menu-sidebar ${isMenuOpen ? "open" : ""}`}>
        <div className="sidebar-search">
          <input type="text" placeholder="Search news, topics and more" />
          <i className="fa fa-search"></i>
        </div>

        <ul className="menu-list">
          {menuItems.map((item) => (
            <li key={item.title} className="menu-item">
              <div className="menu-item-content" onClick={(e) => item.hasDropdown ? toggleDropdown(e, item.title) : null}>
                {item.hasDropdown ? (
                  <span>{item.title}</span>
                ) : (
                  <Link to={item.link} onClick={toggleMenu}>{item.title}</Link>
                )}
                {item.hasDropdown && (
                  <i className={`dropdown-icon fas fa-chevron-down ${activeDropdown === item.title ? "open" : ""}`}></i>
                )}
              </div>

              {item.hasDropdown && activeDropdown === item.title && (
                <ul className="submenu">
                  {item.submenu.map((sub) => (
                    sub.subsubmenu ? (
                      <li key={sub.name}>
                        <div className="submenu-title" onClick={(e) => toggleSubDropdown(e, sub.name)}>
                          {sub.name}
                          <i className={`dropdown-icon fas fa-chevron-down ${activeSubDropdown === sub.name ? "open" : ""}`}></i>
                        </div>
                        {activeSubDropdown === sub.name && (
                          <ul className="sub-submenu">
                            {sub.subsubmenu.map((child) => (
                              <li key={child.title}><Link to={child.link} onClick={toggleMenu}>{child.title}</Link></li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ) : (
                      <li key={sub.title}><Link to={sub.link} onClick={toggleMenu}>{sub.title}</Link></li>
                    )
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {isMenuOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}
    </>
  );
}

export default Head;