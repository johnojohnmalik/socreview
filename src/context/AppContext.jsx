import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}

export const AppProvider = ({ children }) => {
  // Quiz history: { questionId: { correct: number, total: number } }
  const [quizHistory, setQuizHistory] = useState(() => {
    const saved = localStorage.getItem('quizHistory')
    return saved ? JSON.parse(saved) : {}
  })

  // Completed topics
  const [completedTopics, setCompletedTopics] = useState(() => {
    const saved = localStorage.getItem('completedTopics')
    return saved ? JSON.parse(saved) : []
  })

  // Bookmarked topics
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('bookmarks')
    return saved ? JSON.parse(saved) : []
  })

  // Quiz difficulty
  const [difficulty, setDifficulty] = useState('intermediate')

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('quizHistory', JSON.stringify(quizHistory))
  }, [quizHistory])

  useEffect(() => {
    localStorage.setItem('completedTopics', JSON.stringify(completedTopics))
  }, [completedTopics])

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])

  const recordQuizAnswer = (questionId, isCorrect) => {
    setQuizHistory(prev => ({
      ...prev,
      [questionId]: {
        correct: (prev[questionId]?.correct || 0) + (isCorrect ? 1 : 0),
        total: (prev[questionId]?.total || 0) + 1
      }
    }))
  }

  const getQuestionSuccessRate = (questionId) => {
    const history = quizHistory[questionId]
    if (!history || history.total === 0) return null
    return (history.correct / history.total) * 100
  }

  const markTopicComplete = (topicId) => {
    if (!completedTopics.includes(topicId)) {
      setCompletedTopics(prev => [...prev, topicId])
    }
  }

  const toggleBookmark = (topicId) => {
    setBookmarks(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    )
  }

  const isBookmarked = (topicId) => bookmarks.includes(topicId)

  const getStruggleQuestions = (questions) => {
    return questions.filter(q => {
      const successRate = getQuestionSuccessRate(q.id)
      return successRate !== null && successRate < 50
    }).sort((a, b) => {
      const rateA = getQuestionSuccessRate(a.id) || 0
      const rateB = getQuestionSuccessRate(b.id) || 0
      return rateA - rateB
    })
  }

  const getWeightedQuestion = (questions) => {
    // Calculate weights based on success rate
    const questionsWithWeights = questions.map(q => {
      const successRate = getQuestionSuccessRate(q.id)
      let weight
      
      if (successRate === null) {
        // New questions get medium priority
        weight = 5
      } else if (successRate < 30) {
        weight = 10 // Highest priority
      } else if (successRate < 50) {
        weight = 7
      } else if (successRate < 70) {
        weight = 4
      } else {
        weight = 2 // Lowest priority
      }
      
      return { question: q, weight }
    })

    // Calculate total weight
    const totalWeight = questionsWithWeights.reduce((sum, item) => sum + item.weight, 0)
    
    // Select random question based on weights
    let random = Math.random() * totalWeight
    for (const item of questionsWithWeights) {
      random -= item.weight
      if (random <= 0) {
        return item.question
      }
    }
    
    return questionsWithWeights[0].question
  }

  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      setQuizHistory({})
      setCompletedTopics([])
      localStorage.removeItem('quizHistory')
      localStorage.removeItem('completedTopics')
    }
  }

  const value = {
    quizHistory,
    recordQuizAnswer,
    getQuestionSuccessRate,
    completedTopics,
    markTopicComplete,
    bookmarks,
    toggleBookmark,
    isBookmarked,
    difficulty,
    setDifficulty,
    getStruggleQuestions,
    getWeightedQuestion,
    resetProgress
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

