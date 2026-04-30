import React from 'react';
import './About.css';

// Placeholder social media data (URLs added for clickability)
const socialStats = [
  { platform: 'Facebook', metric: 'Followers', count: 750, icon: 'f', color: '#3b5998', url: '#' },
  { platform: 'X', metric: 'Fans', count: 1250, icon: 'X', color: '#000000', url: '#' },
  { platform: 'Instagram', metric: 'Likes', count: 590, icon: '♥', color: '#e4405f', url: '#' },
  { platform: 'Vimeo', metric: 'Comments', count: 870, icon: 'v', color: '#1ab7ea', url: '#' },
  { platform: 'LinkedIn', metric: 'Followers', count: 1050, icon: 'in', color: '#0077b5', url: '#' },
  { platform: 'YouTube', metric: 'Subscribers', count: 1400, icon: '▶', color: '#ff0000', url: '#' },
];

// TEAM MEMBER DATA AND IMAGE MAPPING (using placeholder URLs matching the image provided)
const teamMemberImageMap = {
    // Replace with your actual hosted image URLs
    andrew: 'https://daynightnews.in/wp-content/uploads/2022/08/1-1.jpg', // Andrew Flintof Jr
    halle: 'https://daynightnews.in/wp-content/uploads/2022/08/2-1.jpg', // Halle Berry Nastia
    glenn: 'https://daynightnews.in/wp-content/uploads/2022/08/3-1.jpg', // Glenn Close Rossie
    johnny: 'https://daynightnews.in/wp-content/uploads/2022/08/4-1.jpg', // Johnny Depp Bosman
};

const teamMembers = [
  { name: 'Andrew Flintof Jr', title: 'Sr. Creative Director', imgKey: 'andrew', socials: { fb: '#', x: '#', ig: '#', yt: '#' } },
  { name: 'Halle Berry Nastia', title: 'Art Director', imgKey: 'halle', socials: { fb: '#', x: '#', ig: '#', yt: '#' } },
  { name: 'Glenn Close Rossie', title: 'Marketing Head', imgKey: 'glenn', socials: { fb: '#', x: '#', ig: '#', yt: '#' } },
  { name: 'Johnny Depp Bosman', title: 'Manager & CEO', imgKey: 'johnny', socials: { fb: '#', x: '#', ig: '#', yt: '#' } },
];

const About = () => {
  return (
    <div className="about-container" id="top">
      {/* 1. Header Section */}
      <header className="about-header">
        <h1>About</h1>
        <p className="breadcrumb">
          <a href="/">daynightnews</a> • About
        </p>
      </header>
      
      {/* 2. Main Content Area (Who We Are & Sidebar) */}
      <div className="about-content">
        <div className="main-info">
          
          {/* Who We Are Section */}
          <section className="who-we-are">
            <h2>Who We Are?</h2>
            <p>
              Possimus labore ad tempora blandit totam blanditiis fusce urna mollit facilisi expedita? Sociis, facilisis adipisci maiores voluptates odio magna eius iste facilisi illo, illo elementum per interdum! Odit pellentesque atque commodi, hic hendrerit leo commodo voluptates maiores mollit, dolor voluptatem recusandae dolorem dolore hac, iaculis, aliquet! Earum facere, nihil, sodales cillum! Arcu pulvinar, temporibus integer ullamcorper.
            </p>
            
            {/* IMAGE GALLERY SECTION: Single div with three images, as requested */}
            <div className="image-gallery single-row-gallery"> 
              <img src="https://i.pinimg.com/1200x/f7/68/18/f7681805637b58b0abe3e4ac2a6fae03.jpg" alt="" />
            </div>
            
            <section className="our-system">
                <h3 id='our'>Unique visual system and method.</h3>
                <p>
                    Rhoncus urna aliquet? Magni varius? Tempora penatibus odio quas quis cupidatat magni? Dis exercitation, dignissimos vestibulum? Totam nihil, pulvinar etiam platea itaque, officia? Cillum auctor facilis, eu nostra euismod explicabo. Voluptate eget ullam omnis habitant sociis vivamus.
                </p>
                <ul className="feature-list" id='our'>
                    <li>User Experience</li>
                    <li>Unique layouts Blocks</li>
                    <li>Strategy and Art Direction</li>
                </ul>
                <p>
                    Adipisci, reprehenderit platea cras ut quia consectetur convallis.
                </p>
            </section>

          </section>
        </div>
        
        {/* Sidebar Section */}
        <aside className="sidebar">
          
          {/* Get in Touch Section */}
          <section className="get-in-touch">
            <h3>Get in Touch</h3>
            <div className="social-grid">
              {socialStats.map((stat, index) => (
                <a 
                    key={index} 
                    href={stat.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-card" 
                    style={{ '--icon-color': stat.color }}
                >
                  <div className="social-icon">{stat.icon}</div>
                  <span className="social-metric">{stat.metric}</span>
                  <span className="social-count">{stat.count}</span>
                  <span className="social-platform">{stat.platform}</span>
                </a>
              ))}
            </div>
          </section>

          <section className="latest-posts">
            <h3>Latest Posts</h3>
          </section>
          
          <section className="categories">
            <h3>Categories</h3>
          </section>
          
        </aside>
      </div>
      
      {/* 3. MEET OUR TEAM SECTION (Ensure this is outside main-info/sidebar) */}
      <section className="team-section">
        <h2 className="team-heading">Meet Our Team</h2>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div className="team-member-card" key={index}>
              {/* Member Image Wrapper - Uses background image via style prop */}
              <div 
                className="member-image-wrapper" 
                style={{ backgroundImage: `url(${teamMemberImageMap[member.imgKey]})` }}
              >
                <div className="member-socials">
                  <a href={member.socials.fb} target="_blank" rel="noopener noreferrer" className="social-icon-box facebook">f</a>
                  <a href={member.socials.x} target="_blank" rel="noopener noreferrer" className="social-icon-box x">X</a>
                  <a href={member.socials.ig} target="_blank" rel="noopener noreferrer" className="social-icon-box instagram">O</a>
                  <a href={member.socials.yt} target="_blank" rel="noopener noreferrer" className="social-icon-box youtube">▶</a>
                </div>
              </div>
              
              <div className="member-info">
                <h4 className="member-name">{member.name}</h4>
                <p className="member-title">{member.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* 4. Footer social icons (Fixed position) */}
      <div className="footer-social-bar">
        <a href="mailto:contact@example.com" className="footer-social-icon email" aria-label="Email">✉</a>
        <a href="#" className="footer-social-icon facebook" aria-label="Facebook">f</a>
        <a href="#" className="footer-social-icon x" aria-label="X">X</a>
        <a href="#" className="footer-social-icon whatsapp" aria-label="Whatsapp">✆</a>
        <a href="#" className="footer-social-icon plus" aria-label="Share">+</a>
        <a href="#top" className="scroll-to-top" aria-label="Scroll to Top">⬆</a>
      </div>
      
    </div>
  );
};

export default About;