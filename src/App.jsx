import React, { useState, useEffect, useRef } from 'react';
import { Calendar, GitCommit, Star, Zap, Shield } from 'lucide-react';
import axios from 'axios';

// Mock data - this can now be any length
const mockVersions = {
  versions: [
    {
      pr_title: "Initial Project Setup and Core Features",
      version: "v1.0.0",
      pr_description: "Setting up the foundation of our application with authentication, UI framework, and basic functionality. This PR establishes the core architecture and essential components needed for the initial release.",
      pr_reviewers: ["Alice Chen", "Bob Martinez", "Carol Kim"],
      pr_raiser: "David Johnson",
      commits: [
        { message: "🎉 Initial project setup and configuration", author: "Alice Chen", link: "https://github.com/company/repo/commit/a1b2c3d", id: "a1b2c3d" },
        { message: "✨ Implement core authentication system", author: "Bob Martinez", link: "https://github.com/company/repo/commit/e4f5g6h", id: "e4f5g6h" },
        { message: "🎨 Add responsive UI framework", author: "Carol Kim", link: "https://github.com/company/repo/commit/i7j8k9l", id: "i7j8k9l" },
        { message: "📱 Mobile layout optimizations", author: "David Johnson", link: "https://github.com/company/repo/commit/m1n2o3p", id: "m1n2o3p" },
        { message: "🔧 Database schema initialization", author: "Eve Rodriguez", link: "https://github.com/company/repo/commit/q4r5s6t", id: "q4r5s6t" }
      ]
    },
    {
      pr_title: "Enhanced Search and Dark Mode Features",
      version: "v1.1.0",
      pr_description: "Adding advanced search capabilities with filtering options and implementing a dark mode toggle. This update also includes performance optimizations and bug fixes for session management.",
      pr_reviewers: ["Frank Thompson", "Grace Liu"],
      pr_raiser: "Henry Davis",
      commits: [
        { message: "🔍 Add advanced search with filters", author: "Frank Thompson", link: "https://github.com/company/repo/commit/u7v8w9x", id: "u7v8w9x" },
        { message: "🌙 Implement dark mode toggle", author: "Grace Liu", link: "https://github.com/company/repo/commit/y1z2a3b", id: "y1z2a3b" },
        { message: "⚡ Optimize database queries for speed", author: "Henry Davis", link: "https://github.com/company/repo/commit/c4d5e6f", id: "c4d5e6f" },
        { message: "🐛 Fix session timeout issues", author: "Iris Wilson", link: "https://github.com/company/repo/commit/g7h8i9j", id: "g7h8i9j" },
        { message: "📊 Add basic analytics tracking", author: "Jack Brown", link: "https://github.com/company/repo/commit/k1l2m3n", id: "k1l2m3n" }
      ]
    },
    {
      pr_title: "User Profile Management and Dashboard Improvements",
      version: "v1.2.0",
      pr_description: "Introducing comprehensive user profile management with an interactive dashboard. This release includes push notifications, improved navigation with breadcrumbs, and enhanced UI components.",
      pr_reviewers: ["Kate Miller", "Liam Garcia", "Mia Taylor"],
      pr_raiser: "Noah Anderson",
      commits: [
        { message: "👥 Build user profile management", author: "Kate Miller", link: "https://github.com/company/repo/commit/o4p5q6r", id: "o4p5q6r" },
        { message: "🔔 Implement push notification system", author: "Liam Garcia", link: "https://github.com/company/repo/commit/s7t8u9v", id: "s7t8u9v" },
        { message: "📊 Create interactive dashboard", author: "Mia Taylor", link: "https://github.com/company/repo/commit/w1x2y3z", id: "w1x2y3z" },
        { message: "🎯 Improve navigation with breadcrumbs", author: "Noah Anderson", link: "https://github.com/company/repo/commit/a4b5c6d", id: "a4b5c6d" },
        { message: "🎨 Enhance UI component library", author: "Olivia Thomas", link: "https://github.com/company/repo/commit/e7f8g9h", id: "e7f8g9h" }
      ]
    },
    {
      pr_title: "Critical Security Updates and Performance Patches",
      version: "v1.3.1",
      pr_description: "Important security patches addressing XSS vulnerabilities and adding two-factor authentication. This patch also includes performance improvements and dependency updates.",
      pr_reviewers: ["Paul Jackson", "Quinn White", "Ruby Harris"],
      pr_raiser: "Sam Clark",
      commits: [
        { message: "🔐 Add two-factor authentication", author: "Paul Jackson", link: "https://github.com/company/repo/commit/i1j2k3l", id: "i1j2k3l" },
        { message: "🐛 Fix critical XSS vulnerability", author: "Quinn White", link: "https://github.com/company/repo/commit/m4n5o6p", id: "m4n5o6p" },
        { message: "⚡ Improve page load performance", author: "Ruby Harris", link: "https://github.com/company/repo/commit/q7r8s9t", id: "q7r8s9t" },
        { message: "🔄 Update dependency versions", author: "Sam Clark", link: "https://github.com/company/repo/commit/u1v2w3x", id: "u1v2w3x" }
      ]
    },
    {
      pr_title: "Complete UI Redesign with AI Integration",
      version: "v2.0.0",
      pr_description: "Major release featuring a complete UI/UX redesign with modern design principles. Integrates AI-powered recommendation engine, real-time synchronization, and advanced analytics suite with API v2.",
      pr_reviewers: ["Tina Rodriguez", "Uma Patel", "Victor Kim", "Wendy Chen"],
      pr_raiser: "Xavier Lopez",
      commits: [
        { message: "🎨 Complete UI/UX redesign", author: "Tina Rodriguez", link: "https://github.com/company/repo/commit/y4z5a6b", id: "y4z5a6b" },
        { message: "🤖 Integrate AI recommendation engine", author: "Uma Patel", link: "https://github.com/company/repo/commit/c7d8e9f", id: "c7d8e9f" },
        { message: "☁️ Implement real-time sync", author: "Victor Kim", link: "https://github.com/company/repo/commit/g1h2i3j", id: "g1h2i3j" },
        { message: "📈 Build advanced analytics suite", author: "Wendy Chen", link: "https://github.com/company/repo/commit/k4l5m6n", id: "k4l5m6n" },
        { message: "🔄 Launch API v2 with improvements", author: "Xavier Lopez", link: "https://github.com/company/repo/commit/o7p8q9r", id: "o7p8q9r" }
      ]
    },
    {
      pr_title: "Smart Automation and ML-Powered Features",
      version: "v2.1.0",
      pr_description: "Introducing machine learning powered content suggestions and automated workflow management. This release also enables progressive web app capabilities and smart notification prioritization.",
      pr_reviewers: ["Yara Wilson", "Zoe Taylor"],
      pr_raiser: "Adam Johnson",
      commits: [
        { message: "🧠 Add ML-powered content suggestions", author: "Yara Wilson", link: "https://github.com/company/repo/commit/s1t2u3v", id: "s1t2u3v" },
        { message: "🔄 Automate workflow management", author: "Zoe Taylor", link: "https://github.com/company/repo/commit/w4x5y6z", id: "w4x5y6z" },
        { message: "📱 Enable progressive web app features", author: "Adam Johnson", link: "https://github.com/company/repo/commit/a7b8c9d", id: "a7b8c9d" },
        { message: "🎯 Smart notification prioritization", author: "Bella Martinez", link: "https://github.com/company/repo/commit/e1f2g3h", id: "e1f2g3h" }
      ]
    },
    {
      pr_title: "Bug Fixes and Performance Optimizations",
      version: "v2.2.1",
      pr_description: "Critical bug fixes addressing memory leaks in the dashboard and API timeout issues. This patch also includes mobile performance optimizations and security vulnerability patches.",
      pr_reviewers: ["Carl Davis", "Dana Garcia", "Ethan Brown"],
      pr_raiser: "Fiona Miller",
      commits: [
        { message: "🐛 Fix memory leak in dashboard", author: "Carl Davis", link: "https://github.com/company/repo/commit/i4j5k6l", id: "i4j5k6l" },
        { message: "🔧 Resolve API timeout issues", author: "Dana Garcia", link: "https://github.com/company/repo/commit/m7n8o9p", id: "m7n8o9p" },
        { message: "⚡ Optimize mobile performance", author: "Ethan Brown", link: "https://github.com/company/repo/commit/q1r2s3t", id: "q1r2s3t" },
        { message: "🔐 Patch security vulnerability", author: "Fiona Miller", link: "https://github.com/company/repo/commit/u4v5w6x", id: "u4v5w6x" }
      ]
    },
    {
      pr_title: "Platform Architecture Revolution",
      version: "v3.0.0",
      pr_description: "Revolutionary platform architecture rebuild delivering 10x performance improvements. Features global CDN infrastructure, customizable interface builder, and extensible plugin ecosystem for maximum flexibility.",
      pr_reviewers: ["George Anderson", "Hannah Thomas", "Ian Jackson", "Julia White"],
      pr_raiser: "Kevin Harris",
      commits: [
        { message: "🚀 Complete platform architecture rebuild", author: "George Anderson", link: "https://github.com/company/repo/commit/y7z8a9b", id: "y7z8a9b" },
        { message: "⚡ Implement 10x performance improvements", author: "Hannah Thomas", link: "https://github.com/company/repo/commit/c1d2e3f", id: "c1d2e3f" },
        { message: "🌐 Deploy global CDN infrastructure", author: "Ian Jackson", link: "https://github.com/company/repo/commit/g4h5i6j", id: "g4h5i6j" },
        { message: "🎨 Launch customizable interface builder", author: "Julia White", link: "https://github.com/company/repo/commit/k7l8m9n", id: "k7l8m9n" },
        { message: "🔌 Create extensible plugin ecosystem", author: "Kevin Harris", link: "https://github.com/company/repo/commit/o1p2q3r", id: "o1p2q3r" }
      ]
    },
    {
      pr_title: "Latest Features and Improvements",
      version: "v3.1.0",
      pr_description: "Adding the latest features including enhanced user experience, improved performance metrics, and expanded API capabilities. This release focuses on scalability and user satisfaction.",
      pr_reviewers: ["Alice Chen", "Bob Martinez", "Carol Kim"],
      pr_raiser: "David Johnson",
      commits: [
        { message: "🚀 Enhanced user experience improvements", author: "Alice Chen", link: "https://github.com/company/repo/commit/a1b2c3d", id: "a1b2c3d" },
        { message: "📊 Performance metrics dashboard", author: "Bob Martinez", link: "https://github.com/company/repo/commit/e4f5g6h", id: "e4f5g6h" },
        { message: "🔧 Expanded API capabilities", author: "Carol Kim", link: "https://github.com/company/repo/commit/i7j8k9l", id: "i7j8k9l" },
        { message: "⚡ Scalability improvements", author: "David Johnson", link: "https://github.com/company/repo/commit/m1n2o3p", id: "m1n2o3p" },
        { message: "😊 User satisfaction enhancements", author: "Eve Rodriguez", link: "https://github.com/company/repo/commit/q4r5s6t", id: "q4r5s6t" }
      ]
    },
    {
      pr_title: "Initial Project Setup and Core Features",
      version: "v3.1.1",
      pr_description: "Setting up the foundation of our application with authentication, UI framework, and basic functionality. This PR establishes the core architecture and essential components needed for the initial release.",
      pr_reviewers: ["Alice Chen", "Bob Martinez", "Carol Kim"],
      pr_raiser: "David Johnson",
      commits: [
        { message: "🎉 Initial project setup and configuration", author: "Alice Chen", link: "https://github.com/company/repo/commit/a1b2c3d", id: "a1b2c3d" },
        { message: "✨ Implement core authentication system", author: "Bob Martinez", link: "https://github.com/company/repo/commit/e4f5g6h", id: "e4f5g6h" },
        { message: "🎨 Add responsive UI framework", author: "Carol Kim", link: "https://github.com/company/repo/commit/i7j8k9l", id: "i7j8k9l" },
        { message: "📱 Mobile layout optimizations", author: "David Johnson", link: "https://github.com/company/repo/commit/m1n2o3p", id: "m1n2o3p" },
        { message: "🔧 Database schema initialization", author: "Eve Rodriguez", link: "https://github.com/company/repo/commit/q4r5s6t", id: "q4r5s6t" }
      ]
    },
    {
      pr_title: "Enhanced Search and Dark Mode Features",
      version: "v4.0.0",
      pr_description: "Adding advanced search capabilities with filtering options and implementing a dark mode toggle. This update also includes performance optimizations and bug fixes for session management.",
      pr_reviewers: ["Frank Thompson", "Grace Liu"],
      pr_raiser: "Henry Davis",
      commits: [
        { message: "🔍 Add advanced search with filters", author: "Frank Thompson", link: "https://github.com/company/repo/commit/u7v8w9x", id: "u7v8w9x" },
        { message: "🌙 Implement dark mode toggle", author: "Grace Liu", link: "https://github.com/company/repo/commit/y1z2a3b", id: "y1z2a3b" },
        { message: "⚡ Optimize database queries for speed", author: "Henry Davis", link: "https://github.com/company/repo/commit/c4d5e6f", id: "c4d5e6f" },
        { message: "🐛 Fix session timeout issues", author: "Iris Wilson", link: "https://github.com/company/repo/commit/g7h8i9j", id: "g7h8i9j" },
        { message: "📊 Add basic analytics tracking", author: "Jack Brown", link: "https://github.com/company/repo/commit/k1l2m3n", id: "k1l2m3n" }
      ]
    },
    {
      pr_title: "User Profile Management and Dashboard Improvements",
      version: "v4.2.0",
      pr_description: "Introducing comprehensive user profile management with an interactive dashboard. This release includes push notifications, improved navigation with breadcrumbs, and enhanced UI components.",
      pr_reviewers: ["Kate Miller", "Liam Garcia", "Mia Taylor"],
      pr_raiser: "Noah Anderson",
      commits: [
        { message: "👥 Build user profile management", author: "Kate Miller", link: "https://github.com/company/repo/commit/o4p5q6r", id: "o4p5q6r" },
        { message: "🔔 Implement push notification system", author: "Liam Garcia", link: "https://github.com/company/repo/commit/s7t8u9v", id: "s7t8u9v" },
        { message: "📊 Create interactive dashboard", author: "Mia Taylor", link: "https://github.com/company/repo/commit/w1x2y3z", id: "w1x2y3z" },
        { message: "🎯 Improve navigation with breadcrumbs", author: "Noah Anderson", link: "https://github.com/company/repo/commit/a4b5c6d", id: "a4b5c6d" },
        { message: "🎨 Enhance UI component library", author: "Olivia Thomas", link: "https://github.com/company/repo/commit/e7f8g9h", id: "e7f8g9h" }
      ]
    }
  ]
};

const ScrollingElevatorChangelog = () => {

  const [changelogData, setChangelogData] = useState([])
  const [currentFloor, setCurrentFloor] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const containerRef = useRef(null);
  const bellRef = useRef(null); // <-- ADD THIS

  const API_URL = 'https://hackathon-autumn.mesh-dev.ucl.ac.uk/pull-request/v0.1/closed-pr/tc-wood/gitfloors-demo-repo';


  const fetchChangelogData = async () => {
    const token = "";
    if (!token) return;

    try {
      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data?.versions) {
        setChangelogData(res.data.versions); // replace mockVersions
      } else {
        console.warn('Unexpected API response:', res.data);
      }
    } catch (err) {
      console.error('Error fetching changelog data:', err);
    }
  };

  useEffect(() => {
    fetchChangelogData()
    // Simulate clicking the top floor after a short delay
    const timer = setTimeout(() => {
      scrollToFloor(totalFloors - 1);
    }, 500); // 500ms delay to allow DOM to mount

    return () => clearTimeout(timer);
  }, []); // empty dependency => runs once on mount




  const totalFloors = changelogData.length;

  // Dynamic calculations based on number of versions
  const getFloorPosition = (index) => {
    if (totalFloors <= 1) return 50; // Single item centered
    // Distribute floors evenly with padding from top and bottom
    const padding = 8; // 8% padding from top and bottom
    const availableSpace = 100 - (2 * padding);
    return padding + ((totalFloors - 1 - index) / (totalFloors - 1)) * availableSpace;
  };

  const getShaftGridLines = () => {
    // Generate appropriate number of grid lines based on total floors
    const lineCount = Math.max(10, totalFloors * 2);
    return Array.from({ length: lineCount }, (_, i) => i);
  };

  // Determine version type from version string
  const getVersionType = (version) => {
    if (version.includes('.0.0')) return 'major';
    if (version.includes('.0')) return 'minor';
    return 'patch';
  };

  const getVersionColor = (version) => {
    const type = getVersionType(version);
    switch (type) {
      case 'major': return {
        bg: '#0f198cff',
        border: '#0f198cff',
        text: '#ffffff',
        icon: '#ffffff'
      };
      case 'minor': return {
        bg: '#0b5aa9ff',
        border: '#0b5aa9ff',
        text: '#ffffff',
        icon: '#ffffff'
      };
      case 'patch': return {
        bg: '#4296d2ff',
        border: '#4296d2ff',
        text: '#ffffff',
        icon: '#ffffff'
      };
      default: return {
        bg: '#071c78ff',
        border: '#071c78ffx',
        text: '#ffffff',
        icon: '#ffffff'
      };
    }
  };

  const getTypeIcon = (version) => {
    const type = getVersionType(version);
    switch (type) {
      case 'major': return <Star style={{ width: '20px', height: '20px' }} />;
      case 'minor': return <Zap style={{ width: '20px', height: '20px' }} />;
      case 'patch': return <Shield style={{ width: '20px', height: '20px' }} />;
      default: return <GitCommit style={{ width: '20px', height: '20px' }} />;
    }
  };

  // Handle scroll to change floors
  const handleScroll = () => {
    if (isMoving) return;

    const container = containerRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    const floorElements = container.children;

    let newFloor = 0;
    for (let i = 0; i < floorElements.length; i++) {
      // Calculate offset relative to container, not the page
      const floorTop = floorElements[i].offsetTop - container.offsetTop;
      if (floorTop > scrollTop + 10) { // small buffer
        break;
      }
      newFloor = i;
    }

    if (newFloor !== currentFloor) {
      setCurrentFloor(newFloor);
    }
  };

  const scrollToFloor = (targetFloor) => {
    if (isMoving) return;

    const container = containerRef.current;
    if (!container) return;

    const floorElements = container.children;
    const targetTop = floorElements[targetFloor]?.offsetTop - container.offsetTop || 0;

    setIsMoving(true);
    setCurrentFloor(targetFloor);

    if (bellRef.current) {
      bellRef.current.currentTime = 0; // reset to start
      bellRef.current.play().catch(err => console.log("Bell blocked:", err));
    }

    container.scrollTo({
      top: targetTop,
      behavior: 'smooth'
    });

    setTimeout(() => {
      setIsMoving(false);
    }, 700);
  };

  // Add scroll event listener
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [currentFloor, isMoving]);

  const styles = {
    container: {
      height: '100vh',
      width: '100vw',
      background: 'linear-gradient(to bottom right, #0f172a, #1f2937, #0f172a)',
      color: 'white',
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0,
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
      background: '#fbbf24', // UCL Gold
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.7s ease-in-out',
      border: '2px solid #fcd34d',
      left: '72px', // Align with the floor buttons
      transform: 'translateY(-50%)'
    },
    elevatorInterior: {
      position: 'absolute',
      top: '4px',
      left: '4px',
      right: '4px',
      bottom: '4px',
      background: '#f59e0b', // Slightly darker gold
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
      height: '100'
    },
    floorDisplay: {
      position: 'absolute',
      top: '40%',
      right: '16px',
      backgroundColor: '#1f2937',
      borderRadius: '8px',
      padding: '12px',
      border: '1px solid #4b5563',
      width: "150px",
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
      color: '#fbbf24', // UCL Gold
      fontFamily: 'Arial, sans-serif'
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
            0%, 100% { transform: translateY(-50%); }
            50% { transform: translateY(-50%) scale(1.05); }
          }
          
          @keyframes floor-ding {
            0%, 100% { transform: translateY(-50%) scale(1); }
            50% { transform: translateY(-50%) scale(1.1); box-shadow: 0 0 20px rgba(251, 191, 36, 0.5); }
          }
        `}
      </style>
      <audio
        ref={bellRef}
        src="/elevator-ding.mp3"
        preload="auto"
      />
      <div style={styles.mainFlex}>

        {/* Elevator Shaft */}
        <div style={styles.elevatorShaft}>
          <div style={styles.shaftContainer}>

            {/* Elevator Shaft Background */}
            <div style={styles.shaftBackground}>
              {/* Dynamic shaft grid lines */}
              {getShaftGridLines().map((i) => (
                <div
                  key={i}
                  style={{ ...styles.shaftLines, top: `${(i / getShaftGridLines().length) * 100}%` }}
                />
              ))}
            </div>

            {/* Floor Indicators - Dynamic positioning */}
            <div style={styles.floorIndicators}>
              {changelogData.map((data, index) => {
                const colors = getVersionColor(data.version);
                const floorNumber = index + 1;
                const topPosition = getFloorPosition(index);

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

            {/* Elevator Car - Dynamic positioning */}
            <div
              style={{
                ...styles.elevatorCar,
                top: `${getFloorPosition(currentFloor)}%`,
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
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </div>

                {/* Floor indicator light */}
                <div style={styles.elevatorLight}></div>
              </div>

              {/* Elevator cables */}
              <div style={{ ...styles.elevatorCable, transform: 'translateX(-50%)' }}></div>
              <div style={{ ...styles.elevatorCable, transform: 'translateX(-50%) translateX(8px)' }}></div>
            </div>

            {/* Floor Display */}
            <div style={styles.floorDisplay}>
              <div style={styles.floorDisplayText}>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>Current Floor</div>
                <div style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#fbbf24',
                  transition: 'all 0.3s ease',
                  transform: isMoving ? 'scale(1.1)' : 'scale(1)'
                }}>{currentFloor + 1}</div>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>{changelogData[currentFloor]?.version}</div>
              </div>
              <div style={{ fontSize: '12px', textAlign: 'center', color: '#9ca3af', marginTop: '4px' }}>
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
                git-floors-demo-repo - Change Logs
              </h1>
              <p style={styles.subtitle}>Enjoy the ride through our development journey!</p>
              <img src='/UCL.png' className='logo' />
            </div>

            {/* Scrollable Content - Start from v1.0.0 at top, scroll down to latest */}
            <div
              ref={containerRef}
              style={styles.scrollableContent}
            >
              {changelogData.map((release, index) => {
                const colors = getVersionColor(release.version);
                const versionType = getVersionType(release.version);
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
                            <div style={{ color: colors.icon }}>
                              {getTypeIcon(release.version)}
                            </div>
                            <h2 style={styles.versionNumber}>{release.version}</h2>
                            <span style={{
                              ...styles.versionBadge,
                              color: colors.text
                            }}>
                              {versionType}
                            </span>
                          </div>
                          <div style={styles.versionHeaderRight}>
                            <span style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.8)' }}>
                              Raised by: {release.pr_raiser}
                            </span>
                          </div>
                        </div>

                        <h3 style={styles.versionTitle}>
                          {release.pr_title}
                        </h3>
                        <p style={{
                          ...styles.versionDescription,
                          color: colors.text,
                          lineHeight: '1.5',
                          marginBottom: '12px'
                        }}>
                          {release.pr_description}
                        </p>

                        {/* PR Reviewers */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginTop: '8px'
                        }}>
                          <span style={{
                            fontSize: '12px',
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontWeight: '500'
                          }}>
                            Reviewed by:
                          </span>
                          <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '6px'
                          }}>
                            {release.pr_reviewers.map((reviewer, reviewerIndex) => (
                              <span
                                key={reviewerIndex}
                                style={{
                                  fontSize: '12px',
                                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                  color: colors.text,
                                  padding: '4px 8px',
                                  borderRadius: '12px',
                                  border: `1px solid ${colors.border}`,
                                  opacity: 0.9
                                }}
                              >
                                {reviewer}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div style={{
                          fontSize: '14px',
                          color: 'rgba(255, 255, 255, 0.8)',
                          marginTop: '8px'
                        }}>
                          {release.commits.length} commits in this release
                        </div>
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
                                <GitCommit style={{ width: '20px', height: '20px', color: '#9ca3af' }} />
                              </div>
                              <div style={styles.commitDetails}>
                                <div style={styles.commitMeta}>
                                  <a
                                    href={commit.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      ...styles.commitHash,
                                      textDecoration: 'none',
                                      cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => {
                                      e.target.style.backgroundColor = '#374151';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.target.style.backgroundColor = '#1f2937';
                                    }}
                                  >
                                    {commit.id}
                                  </a>
                                  <span style={styles.commitAuthor}>
                                    by {commit.author}
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

                      {/* Floor Navigation Hint - Dynamic text based on position */}
                      <div style={styles.floorNavigation}>
                        <p>Floor {index + 1} of {totalFloors} - {release.version}</p>
                        <p style={{ fontSize: '14px' }}>
                          {index === 0
                            ? "You're on Floor 1 with the initial release! Scroll down to explore newer versions."
                            : index === totalFloors - 1
                              ? "You've reached the top floor with the latest release! Great work team!"
                              : "Continue scrolling to explore more releases in our development journey"
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