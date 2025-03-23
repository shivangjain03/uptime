"use client"

import type React from "react"

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
  Loader2,
  X,
} from "lucide-react"
import { useWebsites } from "@/hooks/useWebsites"
import { API_BACKEND_URL } from "@/config"

import "./styles.css"

// Helper function to format URL for display
const formatUrl = (url: string) => {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname
  } catch (e) {
    return url
  }
}

// Helper to calculate uptime percentage
const calculateUptime = (ticks: any[]) => {
  if (!ticks || ticks.length === 0) return 100

  const totalTicks = ticks.length
  const upTicks = ticks.filter((tick) => tick.status === "up").length
  return ((upTicks / totalTicks) * 100).toFixed(2)
}

// Helper to calculate average response time
const calculateAvgResponseTime = (ticks: any[]) => {
  if (!ticks || ticks.length === 0) return 0

  const upTicks = ticks.filter((tick) => tick.status === "up")
  if (upTicks.length === 0) return 0

  const totalLatency = upTicks.reduce((sum, tick) => sum + tick.latency, 0)
  return Math.round(totalLatency / upTicks.length)
}

// Helper to determine current status
const getCurrentStatus = (ticks: any[]) => {
  if (!ticks || ticks.length === 0) return "unknown"

  // Sort ticks by createdAt in descending order
  const sortedTicks = [...ticks].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  // Return status of most recent tick
  return sortedTicks[0]?.status || "unknown"
}

// Helper to format relative time
const getRelativeTime = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  return `${Math.floor(diffInSeconds / 86400)} days ago`
}

// Helper to aggregate ticks into 3-minute windows
const aggregateTicksInto3MinWindows = (ticks: any[]) => {
  if (!ticks || ticks.length === 0) return []

  // Sort ticks by createdAt in ascending order
  const sortedTicks = [...ticks].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

  const windows: { status: string; timestamp: Date }[] = []
  const threeMinutesInMs = 3 * 60 * 1000

  // Group ticks into 3-minute windows
  let currentWindowStart = new Date(sortedTicks[0].createdAt).getTime()
  let currentWindowTicks: any[] = []

  sortedTicks.forEach((tick) => {
    const tickTime = new Date(tick.createdAt).getTime()

    if (tickTime < currentWindowStart + threeMinutesInMs) {
      // Tick belongs to current window
      currentWindowTicks.push(tick)
    } else {
      // Process current window and start a new one
      if (currentWindowTicks.length > 0) {
        // If any tick in the window is down, the window is down
        const windowStatus = currentWindowTicks.some((t) => t.status === "down") ? "down" : "up"
        windows.push({
          status: windowStatus,
          timestamp: new Date(currentWindowStart),
        })
      }

      // Start new window
      currentWindowStart = Math.floor(tickTime / threeMinutesInMs) * threeMinutesInMs
      currentWindowTicks = [tick]
    }
  })

  // Process the last window
  if (currentWindowTicks.length > 0) {
    const windowStatus = currentWindowTicks.some((t) => t.status === "down") ? "down" : "up"
    windows.push({
      status: windowStatus,
      timestamp: new Date(currentWindowStart),
    })
  }

  // Return the last 30 windows (or all if less than 30)
  return windows.slice(-30).map((window) => window.status)
}

export default function Dashboard() {
  const websites = useWebsites()
  const [activeTab, setActiveTab] = useState("all")
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newWebsiteUrl, setNewWebsiteUrl] = useState("")
  const [urlError, setUrlError] = useState("")
  const [isAddingWebsite, setIsAddingWebsite] = useState(false)
  const [addSuccess, setAddSuccess] = useState(false)

  // Group ticks into rows of 10
  const groupTicks = (ticks: string[]) => {
    const rows = []
    for (let i = 0; i < ticks.length; i += 10) {
      rows.push(ticks.slice(i, i + 10))
    }
    return rows
  }

  const toggleAccordion = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // The hook will automatically refresh the data
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const openAddModal = () => {
    setShowAddModal(true)
    setNewWebsiteUrl("")
    setUrlError("")
    setAddSuccess(false)
  }

  const closeAddModal = () => {
    setShowAddModal(false)
  }

  const validateUrl = (url: string) => {
    if (!url) {
      setUrlError("URL is required")
      return false
    }

    // Simple URL validation
    try {
      new URL(url)
      setUrlError("")
      return true
    } catch (e) {
      setUrlError("Please enter a valid URL (e.g., https://example.com)")
      return false
    }
  }

  const handleAddWebsite = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateUrl(newWebsiteUrl)) {
      return
    }

    setIsAddingWebsite(true)
    try {
      // This would be the actual API call to add a website
      const response = await fetch(`${API_BACKEND_URL}/api/websites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: newWebsiteUrl }),
      })

      if (!response.ok) {
        throw new Error("Failed to add website")
      }

      setAddSuccess(true)
      // Clear form
      setNewWebsiteUrl("")

      // Close the modal after a delay to show success message
      setTimeout(() => {
        closeAddModal()
      }, 2000)
    } catch (error) {
      console.error("Error adding website:", error)
      setUrlError("Failed to add website. Please try again.")
    } finally {
      setIsAddingWebsite(false)
    }
  }

  // Count websites with issues
  const issuesCount = websites.filter((site) => getCurrentStatus(site.ticks) === "down").length

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
                <button className="btn btn-icon btn-outline" onClick={handleRefresh} disabled={isRefreshing}>
                  {isRefreshing ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                </button>
                <button className="btn btn-primary" onClick={openAddModal}>
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
                  <span className="badge badge-error">{issuesCount}</span>
                </button>
                <button
                  className={`tab ${activeTab === "maintenance" ? "active" : ""}`}
                  onClick={() => setActiveTab("maintenance")}
                >
                  Maintenance
                </button>
              </div>

              <div className="tab-content">
                {websites.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">
                      <Globe size={32} />
                    </div>
                    <h3 className="empty-title">No Websites Monitored</h3>
                    <p className="empty-description">
                      You haven't added any websites to monitor yet. Click the "Add Website" button to get started.
                    </p>
                  </div>
                ) : (
                  <>
                    {activeTab === "all" && (
                      <div className="accordion">
                        {websites.map((website) => {
                          const status = getCurrentStatus(website.ticks)
                          const uptime = calculateUptime(website.ticks)
                          const responseTime = calculateAvgResponseTime(website.ticks)
                          const aggregatedTicks = aggregateTicksInto3MinWindows(website.ticks)
                          const lastChecked =
                            website.ticks.length > 0
                              ? getRelativeTime(
                                  website.ticks.sort(
                                    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
                                  )[0].createdAt,
                                )
                              : "never"

                          return (
                            <div key={website.id} className={`accordion-item ${status === "down" ? "error" : ""}`}>
                              <div className="accordion-header" onClick={() => toggleAccordion(website.id)}>
                                <div className="website-info">
                                  <div className={`status-indicator ${status}`}>
                                    <div className="status-dot"></div>
                                  </div>
                                  <div>
                                    <h3 className="website-name">{formatUrl(website.url)}</h3>
                                    <p className="website-url">{website.url}</p>
                                  </div>
                                  {status === "down" && <span className="badge badge-error">Incident</span>}
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
                                        {status === "up" ? (
                                          <>
                                            <CheckCircle2 className="stat-icon success" />
                                            <span className="success">Operational</span>
                                          </>
                                        ) : status === "down" ? (
                                          <>
                                            <AlertCircle className="stat-icon error" />
                                            <span className="error">Down</span>
                                          </>
                                        ) : (
                                          <>
                                            <Clock className="stat-icon" />
                                            <span>Unknown</span>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                    <div className="stat-card">
                                      <span className="stat-label">Uptime</span>
                                      <div className="stat-value">
                                        <Shield className="stat-icon primary" />
                                        <span>{uptime}%</span>
                                      </div>
                                    </div>
                                    <div className="stat-card">
                                      <span className="stat-label">Response Time</span>
                                      <div className="stat-value">
                                        <Clock className="stat-icon primary" />
                                        <span>{status === "up" ? `${responseTime}ms` : "N/A"}</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="uptime-chart">
                                    <h4 className="uptime-title">Last 30 checks (3-minute windows)</h4>
                                    <div className="uptime-grid">
                                      {aggregatedTicks.length > 0 ? (
                                        groupTicks(aggregatedTicks).map((row, rowIndex) => (
                                          <div key={rowIndex} className="uptime-row">
                                            {row.map((status, tickIndex) => (
                                              <div
                                                key={tickIndex}
                                                className={`uptime-tick ${status}`}
                                                title={`Window ${(rowIndex * 10) + tickIndex + 1}: ${status === "up" ? "Operational" : "Down"}`}
                                              ></div>
                                            ))}
                                          </div>
                                        ))
                                      ) : (
                                        <div className="no-data">No uptime data available</div>
                                      )}
                                    </div>
                                  </div>

                                  <div className="accordion-footer">
                                    <div className="last-checked">
                                      <Clock size={14} />
                                      <span>Last checked: {lastChecked}</span>
                                    </div>
                                    <div className="action-buttons">
                                      <a
                                        href={website.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-outline"
                                      >
                                        <Globe size={16} />
                                        <span>Visit</span>
                                      </a>
                                      <button className="btn btn-primary">
                                        <span>View Details</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {activeTab === "issues" && (
                      <div className="accordion">
                        {websites
                          .filter((w) => getCurrentStatus(w.ticks) === "down")
                          .map((website) => {
                            const uptime = calculateUptime(website.ticks)
                            const aggregatedTicks = aggregateTicksInto3MinWindows(website.ticks)
                            const lastChecked =
                              website.ticks.length > 0
                                ? getRelativeTime(
                                    website.ticks.sort(
                                      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
                                    )[0].createdAt,
                                  )
                                : "never"

                            return (
                              <div key={website.id} className="accordion-item error">
                                <div className="accordion-header" onClick={() => toggleAccordion(website.id)}>
                                  <div className="website-info">
                                    <div className="status-indicator down">
                                      <div className="status-dot"></div>
                                    </div>
                                    <div>
                                      <h3 className="website-name">{formatUrl(website.url)}</h3>
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
                                  <div className="accordion-content">
                                    <div className="stats-grid">
                                      <div className="stat-card">
                                        <span className="stat-label">Status</span>
                                        <div className="stat-value">
                                          <AlertCircle className="stat-icon error" />
                                          <span className="error">Down</span>
                                        </div>
                                      </div>
                                      <div className="stat-card">
                                        <span className="stat-label">Uptime</span>
                                        <div className="stat-value">
                                          <Shield className="stat-icon primary" />
                                          <span>{uptime}%</span>
                                        </div>
                                      </div>
                                      <div className="stat-card">
                                        <span className="stat-label">Response Time</span>
                                        <div className="stat-value">
                                          <Clock className="stat-icon primary" />
                                          <span>N/A</span>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="uptime-chart">
                                      <h4 className="uptime-title">Last 30 checks (3-minute windows)</h4>
                                      <div className="uptime-grid">
                                        {aggregatedTicks.length > 0 ? (
                                          groupTicks(aggregatedTicks).map((row, rowIndex) => (
                                            <div key={rowIndex} className="uptime-row">
                                              {row.map((status, tickIndex) => (
                                                <div
                                                  key={tickIndex}
                                                  className={`uptime-tick ${status}`}
                                                  title={`Window ${(rowIndex * 10) + tickIndex + 1}: ${status === "up" ? "Operational" : "Down"}`}
                                                ></div>
                                              ))}
                                            </div>
                                          ))
                                        ) : (
                                          <div className="no-data">No uptime data available</div>
                                        )}
                                      </div>
                                    </div>

                                    <div className="accordion-footer">
                                      <div className="last-checked">
                                        <Clock size={14} />
                                        <span>Last checked: {lastChecked}</span>
                                      </div>
                                      <div className="action-buttons">
                                        <a
                                          href={website.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="btn btn-outline"
                                        >
                                          <Globe size={16} />
                                          <span>Visit</span>
                                        </a>
                                        <button className="btn btn-primary">
                                          <span>View Details</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        {websites.filter((w) => getCurrentStatus(w.ticks) === "down").length === 0 && (
                          <div className="empty-state">
                            <div className="empty-icon success-icon">
                              <CheckCircle2 size={32} />
                            </div>
                            <h3 className="empty-title">All Systems Operational</h3>
                            <p className="empty-description">
                              All your monitored websites are currently up and running.
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === "maintenance" && (
                      <div className="empty-state">
                        <div className="empty-icon">
                          <Settings size={32} />
                        </div>
                        <h3 className="empty-title">No Scheduled Maintenance</h3>
                        <p className="empty-description">
                          There are currently no websites in maintenance mode. Use maintenance mode when performing
                          planned updates.
                        </p>
                      </div>
                    )}
                  </>
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

      {/* Add Website Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Add Website</h3>
              <button className="modal-close" onClick={closeAddModal}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-content">
              {addSuccess ? (
                <div className="success-message">
                  <CheckCircle2 className="success-icon" size={48} />
                  <p>Website added successfully!</p>
                </div>
              ) : (
                <form onSubmit={handleAddWebsite}>
                  <div className="form-group">
                    <label htmlFor="website-url">Website URL</label>
                    <input
                      id="website-url"
                      type="text"
                      className={`form-input ${urlError ? "error" : ""}`}
                      placeholder="https://example.com"
                      value={newWebsiteUrl}
                      onChange={(e) => setNewWebsiteUrl(e.target.value)}
                      required
                    />
                    {urlError && <div className="error-message">{urlError}</div>}
                  </div>
                  <div className="modal-actions">
                    <button type="button" className="btn btn-outline" onClick={closeAddModal}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={isAddingWebsite}>
                      {isAddingWebsite ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Adding...</span>
                        </>
                      ) : (
                        <span>Add Website</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

