import React, { useState, useEffect, useRef } from 'react';
import { Calendar, GitCommit, Star, Zap, Shield } from 'lucide-react';

const ScrollingElevatorChangelog = () => {
  const [currentFloor, setCurrentFloor] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const containerRef = useRef(null);

  // Changelog data with individual commits
  const changelogData = [
    {
      version: "v1.0.0",
      date: "2024-01-15",
      title: "Initial Release",
      type: "major",
      commits: [
        { id: "a1b2c3d", message: "🎉 Initial project setup and configuration", author: "Alice Chen", time: "10:30 AM" },
        { id: "e4f5g6h", message: "✨ Implement core authentication system", author: "Bob Martinez", time: "2:15 PM" },
        { id: "i7j8k9l", message: "🎨 Add responsive UI framework", author: "Carol Kim", time: "4:45 PM" },
        { id: "m1n2o3p", message: "📱 Mobile layout optimizations", author: "David Johnson", time: "9:20 AM" },
        { id: "q4r5s6t", message: "🔧 Database schema initialization", author: "Eve Rodriguez", time: "11:55 AM" }
      ]
    },
    {
      version: "v1.1.0",
      date: "2024-02-20",
      title: "Feature Enhancement",
      type: "minor",
      commits: [
        { id: "u7v8w9x", message: "🔍 Add advanced search with filters", author: "Frank Thompson", time: "1:30 PM" },
        { id: "y1z2a3b", message: "🌙 Implement dark mode toggle", author: "Grace Liu", time: "3:45 PM" },
        { id: "c4d5e6f", message: "⚡ Optimize database queries for speed", author: "Henry Davis", time: "10:15 AM" },
        { id: "g7h8i9j", message: "🐛 Fix session timeout issues", author: "Iris Wilson", time: "5:20 PM" },
        { id: "k1l2m3n", message: "📊 Add basic analytics tracking", author: "Jack Brown", time: "8:30 AM" }
      ]
    },
    {
      version: "v1.2.0",
      date: "2024-03-10",
      title: "User Experience Update",
      type: "minor",
      commits: [
        { id: "o4p5q6r", message: "👥 Build user profile management", author: "Kate Miller", time: "2:10 PM" },
        { id: "s7t8u9v", message: "🔔 Implement push notification system", author: "Liam Garcia", time: "4:25 PM" },
        { id: "w1x2y3z", message: "📊 Create interactive dashboard", author: "Mia Taylor", time: "9:45 AM" },
        { id: "a4b5c6d", message: "🎯 Improve navigation with breadcrumbs", author: "Noah Anderson", time: "11:30 AM" },
        { id: "e7f8g9h", message: "🎨 Enhance UI component library", author: "Olivia Thomas", time: "3:15 PM" }
      ]
    },
    {
      version: "v1.3.1",
      date: "2024-04-05",
      title: "Security Patches",
      type: "patch",
      commits: [
        { id: "i1j2k3l", message: "🔐 Add two-factor authentication", author: "Paul Jackson", time: "10:45 AM" },
        { id: "m4n5o6p", message: "🐛 Fix critical XSS vulnerability", author: "Quinn White", time: "1:20 PM" },
        { id: "q7r8s9t", message: "⚡ Improve page load performance", author: "Ruby Harris", time: "3:50 PM" },
        { id: "u1v2w3x", message: "🔄 Update dependency versions", author: "Sam Clark", time: "8:15 AM" }
      ]
    },
    {
      version: "v2.0.0",
      date: "2024-05-15",
      title: "Major Redesign",
      type: "major",
      commits: [
        { id: "y4z5a6b", message: "🎨 Complete UI/UX redesign", author: "Tina Rodriguez", time: "9:30 AM" },
        { id: "c7d8e9f", message: "🤖 Integrate AI recommendation engine", author: "Uma Patel", time: "11:45 AM" },
        { id: "g1h2i3j", message: "☁️ Implement real-time sync", author: "Victor Kim", time: "2:30 PM" },
        { id: "k4l5m6n", message: "📈 Build advanced analytics suite", author: "Wendy Chen", time: "4:15 PM" },
        { id: "o7p8q9r", message: "🔄 Launch API v2 with improvements", author: "Xavier Lopez", time: "5:45 PM" }
      ]
    },
    {
      version: "v2.1.0",
      date: "2024-06-12",
      title: "Smart Automation",
      type: "minor",
      commits: [
        { id: "s1t2u3v", message: "🧠 Add ML-powered content suggestions", author: "Yara Wilson", time: "10:20 AM" },
        { id: "w4x5y6z", message: "🔄 Automate workflow management", author: "Zoe Taylor", time: "1:10 PM" },
        { id: "a7b8c9d", message: "📱 Enable progressive web app features", author: "Adam Johnson", time: "3:35 PM" },
        { id: "e1f2g3h", message: "🎯 Smart notification prioritization", author: "Bella Martinez", time: "5:00 PM" }
      ]
    },
    {
      version: "v2.2.1",
      date: "2024-07-08",
      title: "Bug Fixes",
      type: "patch",
      commits: [
        { id: "i4j5k6l", message: "🐛 Fix memory leak in dashboard", author: "Carl Davis", time: "9:15 AM" },
        { id: "m7n8o9p", message: "🔧 Resolve API timeout issues", author: "Dana Garcia", time: "11:40 AM" },
        { id: "q1r2s3t", message: "⚡ Optimize mobile performance", author: "Ethan Brown", time: "2:25 PM" },
        { id: "u4v5w6x", message: "🔐 Patch security vulnerability", author: "Fiona Miller", time: "4:50 PM" }
      ]
    },
    {
      version: "v3.0.0",
      date: "2024-09-20",
      title: "Platform Revolution",
      type: "major",
      commits: [
        { id: "y7z8a9b", message: "🚀 Complete platform architecture rebuild", author: "George Anderson", time: "8:00 AM" },
        { id: "c1d2e3f", message: "⚡ Implement 10x performance improvements", author: "Hannah Thomas", time: "10:30 AM" },
        { id: "g4h5i6j", message: "🌐 Deploy global CDN infrastructure", author: "Ian Jackson", time: "1:15 PM" },
        { id: "k7l8m9n", message: "🎨 Launch customizable interface builder", author: "Julia White", time: "3:45 PM" },
        { id: "o1p2q3r", message: "🔌 Create extensible plugin ecosystem", author: "Kevin Harris", time: "5:30 PM" }
      ]
    }
  ];

  const totalFloors = changelogData.length;

  const getVersionColor = (type) => {
    switch (type) {
      case 'major': return {
        bg: 'linear-gradient(to right, #ef4444, #ea580c)',
        border: '#f87171',
        text: '#fef2f2',
        icon: '#fca5a5'
      };
      case 'minor': return {
        bg: 'linear-gradient(to right, #3b82f6, #4f46e5)', 
        border: '#60a5fa',
        text: '#eff6ff',
        icon: '#93c5fd'
      };
      case 'patch': return {
        bg: 'linear-gradient(to right, #10b981, #059669)',
        border: '#34d399', 
        text: '#f0fdf4',
        icon: '#6ee7b7'
      };
      default: return {
        bg: 'linear-gradient(to right, #8b5cf6, #ec4899)',
        border: '#a78bfa',
        text: '#faf5ff', 
        icon: '#c4b5fd'
      };
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'major': return <Star style={{width: '20px', height: '20px'}} />;
      case 'minor': return <Zap style={{width: '20px', height: '20px'}} />;
      case 'patch': return <Shield style={{width: '20px', height: '20px'}} />;
      default: return <GitCommit style={{width: '20px', height: '20px'}} />;
    }
  };

  // Handle scroll to change floors
  useEffect(() => {
    const handleScroll = () => {
      if (isMoving) return;
      
      const container = containerRef.current;
      if (!container) return;
      
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const totalHeight = container.scrollHeight - containerHeight;
      
      if (totalHeight <= 0) return;
      
      const scrollPercent = scrollTop / totalHeight;
      const targetFloor = Math.round(scrollPercent * (totalFloors - 1));
      
      if (targetFloor !== currentFloor) {
        setCurrentFloor(targetFloor);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [currentFloor, isMoving, totalFloors]);

  // Auto-scroll to floor when clicking floor indicators
  const scrollToFloor = (targetFloor) => {
    if (isMoving) return;
    
    setIsMoving(true);
    setCurrentFloor(targetFloor); // Immediately update floor for visual feedback
    
    const container = containerRef.current;
    if (!container) return;
    
    const containerHeight = container.clientHeight;
    const totalHeight = container.scrollHeight - containerHeight;
    const targetScroll = (targetFloor / (totalFloors - 1)) * totalHeight;
    
    container.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
    
    // Reset moving state after animation completes
    setTimeout(() => {
      setIsMoving(false);
      // Double-check floor position after scroll animation
      const finalScrollTop = container.scrollTop;
      const finalScrollPercent = finalScrollTop / totalHeight;
      const finalFloor = Math.round(finalScrollPercent * (totalFloors - 1));
      if (finalFloor !== targetFloor) {
        setCurrentFloor(finalFloor);
      }
    }, 1000);
  };

  const styles = {
    container: {
      height: '100vh',
      width: '100vw',
      background: 'linear-gradient(to bottom right, #0f172a, #1f2937, #0f172a)',
      color: 'white',
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0
    },
    mainFlex: {
      width: '100%',
      height: '100%',
      display: 'flex',
      padding: '20px',
      boxSizing: 'border-box'
    },
    elevatorShaft: {
      width: '33.333333%',
      position: 'relative'
    },
    shaftContainer: {
      backgroundColor: '#1f2937',
      borderRadius: '8px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      border: '4px solid #374151'
    },
    shaftBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(to bottom, #374151, #1f2937)'
    },
    shaftLines: {
      position: 'absolute',
      left: 0,
      right: 0,
      borderTop: '1px solid #4b5563',
      opacity: 0.3
    },
    floorIndicators: {
      position: 'absolute',
      left: '16px',
      top: 0,
      bottom: 0,
      padding: '20px 0'
    },
    floorButton: {
      position: 'absolute',
      width: '40px',
      height: '40px',
      borderRadius: '8px',
      border: '2px solid',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      transform: 'translateY(-50%)'
    },
    floorButtonInactive: {
      backgroundColor: '#374151',
      borderColor: '#6b7280',
      color: '#d1d5db'
    },
    elevatorCar: {
      position: 'absolute',
      width: '64px',
      height: '80px',
      background: 'linear-gradient(to bottom, #fbbf24, #d97706)',
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.7s ease-in-out',
      border: '2px solid #fcd34d',
      right: '20px',
      transform: 'translateY(50%)'
    },
    elevatorInterior: {
      position: 'absolute',
      top: '4px',
      left: '4px',
      right: '4px',
      bottom: '4px',
      background: 'linear-gradient(to bottom, #fcd34d, #f59e0b)',
      borderRadius: '4px',
      display: 'flex',
      flexDirection: 'column'
    },
    elevatorCeiling: {
      width: '100%',
      height: '8px',
      backgroundColor: '#d97706',
      borderRadius: '4px 4px 0 0',
      marginBottom: '4px'
    },
    elevatorPassenger: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    elevatorLight: {
      width: '16px',
      height: '4px',
      backgroundColor: '#ef4444',
      borderRadius: '2px',
      margin: '0 auto 4px',
      opacity: 0.8
    },
    elevatorCable: {
      position: 'absolute',
      top: '-100%',
      left: '50%',
      width: '4px',
      backgroundColor: '#4b5563',
      height: '100%'
    },
    floorDisplay: {
      position: 'absolute',
      bottom: '16px',
      left: '80px',
      right: '16px',
      backgroundColor: '#1f2937',
      borderRadius: '8px',
      padding: '12px',
      border: '1px solid #4b5563'
    },
    floorDisplayText: {
      textAlign: 'center'
    },
    changelogContainer: {
      width: '66.666667%',
      marginLeft: '20px',
      height: '100%'
    },
    changelogPanel: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(16px)',
      borderRadius: '12px',
      height: '100%',
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      display: 'flex',
      flexDirection: 'column'
    },
    header: {
      padding: '20px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      flexShrink: 0
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '8px',
      background: 'linear-gradient(to right, #fbbf24, #f59e0b)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    subtitle: {
      color: '#d1d5db',
      fontSize: '14px'
    },
    scrollableContent: {
      flex: 1,
      overflowY: 'auto',
      scrollbarWidth: 'thin',
      scrollbarColor: '#4b5563 transparent'
    },
    floorContent: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    },
    floorContentInner: {
      width: '100%',
      maxWidth: '1024px',
      transition: 'all 0.7s ease'
    },
    versionHeader: {
      borderRadius: '12px',
      padding: '16px',
      marginBottom: '16px',
      border: '2px solid',
      opacity: 0.9
    },
    versionHeaderTop: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px'
    },
    versionHeaderLeft: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    versionNumber: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: 'white'
    },
    versionBadge: {
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '500',
      backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    versionHeaderRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: 'rgba(255, 255, 255, 0.8)'
    },
    versionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: 'white',
      marginBottom: '8px'
    },
    versionDescription: {
      fontSize: '14px'
    },
    commitsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    commitItem: {
      backgroundColor: 'rgba(31, 41, 55, 0.8)',
      backdropFilter: 'blur(4px)',
      borderRadius: '8px',
      padding: '16px',
      border: '1px solid #374151',
      transition: 'all 0.3s ease'
    },
    commitItemHover: {
      borderColor: '#4b5563'
    },
    commitContent: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '16px'
    },
    commitIcon: {
      flexShrink: 0,
      marginTop: '4px'
    },
    commitDetails: {
      flexGrow: 1
    },
    commitMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '8px'
    },
    commitHash: {
      fontSize: '14px',
      color: '#fbbf24',
      backgroundColor: '#1f2937',
      padding: '4px 8px',
      borderRadius: '4px',
      fontFamily: 'monospace'
    },
    commitAuthor: {
      fontSize: '14px',
      color: '#9ca3af'
    },
    commitTime: {
      fontSize: '14px',
      color: '#6b7280'
    },
    commitMessage: {
      color: 'white',
      fontSize: '18px',
      lineHeight: '1.6'
    },
    floorNavigation: {
      textAlign: 'center',
      marginTop: '32px',
      color: '#9ca3af'
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes elevator-move {
            0%, 100% { transform: translateY(50%); }
            50% { transform: translateY(50%) scale(1.05); }
          }
          
          @keyframes floor-ding {
            0%, 100% { transform: translateY(-50%) scale(1); }
            50% { transform: translateY(-50%) scale(1.1); box-shadow: 0 0 20px rgba(251, 191, 36, 0.5); }
          }
        `}
      </style>
      <div style={styles.mainFlex}>
        
        {/* Elevator Shaft */}
        <div style={styles.elevatorShaft}>
          <div style={styles.shaftContainer}>
            
            {/* Elevator Shaft Background */}
            <div style={styles.shaftBackground}>
              {/* Shaft grid lines */}
              {Array.from({ length: 20 }, (_, i) => (
                <div 
                  key={i} 
                  style={{...styles.shaftLines, top: `${i * 5}%`}}
                />
              ))}
            </div>

            {/* Floor Indicators - Floor 1 at bottom, Floor 8 at top */}
            <div style={styles.floorIndicators}>
              {changelogData.map((data, index) => {
                const colors = getVersionColor(data.type);
                const floorNumber = index + 1;
                // Floor 1 (index 0) at bottom, Floor 8 (index 7) at top
                const topPosition = ((changelogData.length - 1 - index) / (changelogData.length - 1)) * 84 + 8;
                
                const isActive = currentFloor === index;
                const buttonStyle = {
                  ...styles.floorButton,
                  ...(isActive ? {
                    background: colors.bg,
                    borderColor: colors.border,
                    color: 'white',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    animation: isMoving && currentFloor === index ? 'floor-ding 0.8s ease-in-out' : 'none'
                  } : {
                    ...styles.floorButtonInactive,
                    ':hover': {
                      borderColor: '#9ca3af'
                    }
                  }),
                  top: `${topPosition}%`,
                  opacity: isMoving ? 0.7 : 1,
                  cursor: isMoving ? 'not-allowed' : 'pointer',
                  transition: isActive ? 'all 0.3s ease, animation 0.8s ease-in-out' : 'all 0.3s ease'
                };
                
                return (
                  <button
                    key={index}
                    onClick={() => scrollToFloor(index)}
                    style={buttonStyle}
                    disabled={isMoving}
                  >
                    {floorNumber}
                  </button>
                );
              })}
            </div>

            {/* Elevator Car with GitHub passenger */}
            <div 
              style={{
                ...styles.elevatorCar,
                // Floor 1 (index 0) at bottom, Floor 8 (index 7) at top
                top: `${8 + ((changelogData.length - 1 - currentFloor) / (totalFloors - 1)) * 84}%`,
                animation: isMoving ? 'elevator-move 0.8s ease-in-out' : 'none',
                transition: isMoving ? 'none' : 'all 0.7s ease-in-out'
              }}
            >
              {/* Elevator Interior */}
              <div style={styles.elevatorInterior}>
                {/* Elevator ceiling indicator */}
                <div style={styles.elevatorCeiling}></div>
                
                {/* GitHub logo passenger */}
                <div style={styles.elevatorPassenger}>
                  <svg 
                    width="32" 
                    height="32" 
                    viewBox="0 0 24 24" 
                    fill="#1f2937"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </div>
                
                {/* Floor indicator light */}
                <div style={styles.elevatorLight}></div>
              </div>
              
              {/* Elevator cables */}
              <div style={{...styles.elevatorCable, transform: 'translateX(-50%)'}}></div>
              <div style={{...styles.elevatorCable, transform: 'translateX(-50%) translateX(8px)'}}></div>
            </div>

            {/* Floor Display */}
            <div style={styles.floorDisplay}>
              <div style={styles.floorDisplayText}>
                <div style={{fontSize: '12px', color: '#9ca3af'}}>Current Floor</div>
                <div style={{
                  fontSize: '18px', 
                  fontWeight: 'bold', 
                  color: '#fbbf24',
                  transition: 'all 0.3s ease',
                  transform: isMoving ? 'scale(1.1)' : 'scale(1)'
                }}>{currentFloor + 1}</div>
                <div style={{fontSize: '12px', color: '#9ca3af'}}>{changelogData[currentFloor]?.version}</div>
              </div>
              <div style={{fontSize: '12px', textAlign: 'center', color: '#9ca3af', marginTop: '4px'}}>
                {isMoving ? '🔔 Ding! Moving...' : 'Click floor or scroll to navigate'}
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Changelog Display */}
        <div style={styles.changelogContainer}>
          <div style={styles.changelogPanel}>
            <div style={styles.header}>
              <h1 style={styles.title}>
                GitHub Changelog Elevator
              </h1>
              <p style={styles.subtitle}>Start at Floor 1 (v1.0.0) and ride up to Floor 8 (v3.0.0)! 🐱</p>
            </div>

            {/* Scrollable Content - Start from v1.0.0 at top, scroll down to v3.0.0 */}
            <div 
              ref={containerRef}
              style={styles.scrollableContent}
            >
              {changelogData.map((release, index) => {
                const colors = getVersionColor(release.type);
                const isCurrentFloor = currentFloor === index;
                
                return (
                  <div 
                    key={index}
                    style={styles.floorContent}
                  >
                    <div style={{
                      ...styles.floorContentInner,
                      opacity: isCurrentFloor ? 1 : 0.7,
                      transform: isCurrentFloor ? 'scale(1)' : 'scale(0.95)'
                    }}>
                      {/* Version Header */}
                      <div style={{
                        ...styles.versionHeader,
                        background: colors.bg,
                        borderColor: colors.border
                      }}>
                        <div style={styles.versionHeaderTop}>
                          <div style={styles.versionHeaderLeft}>
                            <div style={{color: colors.icon}}>
                              {getTypeIcon(release.type)}
                            </div>
                            <h2 style={styles.versionNumber}>{release.version}</h2>
                            <span style={{
                              ...styles.versionBadge,
                              color: colors.text
                            }}>
                              {release.type}
                            </span>
                          </div>
                          <div style={styles.versionHeaderRight}>
                            <Calendar style={{width: '20px', height: '20px'}} />
                            <span style={{fontSize: '18px'}}>{release.date}</span>
                          </div>
                        </div>
                        
                        <h3 style={styles.versionTitle}>
                          {release.title}
                        </h3>
                        <p style={{
                          ...styles.versionDescription,
                          color: colors.text
                        }}>
                          {release.commits.length} commits in this release
                        </p>
                      </div>

                      {/* Commits */}
                      <div style={styles.commitsContainer}>
                        {release.commits.map((commit, commitIndex) => (
                          <div 
                            key={commit.id}
                            style={{
                              ...styles.commitItem,
                              animationDelay: `${commitIndex * 100}ms`
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.borderColor = styles.commitItemHover.borderColor;
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.borderColor = '#374151';
                            }}
                          >
                            <div style={styles.commitContent}>
                              <div style={styles.commitIcon}>
                                <GitCommit style={{width: '20px', height: '20px', color: '#9ca3af'}} />
                              </div>
                              <div style={styles.commitDetails}>
                                <div style={styles.commitMeta}>
                                  <code style={styles.commitHash}>
                                    {commit.id}
                                  </code>
                                  <span style={styles.commitAuthor}>
                                    by {commit.author}
                                  </span>
                                  <span style={styles.commitTime}>
                                    {commit.time}
                                  </span>
                                </div>
                                <p style={styles.commitMessage}>
                                  {commit.message}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Floor Navigation Hint */}
                      <div style={styles.floorNavigation}>
                        <p>Floor {index + 1} of {totalFloors}</p>
                        <p style={{fontSize: '14px'}}>
                          {index === 0 
                            ? "You're on Floor 1 with the initial release! Scroll down to explore newer versions." 
                            : index === totalFloors - 1
                              ? "You've reached Floor 8 with the latest release! Scroll up to go back."
                              : "Continue scrolling to explore more releases"
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollingElevatorChangelog;