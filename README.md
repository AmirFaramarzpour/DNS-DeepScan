
Project Overview
The "Domain Analyzer" is a sophisticated web application designed to perform comprehensive network analysis for a given domain. Built with a modern JavaScript stack, it leverages React for the frontend, TypeScript for type safety, Vite for bundling, and Express for the backend API. The application provides detailed insights into DNS records, connectivity metrics, routing paths, and network configuration, enhanced by reusable components for data visualization and user interaction. The project structure is modular and well-organized, supporting scalability and maintainability.
Detailed Project Structure
The project structure, as depicted in the provided image, includes:
node_modules: Manage build artifacts and dependencies.
src Directory:

components: Contains reusable React components:

ChartComponent.tsx: Bar and line chart visualization.
DataTable.tsx: Dynamic table rendering.
ErrorMessage.tsx: Error notification display.
DomainInput.tsx: Domain input and submission handling.
LoadingSpinner.tsx: Loading animation.
NetworkGraph.tsx: Routing hop visualization.
ResultsDisplay.tsx: Tabbed results presentation.


App.tsx: Main application component.
main.tsx and index.css: Entry point and global styles.

Configuration Files:

vite.config.ts: Vite configuration.
tsconfig.json, tsconfig.app.json, tsconfig.node.json: TypeScript configurations.
eslint.config.js, postcss.config.js, tailwind.config.js: Linting and styling setups.
package.json: Defines scripts (dev, build, lint, preview) and dependencies.

server.js: Backend API server.

Technology Stack

Frontend: React 18.3.1 with TypeScript 5.5.3, styled with Tailwind CSS 3.4.1, and bundled with Vite 7.0.6.
Backend: Node.js with Express 4.18.2, enhanced with axios, cors, express-rate-limit, and sanitize-html.
Visualization: recharts 2.8.0 for charts.
Icons: lucide-react 0.344.0 for UI icons.
Dev Tools: ESLint 9.9.1, TypeScript ESLint 8.3.0, and other linting utilities.

Detailed Functionality and Features
Backend (server.js)
The Express server, running on port 3001, provides RESTful endpoints with robust security and performance optimizations:

DNS Analysis (/api/dns/:domain):
Executes nslookup, dig, and host to retrieve DNS records.
Includes mock whois data due to potential WebContainer constraints.
Parses A records for visualization.
Caches results for 5 minutes to reduce redundant queries.

Connectivity Analysis (/api/connectivity/:domain):
Runs ping -c 4 to measure response times (avg, min, max).
Uses curl to check HTTP status.
Includes mock telnet data.
Parses ping output for charting.

Routing Analysis (/api/routing/:domain):
Executes traceroute (with mock data if unavailable) to map hops.
Parses hop data (hop number, hostname, IP, time) for graph visualization.

Network Configuration (/api/network):
Retrieves hostname and mock ifconfig/netstat data.
Provides network interface details (e.g., IP, netmask, status).

Health Check (/api/health):
Returns server status for monitoring.

Security and Performance:
Input validation with regex and sanitize-html.
Rate limiting (100 requests per 15 minutes per IP).
Command execution with 30-second timeout and 1MB buffer.
In-memory caching to optimize API calls.

Frontend (App.tsx and Components)
The frontend is a single-page application with a responsive, Tailwind-styled interface:

App.tsx:
Manages state (domain, results, loading, error, analysisComplete) with useState.
Performs parallel API calls using Promise.allSettled for efficiency.
Displays DomainInput, LoadingSpinner, ErrorMessage, and ResultsDisplay conditionally.


Component Details:

ChartComponent.tsx:
Renders bar or line charts with recharts.
Supports customizable data, type, title, xKey, yKey, and color.
Includes CartesianGrid, Tooltip, and a no-data fallback.

DataTable.tsx:
Displays tabular data with dynamic columns (key, label, optional render).
Features responsive scrolling, custom cell rendering, and a no-data message.

ErrorMessage.tsx:
Shows errors with an AlertTriangle icon and optional Retry button (RefreshCw).
Styled with a red theme.

DomainInput.tsx:
Validates domain input with regex, handles Enter key, and shows inline errors.
Includes a loading state and example domains.

LoadingSpinner.tsx:
Offers configurable size (sm, md, lg) and text.
Uses a spinning border animation.

NetworkGraph.tsx:
Visualizes hops with hop numbers, hostnames, IPs, and times.
Displays summary stats (total hops, min/max times) in a grid.


ResultsDisplay.tsx:

Provides tabbed navigation (dns, connectivity, routing, network) with icons.
Exports results as a JSON file.
Renders charts, tables, and raw outputs:

DNS: Bar chart for response times, table for records.
Connectivity: Line chart for ping times, summary stats.
Routing: Network graph, hop table.
Network: Interface table, system info.


Capabilities

Comprehensive Analysis: Covers DNS, connectivity, routing, and network configuration.
Data Visualization: Supports charts, tables, and graphs for intuitive data interpretation.
Interactivity: Offers tab navigation, data export, and retry options.
Error Handling: Gracefully manages missing data and API failures.
Performance: Leverages caching and parallel requests.

Proposed Enhancements
To elevate the application, the following additions are recommended:

Nmap Capabilities:
Integrate Nmap to scan the domain for open ports, services, and vulnerabilities.
Add a /api/nmap/:domain endpoint to the backend, executing commands like nmap -sS -O <domain> with sanitized input.
Parse results to display port status, service versions, and OS detection in a new NmapTab in ResultsDisplay.

Enhanced Dig Command:
Extend the DNS endpoint to use dig +trace for authoritative server tracing and dig +all for all record types (e.g., MX, NS, TXT).
Parse additional records and include them in the DNS table and chart.

DNS Checker:
Integrate a DNS checker (e.g., via dig against multiple resolvers or a third-party API like Google Public DNS) to validate records across providers.
Display consistency checks and resolver-specific data in the DNS tab.

Design Update:
Adopt modern fonts (e.g., Inter or Roboto) for a contemporary look.
Implement glassy buttons and UI elements using Tailwind classes like bg-white bg-opacity-70 backdrop-blur-sm, with subtle hover effects (hover:bg-opacity-80).
Maintain a stable, elegant, and uncluttered design, avoiding excessive complexity.

This re-described "Domain Analyzer" offers a robust, modern, and extensible tool for network analysis as of 04:05 AM EEST on Monday, August 04, 2025, with enhanced security and visualization capabilities while preserving a user-friendly interface.
============================================


Based on the comprehensive project overview, I'll create a sophisticated Domain Analyzer application with all the features you've described, including the proposed enhancements. We'll build a modern, production-worthy tool with advanced network analysis capabilities, elegant design, and comprehensive visualization.

Core Features:

Comprehensive DNS analysis with multiple record types and authoritative server tracing
Real-time connectivity testing with ping metrics and HTTP status checks
Advanced routing analysis with traceroute visualization and hop mapping
Network configuration inspection with interface details and system information
Nmap integration for port scanning and vulnerability assessment
DNS consistency checking across multiple resolvers
Interactive data visualization with charts, tables, and network graphs
JSON export functionality and comprehensive error handling
Design Elements:

Modern glassy UI with backdrop blur effects and subtle transparency
Contemporary Inter font family for enhanced readability
Premium color system with blue (#3B82F6) primary, teal (#14B8A6) secondary, and accent colors
Smooth animations and micro-interactions with hover states and transitions
Responsive tabbed interface with intuitive navigation and visual feedback
Clean data visualization using charts, tables, and interactive network graphs
Consistent 8px spacing system and proper visual hierarchy
Professional loading states and elegant error handling
============================================
✨ UI Changes - Ambient Black Theme
Deep black gradient background with subtle grid patterns and floating particles
Glassy, translucent components with backdrop blur effects
Enhanced animations throughout loading states and interactions
Smooth transitions and hover effects with shadow animations
Modern typography with improved spacing and visual hierarchy
📊 Graph Updates
Changed DNS response times from bar chart to line chart for better trend visualization
Interactive charts with dark theme styling and improved tooltips
Enhanced DNS Check visualization with resolver response time charts
🏠 Navigation
Added Home button in the header with proper styling and functionality
Improved navigation flow between different sections
🔧 Enhanced Ping Parameters
Advanced ping options including interval, timeout, packet size, jitter, and standard deviation
Graceful fallback for parameters requiring administrative privileges
More comprehensive statistics with packet loss calculation
🎯 Kept Features
✅ WHOIS information display
✅ Complete DNS records analysis
✅ DNS response times with interactive visualization
✅ Ping statistics with enhanced metrics
✅ HTTP status checking with response times
✅ Interactive graphs for all statistics
✅ DNS consistency checker with summary tables
🗑️ Removed Features
❌ Network Config tab (not relatable to domain analysis)
❌ Nmap integration and all port scanning code
❌ Routing analysis (traceroute functionality)
🆕 Added IP Tools
🌍 IP Address Lookup - Real-time geolocation and ISP information
📡 What is My ISP - Detect your internet service provider details
🔄 IPv6 to IPv4 Converter - Convert between IP address formats
The application now features a sleek, ambient black design with enhanced animations, improved user experience, and comprehensive IP analysis tools while maintaining all the core DNS and connectivity analysis features
