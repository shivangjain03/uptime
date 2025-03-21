"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  Globe,
  Shield,
  RefreshCw,
  Search,
  Plus,
  Settings,
} from "lucide-react"

import "./styles.css"

// Sample data for websites
const websites = [
  {
    id: 1,
    name: "Main Website",
    url: "https://example.com",
    status: "up",
    uptime: 99.98,
    responseTime: 187,
    lastChecked: "2 minutes ago",
    uptimeTicks: [
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
    ],
  },
  {
    id: 2,
    name: "API Endpoint",
    url: "https://api.example.com",
    status: "up",
    uptime: 99.95,
    responseTime: 210,
    lastChecked: "1 minute ago",
    uptimeTicks: [
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
    ],
  },
  {
    id: 3,
    name: "Documentation",
    url: "https://docs.example.com",
    status: "down",
    uptime: 98.76,
    responseTime: 0,
    lastChecked: "3 minutes ago",
    uptimeTicks: [
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "down",
      "down",
      "down",
      "down",
      "down",
      "down",
      "down",
      "down",
      "down",
      "down",
    ],
  },
  {
    id: 4,
    name: "Marketing Site",
    url: "https://marketing.example.com",
    status: "up",
    uptime: 99.87,
    responseTime: 245,
    lastChecked: "just now",
    uptimeTicks: [
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "down",
      "down",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
    ],
  },
  {
    id: 5,
    name: "Customer Portal",
    url: "https://portal.example.com",
    status: "up",
    uptime: 99.92,
    responseTime: 198,
    lastChecked: "4 minutes ago",
    uptimeTicks: [
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
      "up",
    ],
  },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("all")
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})

  // Group ticks into rows of 10
  const groupTicks = (ticks: string[]) => {
    const rows = []
    for (let i = 0; i < ticks.length; i += 10) {
      rows.push(ticks.slice(i, i + 10))
    }
    return rows
  }

  const toggleAccordion = (id: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="app dark">
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <Activity className="logo-icon" />
            <span>UptimeGuard</span>
          </div>
          <div className="header-right">
            <nav className="main-nav">
              <Link href="#dashboard" className="nav-link">
                Dashboard
              </Link>
              <Link href="#alerts" className="nav-link">
                Alerts
              </Link>
              <Link href="#settings" className="nav-link">
                Settings
              </Link>
              <Link href="#" className="nav-link">
                Documentation
              </Link>
            </nav>
            <div className="auth-buttons">
              <button className="btn btn-outline">Log in</button>
              <button className="btn btn-primary">Sign up</button>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        <section className="section">
          <div className="container">
            <div className="dashboard-header">
              <div className="dashboard-title">
                <h1>Monitored Websites</h1>
                <p>Track the status of your web services in real-time</p>
              </div>
              <div className="dashboard-actions">
                <div className="search-container">
                  <Search className="search-icon" />
                  <input type="text" placeholder="Search websites..." className="search-input" />
                </div>
                <button className="btn btn-icon">
                  <RefreshCw size={16} />
                </button>
                <button className="btn btn-primary">
                  <Plus size={16} />
                  <span>Add Website</span>
                </button>
              </div>
            </div>

            <div className="tabs-container">
              <div className="tabs">
                <button className={`tab ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
                  All Sites
                  <span className="badge">{websites.length}</span>
                </button>
                <button
                  className={`tab ${activeTab === "issues" ? "active" : ""}`}
                  onClick={() => setActiveTab("issues")}
                >
                  Issues
                  <span className="badge badge-error">1</span>
                </button>
                <button
                  className={`tab ${activeTab === "maintenance" ? "active" : ""}`}
                  onClick={() => setActiveTab("maintenance")}
                >
                  Maintenance
                </button>
              </div>

              <div className="tab-content">
                {activeTab === "all" && (
                  <div className="accordion">
                    {websites.map((website) => (
                      <div key={website.id} className={`accordion-item ${website.status === "down" ? "error" : ""}`}>
                        <div className="accordion-header" onClick={() => toggleAccordion(website.id)}>
                          <div className="website-info">
                            <div className={`status-indicator ${website.status}`}>
                              <div className="status-dot"></div>
                            </div>
                            <div>
                              <h3 className="website-name">{website.name}</h3>
                              <p className="website-url">{website.url}</p>
                            </div>
                            {website.status === "down" && <span className="badge badge-error">Incident</span>}
                          </div>
                          <div className={`accordion-icon ${expandedItems[website.id] ? "expanded" : ""}`}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </div>
                        </div>

                        {expandedItems[website.id] && (
                          <div className="accordion-content">
                            <div className="stats-grid">
                              <div className="stat-card">
                                <span className="stat-label">Status</span>
                                <div className="stat-value">
                                  {website.status === "up" ? (
                                    <>
                                      <CheckCircle2 className="stat-icon success" />
                                      <span className="success">Operational</span>
                                    </>
                                  ) : (
                                    <>
                                      <AlertCircle className="stat-icon error" />
                                      <span className="error">Down</span>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="stat-card">
                                <span className="stat-label">Uptime</span>
                                <div className="stat-value">
                                  <Shield className="stat-icon primary" />
                                  <span>{website.uptime}%</span>
                                </div>
                              </div>
                              <div className="stat-card">
                                <span className="stat-label">Response Time</span>
                                <div className="stat-value">
                                  <Clock className="stat-icon primary" />
                                  <span>{website.status === "up" ? `${website.responseTime}ms` : "N/A"}</span>
                                </div>
                              </div>
                            </div>

                            <div className="uptime-chart">
                              <h4 className="uptime-title">Last 30 minutes uptime</h4>
                              <div className="uptime-grid">
                                {groupTicks(website.uptimeTicks).map((row, rowIndex) => (
                                  <div key={rowIndex} className="uptime-row">
                                    {row.map((status, tickIndex) => (
                                      <div
                                        key={tickIndex}
                                        className={`uptime-tick ${status}`}
                                        title={`${(rowIndex * 10) + tickIndex + 1} minutes ago: ${status === "up" ? "Operational" : "Down"}`}
                                      ></div>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="accordion-footer">
                              <div className="last-checked">
                                <Clock size={14} />
                                <span>Last checked: {website.lastChecked}</span>
                              </div>
                              <div className="action-buttons">
                                <button className="btn btn-outline">
                                  <Globe size={16} />
                                  <span>Visit</span>
                                </button>
                                <button className="btn btn-primary">
                                  <span>View Details</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "issues" && (
                  <div className="accordion">
                    {websites
                      .filter((w) => w.status === "down")
                      .map((website) => (
                        <div key={website.id} className="accordion-item error">
                          <div className="accordion-header" onClick={() => toggleAccordion(website.id)}>
                            <div className="website-info">
                              <div className="status-indicator down">
                                <div className="status-dot"></div>
                              </div>
                              <div>
                                <h3 className="website-name">{website.name}</h3>
                                <p className="website-url">{website.url}</p>
                              </div>
                              <span className="badge badge-error">Incident</span>
                            </div>
                            <div className={`accordion-icon ${expandedItems[website.id] ? "expanded" : ""}`}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            </div>
                          </div>

                          {expandedItems[website.id] && (
                            <div className="accordion-content">{/* Same content as above */}</div>
                          )}
                        </div>
                      ))}
                  </div>
                )}

                {activeTab === "maintenance" && (
                  <div className="empty-state">
                    <div className="empty-icon">
                      <Settings size={32} />
                    </div>
                    <h3 className="empty-title">No Scheduled Maintenance</h3>
                    <p className="empty-description">
                      There are currently no websites in maintenance mode. Use maintenance mode when performing planned
                      updates.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="section cta-section">
          <div className="container">
            <div className="cta-grid">
              <div className="cta-content">
                <h2>Ready to ensure your services never go down?</h2>
                <p>Join thousands of developers who trust UptimeGuard to keep their services online.</p>
              </div>
              <div className="cta-buttons">
                <button className="btn btn-primary btn-large">Start Free Trial</button>
                <button className="btn btn-outline btn-large">Schedule Demo</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="logo">
              <Activity className="logo-icon" />
              <span>UptimeGuard</span>
            </div>
            <p className="copyright">&copy; {new Date().getFullYear()} UptimeGuard. All rights reserved.</p>
            <div className="footer-links">
              <Link href="#" className="footer-link">
                Terms
              </Link>
              <Link href="#" className="footer-link">
                Privacy
              </Link>
              <Link href="#" className="footer-link">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

