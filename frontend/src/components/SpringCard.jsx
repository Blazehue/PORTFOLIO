import React from 'react';
import './SpringCard.css';

const SpringCard = ({ title, description, tech, link }) => {
  const handleCardClick = () => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      className={`spring-card ${link ? 'clickable' : ''}`}
      onClick={handleCardClick}
      style={{ cursor: link ? 'pointer' : 'default' }}
    >
      <div className="spring-card-content">
        <h3 className="spring-card-title">{title}</h3>
        <p className="spring-card-description">{description}</p>
        {tech && (
          <div className="spring-card-tech">
            {tech.map((item, index) => (
              <span key={index} className="tech-tag">{item}</span>
            ))}
          </div>
        )}
      </div>
      {link && (
        <div className="spring-card-link">
          <span className="link-text">VIEW ON GITHUB • VIEW ON GITHUB • VIEW ON GITHUB • </span>
        </div>
      )}
    </div>
  );
};

export default SpringCard;
