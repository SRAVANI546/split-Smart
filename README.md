# 📝 TaskMaster - To-Do List Application

A modern, feature-rich to-do list application with local storage functionality, built with vanilla HTML, CSS, and JavaScript.

## ✨ Features

### Core Functionality
- ✅ **Add Tasks** - Create new tasks with detailed information
- 📝 **Edit Tasks** - Modify task details with modal interface
- 🗑️ **Delete Tasks** - Remove tasks individually or in bulk
- ✔️ **Mark Complete** - Toggle task completion status
- 💾 **Local Storage** - All data persists in browser storage

### Task Management
- 🏷️ **Categories** - Organize tasks by category (Work, Personal, Shopping, Health, Other)
- ⚡ **Priority Levels** - Set priority (Low, Medium, High)
- 📅 **Due Dates** - Assign and track due dates
- ⚠️ **Overdue Detection** - Visual indicators for overdue tasks

### Filtering & Search
- 🔍 **Search** - Find tasks by text or category
- 🏠 **Status Filter** - View All, Active, or Completed tasks
- 📂 **Category Filter** - Filter by task category
- 📊 **Sort Options** - Sort by date added, priority, due date, or alphabetically

### User Interface
- 🌓 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 📈 **Statistics** - View total, completed, and pending task counts
- 🎨 **Modern UI** - Clean, intuitive, and visually appealing interface

### Advanced Features
- 📥 **Export Tasks** - Download tasks as JSON file
- 🧹 **Clear Completed** - Remove all completed tasks at once
- 💿 **Persistent Storage** - Data survives browser refreshes
- ⌨️ **Keyboard Shortcuts** - Press Enter to add tasks

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required!

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SRAVANI546/split-Smart.git
   cd split-Smart
   git checkout todo-app-localstorage
   ```

2. **Open in browser:**
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js http-server
     npx http-server
     ```

3. **Access the application:**
   - Open `http://localhost:8000` in your browser

## 📋 Usage Guide

### Adding a Task
1. Enter task description in the input field
2. Select category from dropdown
3. Choose priority level (Low, Medium, High)
4. Optionally set a due date
5. Click "+ Add Task" or press Enter

### Editing a Task
1. Click "✏️ Edit" button on any task
2. Modify task details in the modal
3. Click "Save Changes" to update

### Filtering Tasks
1. **By Status:** Click "All", "Active", or "Completed" buttons
2. **By Category:** Click category tags to filter
3. **By Search:** Type in search box to find tasks
4. **By Sort:** Select sorting option from dropdown

### Dark Mode
- Click the theme toggle button (🌙/☀️) in header
- Preference is saved automatically

### Exporting Tasks
- Click "📥 Export Tasks" button to download JSON file
- File is named with current date

## 🗂️ Project Structure

```
todo-app-localstorage/
├── index.html          # Main HTML file
├── styles.css          # Styling (with dark mode support)
├── app.js              # JavaScript logic and state management
└── README.md           # Documentation
```

## 💾 Local Storage

The application uses browser's localStorage API to persist data:

```javascript
// Tasks are stored as JSON
localStorage.setItem('tasks', JSON.stringify(tasks))

// Theme preference is also saved
localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode))
```

**Storage Keys:**
- `tasks` - Array of all tasks with their details
- `isDarkMode` - Boolean for theme preference

## 🎨 Color Scheme

### Light Mode
- Primary: Indigo (#6366f1)
- Secondary: Pink (#ec4899)
- Success: Green (#10b981)
- Warning: Amber (#f59e0b)
- Danger: Red (#ef4444)
- Background: White (#ffffff)
- Text: Dark Gray (#1f2937)

### Dark Mode
- Same colors with inverted backgrounds
- Background: Dark Gray (#1f2937)
- Text: Light Gray (#f3f4f6)

## 🔧 Technical Details

### Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Flexbox, Grid, Animations, Variables
- **JavaScript (Vanilla)** - ES6+ features, OOP with TaskManager class
- **Local Storage API** - Data persistence

### Key Features Implementation

**TaskManager Class:**
- Manages all task operations
- Handles filtering, sorting, and searching
- Manages local storage synchronization
- Manages theme state

**State Management:**
- Tasks array stored in class instance
- Automatic persistence to localStorage
- Real-time UI updates on state changes

**Event Handling:**
- Event delegation for dynamic tasks
- Keyboard shortcuts (Enter key)
- Modal interactions

## 🎯 Future Enhancements

- [ ] Recurring tasks
- [ ] Task reminders and notifications
- [ ] Collaborative sharing
- [ ] Cloud sync
- [ ] Task templates
- [ ] Time estimates and tracking
- [ ] Tags system
- [ ] Backup and restore
- [ ] Import from other apps
- [ ] Mobile app version

## 🐛 Known Issues

None currently reported. Please report any issues found!

## 💡 Tips & Tricks

1. **Quick Add:** Press Enter after typing to quickly add tasks
2. **Bulk Clear:** Use "Clear Completed Tasks" to clean up finished items
3. **Export Backup:** Regularly export tasks for backup
4. **Search Tips:** Use category names in search for quick filtering
5. **Responsive View:** App works great on mobile - try it!

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.

## 📧 Support

For support, questions, or suggestions, please open an issue on GitHub.

---

**Made with ❤️ by SRAVANI546**

Star ⭐ this repository if you find it helpful!