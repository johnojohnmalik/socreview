import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import TopicPage from './pages/TopicPage'
import NetworkPorts from './pages/NetworkPorts'
import Quiz from './pages/Quiz'
import StruggleQuestions from './pages/StruggleQuestions'
import Statistics from './pages/Statistics'
import Bookmarks from './pages/Bookmarks'

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <AppProvider>
      <Router>
        <Layout theme={theme} toggleTheme={toggleTheme}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/topic/:topicId" element={<TopicPage />} />
            <Route path="/network-ports" element={<NetworkPorts />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/quiz/:topicId" element={<Quiz />} />
            <Route path="/struggle-questions" element={<StruggleQuestions />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  )
}

export default App

