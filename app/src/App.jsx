import { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './App.css'

function parseDates(text) {
  const months = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
  }
  const year = new Date().getFullYear()
  const dates = []
  const lines = text.split(/\n/)
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('//')) continue
    const match = trimmed.match(/@(\d{1,2})(?:-?)([a-zA-Z]{3}|\d{1,2})/i)
    if (match) {
      const day = parseInt(match[1], 10)
      let month = match[2]
      if (/^[a-zA-Z]{3}$/i.test(month)) {
        month = months[month.toLowerCase()]
        if (month === undefined) continue
      } else {
        month = parseInt(month, 10) - 1
      }
      dates.push(new Date(year, month, day))
    }
  }
  return dates
}

function sameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function App() {
  const [notes, setNotes] = useState(() => localStorage.getItem('notes') || '')
  const [dates, setDates] = useState(() => parseDates(notes))

  useEffect(() => {
    localStorage.setItem('notes', notes)
    setDates(parseDates(notes))
  }, [notes])

  return (
    <div className="container">
      <textarea
        className="notepad"
        value={notes}
        onChange={e => setNotes(e.target.value)}
        placeholder="- do something @3jun"
      />
      <div className="calendar-wrapper">
        <Calendar
          tileClassName={({ date }) =>
            dates.some(d => sameDay(d, date)) ? 'highlight' : null
          }
        />
      </div>
    </div>
  )
}

export default App
