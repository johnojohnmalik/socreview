import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Menu, X, Moon, Sun, Home, BookOpen, Network, 
  Brain, TrendingDown, BarChart3, Bookmark, Search
} from 'lucide-react'
import './Layout.css'
import SearchModal from './SearchModal'

const Layout = ({ children, theme, toggleTheme }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', path: '/', icon: Home },
    { name: 'Topics', path: '/topic/edr', icon: BookOpen },
    { name: 'Network Ports', path: '/network-ports', icon: Network },
    { name: 'Quiz', path: '/quiz', icon: Brain },
    { name: 'Struggle Questions', path: '/struggle-questions', icon: TrendingDown },
    { name: 'Statistics', path: '/statistics', icon: BarChart3 },
    { name: 'Bookmarks', path: '/bookmarks', icon: Bookmark },
  ]

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <div className="layout">
      {/* Mobile Header */}
      <header className="mobile-header">
        <button 
          className="menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="logo">InfoSec Learning</h1>
        <div className="header-actions">
          <button 
            className="icon-btn"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          <button 
            className="icon-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h1 className="sidebar-logo">
            <span className="text-gradient">InfoSec</span> Learning
          </h1>
          <button 
            className="icon-btn desktop-only"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        <button 
          className="search-btn"
          onClick={() => setSearchOpen(true)}
        >
          <Search size={18} />
          <span>Search topics...</span>
          <kbd>Ctrl+K</kbd>
        </button>

        <nav className="sidebar-nav">
          {navigation.map(item => {
            const Icon = item.icon
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          <p className="footer-text">
            Master InfoSec concepts through adaptive learning
          </p>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="main-content">
        {children}
      </main>

      {/* Search Modal */}
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </div>
  )
}

export default Layout

