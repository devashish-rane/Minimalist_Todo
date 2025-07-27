# Consistent - Minimalist Todo App

**Motto: One day, drops will make an ocean.**

A beautiful, minimalist todo web application that combines a notepad with calendar integration for seamless task management.

## Features

### 📝 Notepad (40% screen)
- **Minimalist syntax**: Add notes using `-` prefix
- **Smart reminders**: Use `@date` format (e.g., `@3jun`, `@3Jun`, `@3-6`)
- **Task completion**: Mark tasks as done with `//` prefix
- **Auto-save**: All data is automatically saved to localStorage

### 📅 Calendar (60% screen)
- **Visual reminders**: Calendar highlights dates with scheduled tasks
- **Task preview**: Click on dates to see scheduled tasks
- **Week/Month view**: Toggle between different calendar views
- **Future-focused**: Only shows future dates with reminders

## Syntax Examples

```
- do the laundry
- make notes of API versioning @3jun
- prepare presentation @15dec
- //- this task is completed and won't show in calendar
```

## Date Formats Supported

- `@3jun` - June 3rd (current year)
- `@3Jun` - June 3rd (current year)
- `@4july` - July 4th (current year)
- `@15december` - December 15th (current year)
- `@3-6` - June 3rd (current year)
- `@15-12` - December 15th (current year)

**Supported month formats:**
- 3-letter abbreviations: `jan`, `feb`, `mar`, `apr`, `may`, `jun`, `jul`, `aug`, `sep`, `oct`, `nov`, `dec`
- Full month names: `january`, `february`, `march`, `april`, `may`, `june`, `july`, `august`, `september`, `october`, `november`, `december`

## Project Structure

```
consistent-todo-app/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Application styles
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── index.html           # HTML entry point
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md           # This file
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd consistent-todo-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Technology Stack

- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **react-calendar** - Calendar component
- **CSS3** - Modern styling with gradients and animations

## Planned Features

- ⏰ Pomodoro timer integration
- 📱 WhatsApp notifications (requires backend)
- 💬 Quote of the day
- 🎯 Power topics
- 💡 Life hacks (food, study, self-management, health, relationships)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Why "Consistent"?

The name reflects the philosophy that small, consistent actions lead to significant results over time. Just like drops of water eventually fill an ocean, consistent daily tasks and reminders help build productive habits and achieve long-term goals.


