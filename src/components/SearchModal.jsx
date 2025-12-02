import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { topicsData } from '../data/topics'
import './SearchModal.css'

const SearchModal = ({ onClose }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const navigate = useNavigate()
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()

    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    
    const handleCtrlK = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('keydown', handleCtrlK)
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleCtrlK)
    }
  }, [onClose])

  useEffect(() => {
    if (query.trim() === '') {
      setResults([])
      return
    }

    const searchQuery = query.toLowerCase()
    const filtered = topicsData.filter(topic => 
      topic.title.toLowerCase().includes(searchQuery) ||
      topic.shortDescription.toLowerCase().includes(searchQuery) ||
      topic.keywords?.some(keyword => keyword.toLowerCase().includes(searchQuery))
    )

    setResults(filtered.slice(0, 10))
  }, [query])

  const handleSelect = (topicId) => {
    navigate(`/topic/${topicId}`)
    onClose()
  }

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-header">
          <Search size={20} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search topics, concepts..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="search-input"
          />
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="search-results">
          {query && results.length === 0 && (
            <div className="no-results">
              No results found for "{query}"
            </div>
          )}

          {results.map(topic => (
            <button
              key={topic.id}
              className="search-result-item"
              onClick={() => handleSelect(topic.id)}
            >
              <div>
                <div className="result-title">{topic.title}</div>
                <div className="result-description">{topic.shortDescription}</div>
              </div>
            </button>
          ))}

          {!query && (
            <div className="search-hint">
              Start typing to search through all InfoSec topics...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchModal

