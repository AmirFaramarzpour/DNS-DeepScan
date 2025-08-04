```markdown
# 🌐 DNS-DeepScan

A sophisticated web application designed to perform comprehensive network analysis for a given domain. Built with a modern JavaScript stack including **React**, **TypeScript**, **Vite**, and **Express**, this tool provides detailed insights into DNS records, connectivity metrics, routing paths, and network configuration through reusable components and data visualizations.

---

## 📁 Project Structure

```plaintext
node_modules/          # Build artifacts and dependencies
src/
│
├── components/
│   ├── ChartComponent.tsx        # Bar and line chart visualization
│   ├── DataTable.tsx             # Dynamic table rendering
│   ├── ErrorMessage.tsx          # Error notification display
│   ├── DomainInput.tsx           # Domain input and submission handling
│   ├── LoadingSpinner.tsx        # Loading animation
│   ├── NetworkGraph.tsx          # Routing hop visualization
│   └── ResultsDisplay.tsx        # Tabbed results presentation
│
├── App.tsx                       # Main application component
├── main.tsx                      # Entry point
└── index.css                     # Global styles

### 🛠 Configuration Files

- `vite.config.ts`
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- `eslint.config.js`, `postcss.config.js`, `tailwind.config.js`
- `package.json` – Defines dev scripts and dependencies

### 🌐 Backend

- `server.js` – Express API server

---

## 🧰 Technology Stack

| Layer       | Tech                                          |
|-------------|-----------------------------------------------|
| Frontend    | React `18.3.1`, TypeScript `5.5.3`, Tailwind `3.4.1`, Vite `7.0.6` |
| Backend     | Node.js, Express `4.18.2`, axios, cors, express-rate-limit |
| Visualization | recharts `2.8.0`, lucide-react `0.344.0`        |
| Dev Tools   | ESLint `9.9.1`, TypeScript ESLint `8.3.0`        |

---

## 🚀 Features & Functionality

### 🧠 Backend Endpoints

- `/api/dns/:domain` – DNS records using `nslookup`, `dig`, `host`; includes A record parsing & mock WHOIS
- `/api/connectivity/:domain` – Pings domain, checks HTTP status with curl, includes mock telnet
- `/api/routing/:domain` – Traceroute analysis & hop visualization
- `/api/network` – Hostname & mock `ifconfig`/`netstat` data
- `/api/health` – Server status check

**Security & Optimization**:
- Regex input validation & `sanitize-html`
- Rate limiting: 100 requests per 15 minutes per IP
- Timeout (30s) & buffer (1MB) for command execution
- In-memory caching for frequent queries

### 🎨 Frontend Components

- `App.tsx` – State management (`useState`), async API calls (`Promise.allSettled`)
- `ChartComponent.tsx` – Interactive bar/line charts
- `DataTable.tsx` – Responsive table with custom rendering
- `ErrorMessage.tsx` – Error display with retry option
- `DomainInput.tsx` – Domain validation and UX helpers
- `LoadingSpinner.tsx` – Configurable loading animation
- `NetworkGraph.tsx` – Visual graph of routing hops
- `ResultsDisplay.tsx` – Tabbed result navigation + JSON export

---

## 🎯 Capabilities

- Full-stack DNS, connectivity, routing, and network inspection
- Rich UI with charts, tables, graphs
- JSON export and graceful error handling
- Performance-focused API architecture

---

## 🔧 Proposed Enhancements

- **Nmap Integration**: Scan ports, services, vulnerabilities via `/api/nmap/:domain`
- **Advanced Dig**: Use `dig +trace` and `dig +all` for deep DNS info
- **DNS Checker**: Cross-provider record validation (e.g., Google Public DNS)
- **Design Update**:
  - Fonts: Inter or Roboto
  - UI: Glassy elements with `backdrop-blur`, hover transitions
  - Tailwind classes: `bg-white bg-opacity-70`, `hover:bg-opacity-80`

---

## 🌑 UI Refresh – Ambient Black Theme

- Deep black gradient with floating particle background
- Translucent, blurred components
- Smooth shadow transitions and interactive feedback
- Modern typography and spacing

---

## 📊 Visualization Enhancements

- DNS chart switched from bar to line for trend clarity
- Dark theme styling & responsive tooltips
- DNS Check: Multiple resolver response charts

---

## 🏠 Navigation Upgrades

- Added Home button with smooth transitions
- Improved routing across tabs

---

## 📶 Ping Expansion

- Configurable ping params: interval, timeout, size, jitter, std. dev.
- Fallbacks for restricted system commands
- Packet loss calculations

---

## ✅ Retained Features

- WHOIS data
- Full DNS analysis
- Interactive visualizations
- Connectivity metrics with ping/HTTP stats
- DNS consistency checker

---

## 🗑 Removed Features

- Network config tab
- Nmap integration & port scanner code
- Traceroute (routing analysis)

---

## 🆕 New IP Tools

- 🌍 **IP Address Lookup**
- 📡 **What is My ISP**
- 🔄 **IPv6 to IPv4 Converter**

---

