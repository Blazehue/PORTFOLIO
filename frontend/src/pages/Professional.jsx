import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/mock';
import { Music, Play, Pause, Github, Linkedin, Mail, Instagram, Briefcase, Home, User, Wrench, FolderOpen, MessageCircle, CheckCircle2, Circle } from 'lucide-react';
import SpringCard from '../components/SpringCard';
import './Professional.css';

/**
 * MUSIC PLAYER SETUP:
 * 
 * 1. RANDOM MUSIC - Works out of the box! No setup required.
 * 
 * 2. YOUTUBE SEARCH - To enable inline search results:
 *    - Get API key from: https://console.cloud.google.com
 *    - Replace 'YOUR_YOUTUBE_API_KEY_HERE' in searchYouTube() function
 *    - See MUSIC_PLAYER_SETUP.md for detailed instructions
 * 
 * 3. SPOTIFY - To enable Spotify integration:
 *    - Get Client ID from: https://developer.spotify.com/dashboard
 *    - Replace 'YOUR_SPOTIFY_CLIENT_ID_HERE' in handleSpotifyConnect() function
 *    - Add redirect URIs in Spotify Dashboard
 *    - See MUSIC_PLAYER_SETUP.md for detailed instructions
 */

const Professional = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showDock, setShowDock] = useState(false);
  const [animatedText, setAnimatedText] = useState('');
  const [showMusicPlayer, setShowMusicPlayer] = useState(false);
  const [currentSong, setCurrentSong] = useState('No Song Playing');
  const [searchQuery, setSearchQuery] = useState('');
  const [musicMode, setMusicMode] = useState('none'); // 'none', 'random', 'youtube', 'spotify'
  const [youtubeResults, setYoutubeResults] = useState([]);
  const [showYoutubeResults, setShowYoutubeResults] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState(null);
  const [visitedSections, setVisitedSections] = useState(['home']); // Track visited sections
  const [showTodoWidget, setShowTodoWidget] = useState(true);
  const [showThanksPopup, setShowThanksPopup] = useState(false);
  const fullName = "Rajat Pandey";

  const todoItems = [
    { id: 'home', label: 'View Homepage', icon: Home },
    { id: 'about', label: 'Explore About', icon: User },
    { id: 'skills', label: 'Check Skills', icon: Wrench },
    { id: 'projects', label: 'View Projects', icon: FolderOpen },
    { id: 'contact', label: 'Visit Contact', icon: MessageCircle }
  ];

  const randomSongs = [
    { title: 'Lofi Beats - Study Session', url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk' },
    { title: 'Chill Vibes - Work Mode', url: 'https://www.youtube.com/watch?v=5qap5aO4i9A' },
    { title: 'Focus Flow - Deep Work', url: 'https://www.youtube.com/watch?v=DWcJFNfaw9c' },
    { title: 'Ambient Sounds - Productivity', url: 'https://www.youtube.com/watch?v=4xDzrJKXOOY' },
    { title: 'Calm Waves - Concentration', url: 'https://www.youtube.com/watch?v=UgHKb_7884o' }
  ];

  useEffect(() => {
    document.title = 'Rajat Pandey - Professional Portfolio';
    setTimeout(() => setIsLoaded(true), 100);
    
    // Animate name letter by letter
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullName.length) {
        setAnimatedText(fullName.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Show dock when cursor is within 100px of bottom
      if (window.innerHeight - e.clientY < 100) {
        setShowDock(true);
      } else {
        setShowDock(false);
      }
    };

    // Handle keyboard navigation - simplified for better compatibility
    const handleKeyDown = (e) => {
      // Don't interfere with input fields
      if (e.target.matches('input, textarea, select')) {
        return;
      }

      const scrollAmount = 80;
      
      switch(e.key) {
        case 'ArrowDown':
          window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
          break;
        case 'ArrowUp':
          window.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
          break;
        case 'PageDown':
          window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
          break;
        case 'PageUp':
          window.scrollBy({ top: -window.innerHeight * 0.9, behavior: 'smooth' });
          break;
        case ' ':
          // Space bar scrolls down
          e.preventDefault();
          window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' });
          break;
        case 'Home':
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 'End':
          e.preventDefault();
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          break;
        default:
          break;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => (prev >= 180 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Track section visibility with Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3 // Section is considered "visited" when 30% visible
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setVisitedSections(prev => {
            if (!prev.includes(sectionId)) {
              const newVisited = [...prev, sectionId];
              // Check if all sections are visited
              if (newVisited.length === todoItems.length) {
                setTimeout(() => {
                  setShowTodoWidget(false);
                  setShowThanksPopup(true);
                  // Fade out after 1 second by adding a class
                  setTimeout(() => {
                    const popup = document.querySelector('.thanks-popup');
                    const overlay = document.querySelector('.thanks-popup-overlay');
                    if (popup) popup.classList.add('fade-out');
                    if (overlay) overlay.classList.add('fade-out');
                  }, 1000);
                  // Remove popup completely after fade animation
                  setTimeout(() => setShowThanksPopup(false), 1500);
                }, 500);
              }
              return newVisited;
            }
            return prev;
          });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    todoItems.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [todoItems.length]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (audioPlayer && audioPlayer.togglePlayer) {
      // Toggle player visibility when clicking play/pause
      audioPlayer.togglePlayer();
    }
    setIsPlaying(!isPlaying);
    if (!isPlaying && musicMode === 'none') {
      setShowMusicPlayer(true);
    }
  };

  const handleRandomMusic = () => {
    const randomSong = randomSongs[Math.floor(Math.random() * randomSongs.length)];
    setCurrentSong(randomSong.title);
    setMusicMode('random');
    setShowMusicPlayer(false);
    
    // Extract video ID from YouTube URL
    const videoId = randomSong.url.split('v=')[1]?.split('&')[0];
    if (videoId) {
      playYouTubeAudio(videoId, randomSong.title);
    }
  };

  const searchYouTube = async () => {
    if (!searchQuery.trim()) return;
    
    // YouTube API Key configured
    const YOUTUBE_API_KEY = 'AIzaSyAhkxCdFrOGVJ_xrYWIF7ZIIdvj6vCNoVY';
    
    try {

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${encodeURIComponent(searchQuery)}&type=video&key=${YOUTUBE_API_KEY}`
      );
      
      if (response.ok) {
        const data = await response.json();
        const results = data.items.map(item => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
          channel: item.snippet.channelTitle
        }));
        setYoutubeResults(results);
        setShowYoutubeResults(true);
      } else {
        // Fallback: Open YouTube search in new tab
        window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`, '_blank');
      }
    } catch (error) {
      console.error('YouTube search error:', error);
      // Fallback: Open YouTube search
      window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`, '_blank');
    }
  };

  const playYouTubeAudio = (videoId, title) => {
    // Stop current audio if playing
    if (audioPlayer) {
      document.body.removeChild(audioPlayer);
      setAudioPlayer(null);
    }

    // Create container div (minimized by default, controlled from Dynamic Island)
    const container = document.createElement('div');
    container.id = 'youtube-player-container';
    container.style.position = 'fixed';
    container.style.bottom = '80px';
    container.style.right = '20px';
    container.style.width = '0px';
    container.style.height = '0px';
    container.style.zIndex = '9998';
    container.style.overflow = 'hidden';
    container.style.transition = 'all 0.3s ease';
    container.style.borderRadius = '12px';
    container.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
    
    // Create iframe with better embedding settings
    const iframe = document.createElement('iframe');
    iframe.id = 'youtube-player-iframe';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '12px';
    // Use youtube-nocookie.com and add more embed parameters
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1&rel=0&enablejsapi=1&origin=${window.location.origin}`;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.title = title;
    
    // Create expand/collapse button
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'youtube-player-toggle';
    toggleBtn.innerHTML = '▲';
    toggleBtn.style.position = 'absolute';
    toggleBtn.style.top = '5px';
    toggleBtn.style.right = '40px';
    toggleBtn.style.width = '30px';
    toggleBtn.style.height = '30px';
    toggleBtn.style.background = 'rgba(0,0,0,0.8)';
    toggleBtn.style.color = 'white';
    toggleBtn.style.border = 'none';
    toggleBtn.style.borderRadius = '50%';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.fontSize = '16px';
    toggleBtn.style.zIndex = '10000';
    toggleBtn.style.display = 'none';
    toggleBtn.style.alignItems = 'center';
    toggleBtn.style.justifyContent = 'center';
    toggleBtn.onclick = () => {
      if (container.style.width === '0px') {
        container.style.width = '350px';
        container.style.height = '220px';
        toggleBtn.innerHTML = '▼';
        toggleBtn.style.display = 'flex';
        closeBtn.style.display = 'flex';
      } else {
        container.style.width = '0px';
        container.style.height = '0px';
        toggleBtn.innerHTML = '▲';
      }
    };
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '5px';
    closeBtn.style.right = '5px';
    closeBtn.style.width = '30px';
    closeBtn.style.height = '30px';
    closeBtn.style.background = 'rgba(255,0,0,0.8)';
    closeBtn.style.color = 'white';
    closeBtn.style.border = 'none';
    closeBtn.style.borderRadius = '50%';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.fontSize = '24px';
    closeBtn.style.zIndex = '10001';
    closeBtn.style.display = 'none';
    closeBtn.style.alignItems = 'center';
    closeBtn.style.justifyContent = 'center';
    closeBtn.style.lineHeight = '1';
    closeBtn.onclick = () => {
      document.body.removeChild(container);
      setAudioPlayer(null);
      setIsPlaying(false);
      setCurrentSong('No Song Playing');
      setMusicMode('none');
    };
    
    container.appendChild(iframe);
    container.appendChild(toggleBtn);
    container.appendChild(closeBtn);
    document.body.appendChild(container);
    
    // Store reference with toggle function
    container.togglePlayer = () => {
      if (container.style.width === '0px' || container.style.width === '') {
        container.style.width = '350px';
        container.style.height = '220px';
        toggleBtn.style.display = 'flex';
        closeBtn.style.display = 'flex';
        toggleBtn.innerHTML = '▼';
      } else {
        container.style.width = '0px';
        container.style.height = '0px';
        toggleBtn.innerHTML = '▲';
      }
    };
    
    setAudioPlayer(container);
    setCurrentSong(title);
    setIsPlaying(true);
    setCurrentTime(0);
    setShowYoutubeResults(false);
    setSearchQuery('');
  };

  const handleYouTubeSelect = (video) => {
    playYouTubeAudio(video.id, video.title);
    setMusicMode('youtube');
    setShowMusicPlayer(false);
  };

  const handleSpotifyConnect = () => {
    // Spotify Client ID configured
    const SPOTIFY_CLIENT_ID = '076506e051534b5e80d01cbceab320a5';
    
    const redirectUri = encodeURIComponent(window.location.origin);
    const scopes = 'streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state';
    const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scopes)}`;
    
    window.open(spotifyAuthUrl, '_blank', 'width=500,height=700');
    setCurrentSong('Connecting to Spotify...');
    setMusicMode('spotify');
    setShowMusicPlayer(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setSidebarOpen(false);
    }
  };

  return (
    <div className={`notebook-portfolio ${isLoaded ? 'loaded' : ''}`}>
      {/* Loading Bar */}
      <div className="loading-bar"></div>

      {/* Todo Widget */}
      {showTodoWidget && (
        <div className="todo-widget">
          <div className="todo-header">
            <h4>Explore Portfolio</h4>
            <span className="todo-count">{visitedSections.length}/{todoItems.length}</span>
          </div>
          <div className="todo-list">
            {todoItems.map((item) => {
              const isCompleted = visitedSections.includes(item.id);
              const Icon = item.icon;
              return (
                <div 
                  key={item.id} 
                  className={`todo-item ${isCompleted ? 'completed' : ''}`}
                  onClick={() => scrollToSection(item.id)}
                >
                  {isCompleted ? (
                    <CheckCircle2 size={18} className="todo-icon" />
                  ) : (
                    <Circle size={18} className="todo-icon" />
                  )}
                  <Icon size={16} className="todo-section-icon" />
                  <span className="todo-label">{item.label}</span>
                </div>
              );
            })}
          </div>
          <div className="todo-progress-bar">
            <div 
              className="todo-progress-fill" 
              style={{ width: `${(visitedSections.length / todoItems.length) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Thanks Popup */}
      {showThanksPopup && (
        <div className="thanks-popup-overlay">
          <div className="thanks-popup">
            <h2>Thank You for Exploring!</h2>
            <p>You've visited all sections of my portfolio.</p>
            <p className="thanks-message">I appreciate your time and interest!</p>
          </div>
        </div>
      )}

      {/* Background Animations */}
      <div className="bg-animations">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      {/* Dynamic Island Music Player */}
      <div className="dynamic-island" onClick={() => {
        if (audioPlayer && audioPlayer.togglePlayer) {
          audioPlayer.togglePlayer();
        } else {
          setShowMusicPlayer(!showMusicPlayer);
        }
      }}>
        <div className="island-content">
          <div className="island-icon">
            <Music size={16} />
          </div>
          <div className="island-info">
            <div className="island-song-name">{currentSong}</div>
            <div className="island-progress">
              <div className="island-progress-fill" style={{ width: `${(currentTime / 180) * 100}%` }}></div>
            </div>
          </div>
          <button className="island-play" onClick={(e) => { e.stopPropagation(); handlePlayPause(); }}>
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
        </div>
      </div>

      {/* Music Player Popup */}
      {showMusicPlayer && (
        <div className="music-player-popup">
          <div className="music-player-header">
            <h3>Music Player</h3>
            <button className="close-btn" onClick={() => setShowMusicPlayer(false)}>×</button>
          </div>
          
          <div className="music-player-content">
            <button className="music-option-btn spotify-btn" onClick={handleSpotifyConnect}>
              <Music size={20} />
              Connect Spotify
            </button>
            
            <div className="divider">OR</div>
            
            <button className="music-option-btn random-btn" onClick={handleRandomMusic}>
              <Play size={20} />
              Play Random Music
            </button>
            
            <div className="divider">OR</div>
            
            <div className="search-music">
              <input 
                type="text" 
                placeholder="Search for music..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchYouTube()}
                className="music-search-input"
              />
              <button className="search-btn" onClick={searchYouTube}>
                Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* YouTube Search Results */}
      {showYoutubeResults && youtubeResults.length > 0 && (
        <div className="youtube-results-overlay" onClick={() => setShowYoutubeResults(false)}>
          <div className="youtube-results-container" onClick={(e) => e.stopPropagation()}>
            <div className="youtube-results-header">
              <h3>YouTube Results</h3>
              <button className="close-btn" onClick={() => setShowYoutubeResults(false)}>×</button>
            </div>
            <div className="youtube-results-list">
              {youtubeResults.map((video) => (
                <div 
                  key={video.id} 
                  className="youtube-result-item"
                  onClick={() => handleYouTubeSelect(video)}
                >
                  <img src={video.thumbnail} alt={video.title} className="youtube-thumbnail" />
                  <div className="youtube-info">
                    <div className="youtube-title">{video.title}</div>
                    <div className="youtube-channel">{video.channel}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Dock Prompt Text */}
      <div className={`dock-prompt ${showDock ? 'show' : ''}`}>
        Keep your cursor here
      </div>

      {/* macOS-style Dock Navigation */}
      <nav className={`dock-navigation ${showDock ? 'show' : ''}`}>
        <button 
          onClick={() => scrollToSection('about')} 
          className={`dock-item ${activeSection === 'about' ? 'active' : ''}`}
          title="About"
        >
          <User size={24} />
          <span className="dock-label">About</span>
        </button>
        <button 
          onClick={() => scrollToSection('skills')} 
          className={`dock-item ${activeSection === 'skills' ? 'active' : ''}`}
          title="Skills"
        >
          <Wrench size={24} />
          <span className="dock-label">Skills</span>
        </button>
        <button 
          onClick={() => scrollToSection('projects')} 
          className={`dock-item ${activeSection === 'projects' ? 'active' : ''}`}
          title="Projects"
        >
          <FolderOpen size={24} />
          <span className="dock-label">Projects</span>
        </button>
        <button 
          onClick={() => scrollToSection('contact')} 
          className={`dock-item ${activeSection === 'contact' ? 'active' : ''}`}
          title="Contact"
        >
          <MessageCircle size={24} />
          <span className="dock-label">Contact</span>
        </button>
        <a href="/" className="dock-item" title="Terminal">
          <Home size={24} />
          <span className="dock-label">Terminal</span>
        </a>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section */}
        <section id="home" className="hero-section section-animate">
          <div className="hero-content-overlay">
            <div className="hero-badge">Full-Stack Developer</div>
            <h1 className="hero-title">
              {animatedText}
              <span className="cursor-blink">|</span>
            </h1>
            <p className="hero-subtitle">{portfolioData.title}</p>
            <p className="hero-motto">{portfolioData.philosophy}</p>
            <div className="hero-buttons">
              <button onClick={() => scrollToSection('projects')} className="btn-primary">
                <Briefcase size={18} />
                View Work
              </button>
              <button onClick={() => window.open(portfolioData.github, '_blank')} className="btn-secondary">
                <Github size={18} />
                GitHub
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">27+</div>
                <div className="stat-label">Repos</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">9+</div>
                <div className="stat-label">Projects</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">15+</div>
                <div className="stat-label">Skills</div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section section-animate">
          <h2 className="section-title">About Me</h2>
          <div className="about-card">
            <p className="about-intro">{portfolioData.bio}</p>
            <div className="about-grid">
              <div className="about-item">
                <span className="about-label">Location</span>
                <span className="about-value">{portfolioData.location}</span>
              </div>
              <div className="about-item">
                <span className="about-label">Education</span>
                <span className="about-value">{portfolioData.education}</span>
              </div>
              <div className="about-item">
                <span className="about-label">Status</span>
                <span className="about-status">{portfolioData.currentFocus.availability}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="skills-section section-animate">
          <h2 className="section-title">Technical Skills</h2>
          <div className="spring-cards-grid">
            <SpringCard
              title="Languages"
              description="Core programming languages I use to build applications and solve problems."
              tech={portfolioData.skills.languages}
            />
            <SpringCard
              title="Frontend"
              description="Modern frameworks and tools for building responsive user interfaces."
              tech={portfolioData.skills.frontend}
            />
            <SpringCard
              title="Backend"
              description="Server-side technologies and databases for robust applications."
              tech={portfolioData.skills.backend}
            />
            <SpringCard
              title="Design"
              description="Creative tools for designing beautiful and functional interfaces."
              tech={portfolioData.skills.design}
            />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="projects-section section-animate">
          <h2 className="section-title">Featured Projects</h2>
          <div className="spring-cards-grid">
            {portfolioData.projects.map((project, index) => (
              <SpringCard
                key={index}
                title={project.name}
                description={project.description}
                tech={project.tech}
                link={project.github}
              />
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section section-animate">
          <h2 className="section-title">Get In Touch</h2>
          <p className="contact-intro">Let's build something amazing together!</p>
          <div className="contact-grid">
            <a href={`mailto:${portfolioData.email}`} className="contact-card">
              <Mail className="contact-icon" />
              <span>Email</span>
            </a>
            <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer" className="contact-card">
              <Linkedin className="contact-icon" />
              <span>LinkedIn</span>
            </a>
            <a href={portfolioData.github} target="_blank" rel="noopener noreferrer" className="contact-card">
              <Github className="contact-icon" />
              <span>GitHub</span>
            </a>
            <a href={portfolioData.instagram} target="_blank" rel="noopener noreferrer" className="contact-card">
              <Instagram className="contact-icon" />
              <span>Instagram</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Professional;