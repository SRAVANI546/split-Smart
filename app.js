// TaskMaster - To-Do List Application with Local Storage

class TaskManager {
  constructor() {
    this.tasks = this.loadTasks();
    this.currentFilter = 'all';
    this.currentCategory = 'all';
    this.currentSort = 'date-added';
    this.searchQuery = '';
    this.editingTaskId = null;
    this.isDarkMode = this.loadTheme();
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.applyTheme();
    this.render();
  }

  setupEventListeners() {
    // Add task
    document.getElementById('addBtn').addEventListener('click', () => this.addTask());
    document.getElementById('taskInput').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addTask();
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.currentFilter = e.target.dataset.filter;
        this.render();
      });
    });

    // Category filter
    document.querySelectorAll('.category-tag').forEach(tag => {
      tag.addEventListener('click', (e) => {
        document.querySelectorAll('.category-tag').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        this.currentCategory = e.target.dataset.category;
        this.render();
      });
    });

    // Search
    document.getElementById('searchInput').addEventListener('input', (e) => {
      this.searchQuery = e.target.value.toLowerCase();
      this.render();
    });

    // Sort
    document.getElementById('sortSelect').addEventListener('change', (e) => {
      this.currentSort = e.target.value;
      this.render();
    });

    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());

    // Clear completed
    document.getElementById('clearCompletedBtn').addEventListener('click', () => this.clearCompleted());

    // Export
    document.getElementById('exportBtn').addEventListener('click', () => this.exportTasks());

    // Modal handlers
    document.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
    document.getElementById('cancelEditBtn').addEventListener('click', () => this.closeModal());
    document.getElementById('saveEditBtn').addEventListener('click', () => this.saveEdit());

    document.getElementById('editModal').addEventListener('click', (e) => {
      if (e.target.id === 'editModal') this.closeModal();
    });
  }

  addTask() {
    const input = document.getElementById('taskInput');
    const category = document.getElementById('categorySelect').value;
    const priority = document.getElementById('prioritySelect').value;
    const dueDate = document.getElementById('dueDateInput').value;

    if (input.value.trim() === '') {
      alert('Please enter a task!');
      return;
    }

    const task = {
      id: Date.now(),
      text: input.value,
      completed: false,
      category,
      priority,
      dueDate,
      createdAt: new Date().toISOString()
    };

    this.tasks.unshift(task);
    this.saveTasks();
    this.render();

    // Reset form
    input.value = '';
    document.getElementById('dueDateInput').value = '';
    input.focus();
  }

  deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.saveTasks();
      this.render();
    }
  }

  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.saveTasks();
      this.render();
    }
  }

  openEditModal(id) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;

    this.editingTaskId = id;
    document.getElementById('editTaskInput').value = task.text;
    document.getElementById('editCategory').value = task.category;
    document.getElementById('editPriority').value = task.priority;
    document.getElementById('editDueDate').value = task.dueDate || '';
    document.getElementById('editModal').classList.add('active');
  }

  closeModal() {
    document.getElementById('editModal').classList.remove('active');
    this.editingTaskId = null;
  }

  saveEdit() {
    if (this.editingTaskId === null) return;

    const task = this.tasks.find(t => t.id === this.editingTaskId);
    if (task) {
      task.text = document.getElementById('editTaskInput').value;
      task.category = document.getElementById('editCategory').value;
      task.priority = document.getElementById('editPriority').value;
      task.dueDate = document.getElementById('editDueDate').value;

      this.saveTasks();
      this.render();
      this.closeModal();
    }
  }

  getFilteredTasks() {
    let filtered = this.tasks;

    // Filter by status
    if (this.currentFilter === 'active') {
      filtered = filtered.filter(t => !t.completed);
    } else if (this.currentFilter === 'completed') {
      filtered = filtered.filter(t => t.completed);
    }

    // Filter by category
    if (this.currentCategory !== 'all') {
      filtered = filtered.filter(t => t.category === this.currentCategory);
    }

    // Filter by search query
    if (this.searchQuery) {
      filtered = filtered.filter(t =>
        t.text.toLowerCase().includes(this.searchQuery) ||
        t.category.toLowerCase().includes(this.searchQuery)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (this.currentSort) {
        case 'priority':
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'due-date':
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'alphabetical':
          return a.text.localeCompare(b.text);
        case 'date-added':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return filtered;
  }

  updateStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter(t => t.completed).length;
    const pending = total - completed;

    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('pendingTasks').textContent = pending;
  }

  formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  isOverdue(dateString) {
    if (!dateString) return false;
    const due = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return due < today;
  }

  render() {
    const filteredTasks = this.getFilteredTasks();
    const tasksList = document.getElementById('tasksList');
    const emptyState = document.getElementById('emptyState');

    tasksList.innerHTML = '';

    if (filteredTasks.length === 0) {
      emptyState.classList.add('active');
      return;
    }

    emptyState.classList.remove('active');

    filteredTasks.forEach(task => {
      const li = document.createElement('li');
      li.className = `task-item ${task.completed ? 'completed' : ''}`;

      const categoryEmoji = {
        work: '💼',
        personal: '👤',
        shopping: '🛒',
        health: '💪',
        other: '📌'
      };

      const priorityLabel = {
        low: 'Low',
        medium: 'Medium',
        high: 'High'
      };

      const isOverdue = this.isOverdue(task.dueDate) && !task.completed;
      const dueDateFormatted = this.formatDate(task.dueDate);

      li.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
        <div class="task-content">
          <div class="task-header">
            <span class="task-text">${this.escapeHtml(task.text)}</span>
          </div>
          <div class="task-meta">
            <span class="badge category-badge">${categoryEmoji[task.category]} ${task.category.charAt(0).toUpperCase() + task.category.slice(1)}</span>
            <span class="badge priority-badge priority-${task.priority}">${priorityLabel[task.priority]}</span>
            ${dueDateFormatted ? `<span class="badge due-date-badge" ${isOverdue ? 'style="background: rgba(239, 68, 68, 0.2); color: var(--danger-color);"' : ''}>${isOverdue ? '⚠️ ' : '📅 '}${dueDateFormatted}</span>` : ''}
          </div>
        </div>
        <div class="task-actions">
          <button class="task-btn edit-btn">✏️ Edit</button>
          <button class="task-btn delete-btn">🗑️ Delete</button>
        </div>
      `;

      const checkbox = li.querySelector('.task-checkbox');
      checkbox.addEventListener('change', () => this.toggleTask(task.id));

      const deleteBtn = li.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', () => this.deleteTask(task.id));

      const editBtn = li.querySelector('.edit-btn');
      editBtn.addEventListener('click', () => this.openEditModal(task.id));

      tasksList.appendChild(li);
    });

    this.updateStats();
  }

  clearCompleted() {
    if (confirm('Clear all completed tasks? This cannot be undone!')) {
      this.tasks = this.tasks.filter(t => !t.completed);
      this.saveTasks();
      this.render();
    }
  }

  exportTasks() {
    const dataStr = JSON.stringify(this.tasks, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tasks-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    this.saveTheme();
  }

  applyTheme() {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
      document.getElementById('themeToggle').textContent = '☀️';
    } else {
      document.body.classList.remove('dark-mode');
      document.getElementById('themeToggle').textContent = '🌙';
    }
  }

  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  loadTasks() {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  }

  saveTheme() {
    localStorage.setItem('isDarkMode', JSON.stringify(this.isDarkMode));
  }

  loadTheme() {
    const saved = localStorage.getItem('isDarkMode');
    return saved ? JSON.parse(saved) : false;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  new TaskManager();
});