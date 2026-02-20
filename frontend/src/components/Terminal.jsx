import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { portfolioData, asciiArt, welcomeMessage } from '../data/mock';
import './Terminal.css';

const Terminal = ({ onNavigateToProfessional }) => {
  const [history, setHistory] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Set page title
    document.title = 'Rajat Pandey';
    // Show welcome message on mount
    const welcomeLines = [
      { type: 'ascii', content: asciiArt },
      ...welcomeMessage.map(msg => ({ type: 'output', content: msg }))
    ];
    setHistory(welcomeLines);
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const typeText = async (text, callback) => {
    setIsTyping(true);
    const words = text.split('');
    let displayText = '';
    
    for (let i = 0; i < words.length; i++) {
      displayText += words[i];
      await new Promise(resolve => setTimeout(resolve, 10));
      callback(displayText);
    }
    setIsTyping(false);
  };

  const handleCommand = async (cmd) => {
    const command = cmd.trim().toLowerCase();
    
    setHistory(prev => [...prev, { type: 'command', content: `$ ${cmd}` }]);

    let output = [];

    switch (command) {
      case 'help':
        output = [
          '',
          'Available Commands:',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          '',
          '  about         - Learn about me',
          '  skills        - View my technical skills',
          '  projects      - See my projects',
          '  contact       - Get my contact information',
          '  resume        - View my resume/GitHub',
          '  professional  - Open professional portfolio',
          '  clear         - Clear terminal screen',
          '  help          - Show this help message',
          '',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          ''
        ];
        break;

      case 'about':
        output = [
          '',
          '👤 About Me',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          '',
          `Name: ${portfolioData.name}`,
          `Username: ${portfolioData.username}`,
          `Title: ${portfolioData.title}`,
          `Location: ${portfolioData.location}`,
          `Education: ${portfolioData.education}`,
          '',
          '📖 Bio:',
          portfolioData.bio,
          '',
          `💭 Philosophy: ${portfolioData.philosophy}`,
          `⚡ Fun Fact: ${portfolioData.funFact}`,
          '',
          '🎯 Current Focus:',
          '',
          'Learning:',
          ...portfolioData.currentFocus.learning.map(item => `  • ${item}`),
          '',
          'Building:',
          ...portfolioData.currentFocus.building.map(item => `  • ${item}`),
          '',
          `Status: ${portfolioData.currentFocus.availability}`,
          '',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          ''
        ];
        break;

      case 'skills':
        output = [
          '',
          '🛠️ Technical Skills',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          '',
          '💻 Languages:',
          `  ${portfolioData.skills.languages.join(' • ')}`,
          '',
          '🎨 Frontend:',
          `  ${portfolioData.skills.frontend.join(' • ')}`,
          '',
          '⚙️ Backend & Databases:',
          `  ${portfolioData.skills.backend.join(' • ')}`,
          '',
          '🎨 Design & Creative:',
          `  ${portfolioData.skills.design.join(' • ')}`,
          '',
          '🔧 DevOps & Tools:',
          `  ${portfolioData.skills.tools.join(' • ')}`,
          '',
          '📚 Currently Learning:',
          `  ${portfolioData.skills.learning.join(' • ')}`,
          '',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          ''
        ];
        break;

      case 'projects':
        output = [
          '',
          '🚀 Featured Projects',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          ''
        ];
        portfolioData.projects.forEach((project, index) => {
          output.push(
            `${project.emoji} ${project.name}`,
            `   ${project.description}`,
            `   Tech: ${project.tech.join(', ')}`,
            `   GitHub: ${project.github}`,
            ''
          );
        });
        output.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', '');
        break;

      case 'contact':
        output = [
          '',
          '📬 Contact Information',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          '',
          `📧 Email: ${portfolioData.email}`,
          `💼 LinkedIn: ${portfolioData.linkedin}`,
          `🐙 GitHub: ${portfolioData.github}`,
          `📸 Instagram: ${portfolioData.instagram}`,
          `❓ Stack Overflow: ${portfolioData.stackoverflow}`,
          '',
          "Let's build something amazing together! 🚀",
          '',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          ''
        ];
        break;

      case 'resume':
        output = [
          '',
          '📄 Resume',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          '',
          'Opening GitHub profile...',
          `GitHub: ${portfolioData.github}`,
          '',
          'Tip: Check out my pinned repositories for my best work!',
          '',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          ''
        ];
        setTimeout(() => {
          window.open(portfolioData.github, '_blank');
        }, 500);
        break;

      case 'professional':
        output = [
          '',
          '💼 Professional Portfolio',
          '────────────────────────────────────────',
          '',
          'Opening professional portfolio...',
          '',
          'Redirecting to modern portfolio view...',
          '',
          '────────────────────────────────────────',
          ''
        ];
        setTimeout(() => {
          if (onNavigateToProfessional) {
            onNavigateToProfessional();
          } else {
            navigate('/professional');
          }
        }, 1000);
        break;

      case 'clear':
        setHistory([]);
        return;

      case '':
        return;

      default:
        output = [
          '',
          `Command not found: ${cmd}`,
          "Type 'help' to see available commands",
          ''
        ];
    }

    output.forEach(line => {
      setHistory(prev => [...prev, { type: 'output', content: line }]);
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && currentInput.trim() !== '' && !isTyping) {
      handleCommand(currentInput);
      setCurrentInput('');
    }
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="terminal-container" onClick={focusInput}>
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="btn-close"></span>
          <span className="btn-minimize"></span>
          <span className="btn-maximize"></span>
        </div>
        <div className="terminal-title">rajat@blazehue:~</div>
      </div>
      
      <div className="terminal-body" ref={terminalRef}>
        <div className="black-panther-container">
          <img 
            src="/profile-photo.jpg" 
            alt="Profile"
            className="black-panther-img"
          />
        </div>
        
        {history.map((item, index) => (
          <div key={index} className={`terminal-line ${item.type}`}>
            {item.type === 'ascii' ? (
              <pre className="ascii-art">{item.content}</pre>
            ) : item.type === 'command' ? (
              <div className="command-line">{item.content}</div>
            ) : (
              <div className="output-line">{item.content}</div>
            )}
          </div>
        ))}
        
        <div className="terminal-input-line">
          <span className="prompt">$ </span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            autoFocus
            disabled={isTyping}
          />
          <span className="cursor">_</span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;