// TeamSection.js

import React from 'react';
import './TeamSection.css';

// Updated data matching the image and providing new names
const teamMemberImageMap = {
    // NOTE: Replace these with your actual image URLs
    andrew: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=300&h=330&fit=crop', 
    halle: 'https://daynightnews.in/wp-content/uploads/2022/08/2-1.jpg',
    glenn: 'https://daynightnews.in/wp-content/uploads/2022/08/5.jpg', 
    mossie: 'https://daynightnews.in/wp-content/uploads/2022/08/3-1.jpg',
    albert: 'https://daynightnews.in/wp-content/uploads/2022/08/6.jpg',
};

const teamMembers = [
  // First member - Andrew
  { name: 'Andrew Flintof Jr.', title: 'Manager & Title', imgKey: 'andrew', subtitle: 'Andrew Flintof Jr', designation: 'Manager & Title', socials: { fb: '#', x: '#', yt: '#', plus: '#' } },
  
  // Second member - Halle
  { name: 'Halle Berry Nastia', title: 'Art Director', imgKey: 'halle', subtitle: 'Athrew Depp Nastia', designation: 'Art Director 6594b', socials: { fb: '#', x: '#', yt: '#', plus: '#' } },
  
  // Third member - Glenn
  { name: 'Glenn Close Rossie', title: 'Advisor', imgKey: 'glenn', subtitle: 'Bosman Depp Methon', designation: 'Advisor', socials: { fb: '#', x: '#', yt: '#', plus: '#' } },
  
  // Fourth member - Mossie
  { name: 'Bossman Rossie', title: 'Consultancy', imgKey: 'mossie', subtitle: 'Bosman Depp Methon', designation: 'Consultancy', socials: { fb: '#', x: '#', yt: '#', plus: '#' } },
  
  // Fifth member - Albert
  { name: 'Mr. Albert Coleman', title: 'Consultancy', imgKey: 'albert', subtitle: 'Mr. Albert Coleman', designation: 'Consultancy', socials: { fb: '#', x: '#', yt: '#', plus: '#' } },
];

const TeamSection = () => {
    
  // Function to render social icons
  const renderSocialIcons = (socials) => (
    <div className="member-socials-list">
        {socials.fb && <a href={socials.fb} target="_blank" rel="noopener noreferrer" className="social-icon-box ts-facebook" aria-label="Facebook">f</a>}
        {socials.x && <a href={socials.x} target="_blank" rel="noopener noreferrer" className="social-icon-box ts-x" aria-label="X">X</a>}
        {socials.yt && <a href={socials.yt} target="_blank" rel="noopener noreferrer" className="social-icon-box ts-youtube" aria-label="YouTube">▶</a>}
        {socials.plus && <a href={socials.plus} target="_blank" rel="noopener noreferrer" className="social-icon-box ts-plus" aria-label="Share">+</a>}
    </div>
  );

  return (
    // Top container with dark header and white content
    <div className="ts-main-container"> 
      
      {/* Dark Header Section (As seen in the image) */}
      <div className="ts-dark-header">
        <header className="ts-header-content">
          <h1 className="ts-main-heading">Team</h1>
          <p className="ts-breadcrumb">
            daynightnews • Team
          </p>
        </header>
      </div>
      
      {/* White Content Area */}
      <section className="ts-team-section-white">

        {/* Team Grid */}
        <div className="ts-team-grid">
          {teamMembers.map((member, index) => (
            <div className="ts-team-member-card" key={index}>
              
              {/* Image and Overlay */}
              <div 
                className="ts-member-image-wrapper" 
                style={{ backgroundImage: `url(${teamMemberImageMap[member.imgKey] || member.imgKey})` }}
              >
                {/* Overlay box containing name and socials */}
                <div className="ts-overlay-box">
                    <h4 className="ts-overlay-name">{member.subtitle}</h4>
                    {renderSocialIcons(member.socials)}
                </div>
              </div>
              
              {/* Info below the image */}
              <div className="ts-member-info">
                <h4 className="ts-member-name-full">{member.subtitle}</h4> 
                <p className="ts-member-title-full">{member.designation}</p>
              </div>
              
            </div>
          ))}
      
        </div>
      </section>
      

    </div>
  );
};

export default TeamSection;