import { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './App.css'
import Editor from 'react-simple-code-editor'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'

// Utility functions
const parseDates = (text) => {
  const months = {
    jan: 0, january: 0, feb: 1, february: 1, mar: 2, march: 2, apr: 3, april: 3,
    may: 4, jun: 5, june: 5, jul: 6, july: 6, aug: 7, august: 7,
    sep: 8, september: 8, oct: 9, october: 9, nov: 10, november: 10,
    dec: 11, december: 11
  }
  const year = new Date().getFullYear()
  const dates = []
  const lines = text.split(/\n/)
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('//')) continue
    if (!trimmed.startsWith('-')) continue
    const match = trimmed.match(/@(\d{1,2})(?:-?)([a-zA-Z]+|\d{1,2})/i)
    if (match) {
      const day = parseInt(match[1], 10)
      let month = match[2]
      if (/^[a-zA-Z]+$/i.test(month)) {
        month = months[month.toLowerCase()]
        if (month === undefined) continue
      } else {
        month = parseInt(month, 10) - 1
      }
      const date = new Date(year, month, day)
      dates.push(date)
    }
  }
  return dates
}

const sameDay = (a, b) => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

const generateDateColors = (dates) => {
  const colors = [
    'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)', // Red
    'linear-gradient(135deg, #48bb78 0%, #38a169 100%)', // Green
    'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)', // Blue
    'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)', // Orange
    'linear-gradient(135deg, #9f7aea 0%, #805ad5 100%)', // Purple
    'linear-gradient(135deg, #f6ad55 0%, #ed8936 100%)', // Yellow
    'linear-gradient(135deg, #4fd1c7 0%, #38b2ac 100%)', // Teal
    'linear-gradient(135deg, #fc8181 0%, #f56565 100%)', // Pink
  ]
  const colorMap = {}
  dates.forEach((date, index) => {
    const dateKey = date.toDateString()
    colorMap[dateKey] = colors[index % colors.length]
  })
  return colorMap
}

function App() {
  const [notes, setNotes] = useState(() => localStorage.getItem('consistent-notes') || '- Welcome to Consistent!\n- Add your first task @3jun')
  const [dates, setDates] = useState(() => parseDates(notes))
  const [dateColors, setDateColors] = useState(() => generateDateColors(parseDates(notes)))
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState('week')

  useEffect(() => {
    localStorage.setItem('consistent-notes', notes)
    const newDates = parseDates(notes)
    setDates(newDates)
    setDateColors(generateDateColors(newDates))
  }, [notes])

  const getTasksForDate = (date) => {
    const lines = notes.split(/\n/)
    const tasks = []
    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed.startsWith('-') || trimmed.startsWith('//')) continue
      const match = trimmed.match(/@(\d{1,2})(?:-?)([a-zA-Z]+|\d{1,2})/i)
      if (match) {
        const months = {
          jan: 0, january: 0, feb: 1, february: 1, mar: 2, march: 2, apr: 3, april: 3,
          may: 4, jun: 5, june: 5, jul: 6, july: 6, aug: 7, august: 7,
          sep: 8, september: 8, oct: 9, october: 9, nov: 10, november: 10,
          dec: 11, december: 11
        }
        const day = parseInt(match[1], 10)
        let month = match[2]
        const year = new Date().getFullYear()
        if (/^[a-zA-Z]+$/i.test(month)) {
          month = months[month.toLowerCase()]
        } else {
          month = parseInt(month, 10) - 1
        }
        const taskDate = new Date(year, month, day)
        if (sameDay(taskDate, date)) {
          tasks.push(trimmed.substring(1).trim())
        }
      }
    }
    return tasks
  }

  const handleNoteChange = (code) => setNotes(code)
  const handleDateClick = (date) => setSelectedDate(date)
  const toggleViewMode = () => setViewMode(viewMode === 'week' ? 'month' : 'week')
  const selectedDateTasks = getTasksForDate(selectedDate)

  // Highlighting logic for Editor
  const highlight = (code) => {
    const months = {
      jan: 0, january: 0, feb: 1, february: 1, mar: 2, march: 2, apr: 3, april: 3,
      may: 4, jun: 5, june: 5, jul: 6, july: 6, aug: 7, august: 7,
      sep: 8, september: 8, oct: 9, october: 9, nov: 10, november: 10,
      dec: 11, december: 11
    }
    const lines = code.split('\n')
    return lines.map((line, lineIndex) => {
      const parts = line.split(/(@\d{1,2}(?:-?)([a-zA-Z]+|\d{1,2}))/gi)
      return parts.map((part, partIndex) => {
        const match = part.match(/@(\d{1,2})(?:-?)([a-zA-Z]+|\d{1,2})/i)
        if (match && match[1] && match[2]) {
          const day = parseInt(match[1], 10)
          let month = match[2]
          const year = new Date().getFullYear()
          if (/^[a-zA-Z]+$/i.test(month)) {
            month = months[month.toLowerCase()]
            if (month === undefined) return part
          } else {
            month = parseInt(month, 10) - 1
          }
          const taskDate = new Date(year, month, day)
          const dateIndex = dates.findIndex(date => sameDay(taskDate, date))
          const colorClass = dateIndex >= 0 ? `date-highlight-${dateIndex % 8}` : 'date-highlight-default'
          return `<span class='date-highlight ${colorClass}'>${part}</span>`
        }
        // Escape HTML for other text
        return part.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      }).join('') + (lineIndex < lines.length - 1 ? '\n' : '')
    }).join('')
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Consistent</h1>
        <p className="motto">One day, drops will make an ocean.</p>
      </header>
      <main className="main-container">
        <section className="notepad-section">
          <div className="notepad-header">
            <h2>Notepad</h2>
            <div className="syntax-help">
              <span className="help-item">- task @3jun</span>
              <span className="help-item">- task @4july</span>
              <span className="help-item">//- completed</span>
            </div>
          </div>
          <div className="notepad-wrapper">
            <Editor
              value={notes}
              onValueChange={handleNoteChange}
              highlight={highlight}
              padding={24}
              textareaClassName="notepad"
              preClassName="notepad-highlight"
              style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: 16,
                minHeight: '100%',
                outline: 'none',
                background: 'transparent',
                color: '#2d3748',
                lineHeight: 1.6,
                width: '100%',
                boxSizing: 'border-box',
              }}
              tabSize={2}
            />
          </div>
        </section>
        <section className="calendar-section">
          <div className="calendar-header">
            <h2>Calendar</h2>
            <button className="view-toggle" onClick={toggleViewMode}>
              {viewMode === 'week' ? 'Week View' : 'Month View'}
            </button>
          </div>
          <div className="calendar-wrapper">
            <Calendar
              value={selectedDate}
              onChange={handleDateClick}
              tileClassName={({ date }) => {
                const matchingDate = dates.find(d => sameDay(d, date))
                if (matchingDate) {
                  const dateKey = matchingDate.toDateString()
                  const colorIndex = Object.keys(dateColors).indexOf(dateKey)
                  return `highlight highlight-${colorIndex % 8}`
                }
                return null
              }}
              view={viewMode === 'week' ? 'month' : 'month'}
              maxDetail={viewMode === 'week' ? 'month' : 'month'}
              showNeighboringMonth={false}
            />
          </div>
          {selectedDateTasks.length > 0 && (
            <div className="selected-date-tasks">
              <h3>Tasks for {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</h3>
              <ul>
                {selectedDateTasks.map((task, index) => (
                  <li key={index}>{task}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App 