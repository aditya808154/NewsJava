import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import Head from "./Head";

const menuItems = [
  {
    title: "Home",
    link: "/",
    hasDropdown: true,
    submenu: [
      {
        name: "Page",
        subsubmenu: [
          { title: "Page1", link: "/" },
          { title: "Page2", link: "/" },
          { title: "Page3", link: "/" }
        ]
      }
    ]
  },
  {
    title: "National",
    hasDropdown: true,
    submenu: [
      { title: "About", link: "/about" },
      { title: "Team", link: "/team" },
      { title: "Author", link: "/author" },
      { title: "Contact", link: "/contact" }
    ]
  },
  {
    title: "News",
    hasDropdown: true,
    submenu: [
      { title: "News", link: "/news" },
      { title: "India", link: "/StandardPost" },
      { title: "World", link: "/StandardPost" },
      { title: "Local", link: "/StandardPost" }
    ]
  },
  {
    title: "International",
    hasDropdown: true,
    submenu: [
      { title: "Category Default", link: "/CategoryDefault" },
      { title: "Category One", link: "/CategoryOne/" },
      { title: "Category Two", link: "/CategoryTwo" },
      { title: "Category Three", link: "/CategoryThree" },
      { title: "Category Four", link: "/CategoryFour" }
    ]
  },
  {
    title: "Business",
    hasDropdown: true,
    submenu: [
      { title: "Business", link: "/Business", icon: "https://i.pinimg.com/736x/52/a0/35/52a0350bafa8414de0941640eb2be17e.jpg" },
      { title: "Market", link: "/Business", icon: "https://i.pinimg.com/736x/09/15/54/091554e529bad55281c0f86ad6565e4b.jpg" },
      { title: "Finance", link: "/Business", icon: "https://i.pinimg.com/1200x/b7/2d/eb/b72deb879b6a0d7587fb97d6a7b2faab.jpg" },
      { title: "Startups", link: "/Business", icon: "https://i.pinimg.com/1200x/34/5b/25/345b2568eb7a0f8635c933c8ecbcec20.jpg" }
    ]
  },
  {
    title: "राज्य",
    hasDropdown: true,
    submenu: [
      {
        title: "राज्य",
        link: "/State/latest-news",
        icon: "https://i.pinimg.com/1200x/cf/9a/ce/cf9ace39c5253facd38998f1375484fb.jpg"
      },
      {
        title: "Latest News",
        link: "/State/latest-news",
        icon: "https://i.pinimg.com/736x/2c/df/fe/2cdffef7600fa653b4a8ef5e5a51643a.jpg"
      },
      {
        title: "Top Stories",
        link: "/State/top-stories",
        icon: "https://i.pinimg.com/1200x/11/91/c2/1191c215e4e5d4f9deb3bfbe544313c2.jpg"
      },
      {
        title: "Trending News",
        link: "/State/trending-news",
        icon: "https://i.pinimg.com/736x/ff/6e/7a/ff6e7a2f3d3524bd8e62a7f910a21cb2.jpg"
      },
      {
        title: "Hot News",
        link: "/State/hot-news",
        icon: "https://i.pinimg.com/736x/e3/04/03/e3040317aa707f60dbaa411b4f792d7d.jpg"
      }
    ]
  },
  {
    title: "Health",
    hasDropdown: true,
    submenu: [
      { title: "Blog", link: "/Health/blog" },
      { title: "Blog Single", link: "/Health/blog-single" }
    ]
  },
  {
    title: "Sport",
    hasDropdown: true,
    submenu: [
      { title: "Sports", link: "/sport" },
      { title: "Standard Post", link: "/StandardPost" },
      { title: "Gallery Post", link: "/GalleryPost" },
      { title: "Video Post", link: "/VideoPost" },
      { title: "Audio Post", link: "/AudioPostDetail" },
      { title: "Right sidebar", link: "/RightSidebar" },
      { title: "Left sidebar", link: "/StandardPost" },
      { title: "No sidebar", link: "/NoSlider" },
    ]
  },
  {
  title: "Story",
  hasDropdown: true,
  submenu: [
    { title: "Shop", link: "/Shop" },
    { title: "Shop Single", link: "/SingleShopItem" },
    { title: "Cart", link: "/Cart" },
    { title: "Checkout", link: "/Checkout" },
    { title: "My Account", link: "/MyAccount" }
  ]
},
  // {
  //   title: "Live",
  //   hasDropdown: true,
  //   submenu: [{ title: "Live News", link: "/Live/live-news" }]
  // },
  { title: "Live", hasDropdown: false, link: "/Live" },
  { title: "Weather", hasDropdown: false, link: "/WeatherPage" }
];

function Header() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  const [openMenu, setOpenMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const toggleMenu = (title) => {
    setOpenMenu(openMenu === title ? null : title);
    setOpenSubMenu(null);
  };

  const toggleSub = (name) => {
    setOpenSubMenu(openSubMenu === name ? null : name);
  };

  const isActive = (item) => {
    if (item.link && path === item.link) return true;
    if (item.title.toLowerCase() === "home" && path === "/") return true;

    if (item.submenu) {
      for (const sub of item.submenu) {
        if (sub.link && path.includes(sub.link)) return true;
        if (sub.subsubmenu) {
          for (const child of sub.subsubmenu) {
            if (path.includes(child.link)) return true;
          }
        }
      }
    }
    return false;
  };

  return (
    <>
      <Head />
      <div className="header-container">
        <ul className="desktop-menu">
          {menuItems.map((item) => {
            const isHome = item.title === "Home";
            const isLinkOnly = !item.hasDropdown || isHome;
            const targetLink = item.link || "/";

            const mainContent = isLinkOnly ? (
              <Link to={targetLink} key={item.title}>
                <span className={isActive(item) ? "active" : ""}>
                  {item.title}
                </span>
              </Link>
            ) : (
              <span
                key={item.title}
                className={isActive(item) ? "active" : ""}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMenu(item.title);
                }}
              >
                {item.title}
              </span>
            );

            return (
              <li key={item.title} className="desktop-item">
                {mainContent}

                {item.hasDropdown && openMenu === item.title && !isHome && (
                  <ul className="desktop-dropdown">
                    {item.submenu.map((sub) => {
                      return sub.subsubmenu ? (
                        <li key={sub.name}>
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSub(sub.name);
                            }}
                          >
                            {sub.name}
                            <i
                              className={`dropdown-icon ${
                                openSubMenu === sub.name ? "open" : ""
                              }`}
                            >
                              &gt;
                            </i>
                          </span>

                          {openSubMenu === sub.name && (
                            <ul className="desktop-sub-dropdown">
                              {sub.subsubmenu.map((child) => (
                                <li key={child.title}>
                                  <Link
                                    to={child.link}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {child.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ) : (
                        <li key={sub.title}>
                          {sub.icon && (
                            <img
                              src={sub.icon}
                              alt={sub.title}
                              className="dropdown-sub-image"
                            />
                          )}
                          <Link
                            to={sub.link}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {sub.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <hr />
    </>
  );
}

export default Header;
