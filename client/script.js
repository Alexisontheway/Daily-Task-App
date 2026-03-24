/**
 * Daily Task Checklist - Frontend JavaScript
 * Enhanced with priority, due dates, categories, search, dark mode, and more
 */

// Dynamically set API URL based on current domain/IP
// If loaded via file://, default to localhost:5000
const getApiUrl = () => {
  if (window.location.protocol === 'file:') {
    return 'http://localhost:5000';
  }
  return `${window.location.protocol}//${window.location.hostname}:5000`;
};

const API_URL = getApiUrl();
console.log('API URL:', API_URL); // Debug log

let allTasks = [];
let currentFilter = 'all';
let currentPriorityFilter = '';
let currentCategoryFilter = '';
let currentSearchQuery = '';
let currentSortBy = 'created_at';

// DOM Elements
const taskInput = document.getElementById('taskInput');
const taskDescription = document.getElementById('taskDescription');
const taskPriority = document.getElementById('taskPriority');
const taskDueDate = document.getElementById('taskDueDate');
const taskCategory = document.getElementById('taskCategory');
const addBtn = document.getElementById('addBtn');
const clearFormBtn = document.getElementById('clearFormBtn');
const tasksList = document.getElementById('tasksList');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const loadingSpinner = document.getElementById('loadingSpinner');
const filterBtns = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const darkModeBtn = document.getElementById('darkModeBtn');
const filterPriority = document.getElementById('filterPriority');
const filterCategory = document.getElementById('filterCategory');
const sortBy = document.getElementById('sortBy');

// Statistics Elements
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const pendingTasksEl = document.getElementById('pendingTasks');

// Event Listeners
addBtn.addEventListener('click', addTask);
clearFormBtn.addEventListener('click', clearForm);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    addTask();
  }
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

searchInput.addEventListener('input', (e) => {
  currentSearchQuery = e.target.value;
  renderTasks();
});

filterPriority.addEventListener('change', (e) => {
  currentPriorityFilter = e.target.value;
  renderTasks();
});

filterCategory.addEventListener('change', (e) => {
  currentCategoryFilter = e.target.value;
  renderTasks();
});

sortBy.addEventListener('change', (e) => {
  currentSortBy = e.target.value;
  renderTasks();
});

darkModeBtn.addEventListener('click', toggleDarkMode);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    addTask(); // Ctrl+Enter to add task
  }
  if (e.key === 'Escape') {
    clearForm(); // Escape to clear form
  }
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    e.preventDefault();
    searchInput.focus(); // Ctrl+S to focus search
  }
});

/**
 * Initialize the app by loading all tasks from the server
 */
async function initApp() {
  loadDarkModePreference();
  await loadTasks();
  updateCategoryFilter();
}

/**
 * Toggle dark mode and save preference
 */
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
  darkModeBtn.textContent = isDarkMode ? '☀️' : '🌙';
}

/**
 * Load dark mode preference from localStorage
 */
function loadDarkModePreference() {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    darkModeBtn.textContent = '☀️';
  }
}

/**
 * Clear the task form
 */
function clearForm() {
  taskInput.value = '';
  taskDescription.value = '';
  taskPriority.value = 'medium';
  taskDueDate.value = '';
  taskCategory.value = '';
  taskInput.focus();
}

/**
 * Show or hide the loading spinner
 */
function showSpinner(show) {
  if (show) {
    loadingSpinner.classList.remove('hidden');
  } else {
    loadingSpinner.classList.add('hidden');
  }
}

/**
 * Display an error message to the user
 */
function showError(message, duration = 3000) {
  errorMessage.textContent = message;
  errorMessage.classList.add('show');
  successMessage.classList.remove('show');
  setTimeout(() => {
    errorMessage.classList.remove('show');
  }, duration);
}

/**
 * Display a success message to the user
 */
function showSuccess(message, duration = 2000) {
  successMessage.textContent = message;
  successMessage.classList.add('show');
  errorMessage.classList.remove('show');
  setTimeout(() => {
    successMessage.classList.remove('show');
  }, duration);
}

/**
 * Update the category filter dropdown with all available categories
 */
function updateCategoryFilter() {
  const categories = [...new Set(allTasks
    .map(t => t.category)
    .filter(c => c && c.trim()))];
  
  const currentValue = filterCategory.value;
  const options = filterCategory.querySelectorAll('option');
  
  // Remove all options except the first one
  while (options.length > 1) {
    options[options.length - 1].remove();
    options = filterCategory.querySelectorAll('option');
  }
  
  // Add new category options
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    filterCategory.appendChild(option);
  });
  
  // Restore previous selection if it still exists
  filterCategory.value = currentValue;
}

/**
 * Load all tasks from the API with optional filters
 */
async function loadTasks() {
  try {
    showSpinner(true);
    
    // Build query string with filters
    const params = new URLSearchParams();
    if (currentSearchQuery) params.append('search', currentSearchQuery);
    if (currentPriorityFilter) params.append('priority', currentPriorityFilter);
    if (currentCategoryFilter) params.append('category', currentCategoryFilter);
    params.append('sortBy', currentSortBy);

    const queryString = params.toString() ? `?${params.toString()}` : '';
    const response = await fetch(`${API_URL}/tasks${queryString}`);

    if (!response.ok) {
      throw new Error('Failed to load tasks');
    }

    allTasks = await response.json();
    renderTasks();
    updateStats();
  } catch (error) {
    console.error('Error loading tasks:', error);
    showError('Failed to load tasks. Please try again.');
  } finally {
    showSpinner(false);
  }
}

/**
 * Add a new task via API with all optional fields
 */
async function addTask() {
  const title = taskInput.value.trim();
  const description = taskDescription.value.trim();
  const priority = taskPriority.value;
  const dueDate = taskDueDate.value;
  const category = taskCategory.value.trim();

  // Validation
  if (!title) {
    showError('Please enter a task title');
    return;
  }

  if (title.length > 200) {
    showError('Task title cannot exceed 200 characters');
    return;
  }

  try {
    showSpinner(true);
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        priority,
        due_date: dueDate || null,
        category,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to create task');
    }

    const newTask = await response.json();
    allTasks.unshift(newTask);
    clearForm();
    renderTasks();
    updateStats();
    updateCategoryFilter();
    showSuccess('Task added successfully! 🎉');
  } catch (error) {
    console.error('Error adding task:', error);
    showError(error.message);
  } finally {
    showSpinner(false);
  }
}

/**
 * Toggle task completion status via API
 */
async function toggleTask(id) {
  const task = allTasks.find(t => t.id === id);
  if (!task) return;

  try {
    showSpinner(true);
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        completed: !task.completed,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update task');
    }

    const updatedTask = await response.json();
    const index = allTasks.findIndex(t => t.id === id);
    allTasks[index] = updatedTask;
    renderTasks();
    updateStats();
    const message = updatedTask.completed ? '✓ Task completed!' : '↩️ Task marked pending';
    showSuccess(message, 1500);
  } catch (error) {
    console.error('Error toggling task:', error);
    showError('Failed to update task');
  } finally {
    showSpinner(false);
  }
}

/**
 * Delete a task via API
 */
async function deleteTask(id) {
  if (!confirm('Are you sure you want to delete this task?')) {
    return;
  }

  try {
    showSpinner(true);
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete task');
    }

    allTasks = allTasks.filter(t => t.id !== id);
    renderTasks();
    updateStats();
    updateCategoryFilter();
    showSuccess('Task deleted! 🗑️', 1500);
  } catch (error) {
    console.error('Error deleting task:', error);
    showError('Failed to delete task');
  } finally {
    showSpinner(false);
  }
}

/**
 * Edit a task - open inline editor
 */
function editTask(id) {
  const task = allTasks.find(t => t.id === id);
  if (!task) return;

  // Create modal overlay
  const modal = document.createElement('div');
  modal.className = 'modal';
  
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';
  
  modalContent.innerHTML = `
    <div class="modal-header">
      <h2>Edit Task</h2>
      <button class="modal-close">&times;</button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label>Task Title</label>
        <input type="text" id="editTitle" value="${escapeHtml(task.title)}" maxlength="200" class="modal-input">
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea id="editDescription" class="modal-textarea" maxlength="1000">${escapeHtml(task.description || '')}</textarea>
      </div>
      <div class="form-row form-grid">
        <div class="form-group">
          <label>Priority</label>
          <select id="editPriority" class="modal-select">
            <option value="low">🟢 Low Priority</option>
            <option value="medium">🟡 Medium Priority</option>
            <option value="high">🔴 High Priority</option>
          </select>
        </div>
        <div class="form-group">
          <label>Category</label>
          <input type="text" id="editCategory" value="${escapeHtml(task.category || '')}" maxlength="50" class="modal-input">
        </div>
        <div class="form-group">
          <label>Due Date</label>
          <input type="date" id="editDueDate" value="${task.due_date || ''}" class="modal-input">
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button id="modalCancel" class="btn btn-secondary">Cancel</button>
      <button id="modalSave" class="btn btn-primary">Save Changes</button>
    </div>
  `;

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // Set the priority dropdown value
  document.getElementById('editPriority').value = task.priority || 'medium';

  // Event listeners
  document.getElementById('modalCancel').addEventListener('click', () => modal.remove());
  document.querySelector('.modal-close').addEventListener('click', () => modal.remove());
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  document.getElementById('modalSave').addEventListener('click', async () => {
    const title = document.getElementById('editTitle').value.trim();
    const description = document.getElementById('editDescription').value.trim();
    const priority = document.getElementById('editPriority').value;
    const category = document.getElementById('editCategory').value.trim();
    const dueDate = document.getElementById('editDueDate').value;

    if (!title) {
      showError('Task title cannot be empty');
      return;
    }

    try {
      showSpinner(true);
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          priority,
          category,
          due_date: dueDate || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update task');
      }

      const updatedTask = await response.json();
      const index = allTasks.findIndex(t => t.id === id);
      allTasks[index] = updatedTask;
      renderTasks();
      updateStats();
      updateCategoryFilter();
      showSuccess('Task updated! ✏️');
      modal.remove();
    } catch (error) {
      console.error('Error editing task:', error);
      showError(error.message);
    } finally {
      showSpinner(false);
    }
  });

  // Focus on title input
  document.getElementById('editTitle').focus();
}

/**
 * Escape HTML special characters to prevent XSS
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

/**
 * Format date to a readable string
 */
function formatDate(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Reset time for accurate date comparison
  today.setHours(0, 0, 0, 0);
  tomorrow.setHours(0, 0, 0, 0);
  yesterday.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  if (date.getTime() === today.getTime()) {
    return 'Today';
  } else if (date.getTime() === tomorrow.getTime()) {
    return 'Tomorrow';
  } else if (date.getTime() === yesterday.getTime()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
    });
  }
}

/**
 * Format created_at timestamp
 */
function formatCreatedDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Render tasks based on current filter and search
 */
function renderTasks() {
  // Apply status filter
  let filteredTasks = allTasks;
  if (currentFilter === 'completed') {
    filteredTasks = filteredTasks.filter(t => t.completed);
  } else if (currentFilter === 'pending') {
    filteredTasks = filteredTasks.filter(t => !t.completed);
  } else if (currentFilter === 'high') {
    filteredTasks = filteredTasks.filter(t => t.priority === 'high' && !t.completed);
  }

  // Apply priority filter
  if (currentPriorityFilter) {
    filteredTasks = filteredTasks.filter(t => t.priority === currentPriorityFilter);
  }

  // Apply category filter
  if (currentCategoryFilter) {
    filteredTasks = filteredTasks.filter(t => t.category === currentCategoryFilter);
  }

  // Apply search
  if (currentSearchQuery) {
    const query = currentSearchQuery.toLowerCase();
    filteredTasks = filteredTasks.filter(t =>
      t.title.toLowerCase().includes(query) ||
      (t.description && t.description.toLowerCase().includes(query)) ||
      (t.category && t.category.toLowerCase().includes(query))
    );
  }

  // Clear the tasks list
  tasksList.innerHTML = '';

  // If no tasks, show empty state
  if (filteredTasks.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    if (currentFilter === 'all' && !currentSearchQuery && !currentPriorityFilter && !currentCategoryFilter) {
      emptyState.innerHTML = '<p>📝 No tasks yet. Add one to get started!</p>';
    } else if (currentFilter === 'pending') {
      emptyState.innerHTML = '<p>✨ All tasks completed! Great job!</p>';
    } else if (currentFilter === 'completed') {
      emptyState.innerHTML = '<p>📋 No completed tasks yet.</p>';
    } else {
      emptyState.innerHTML = '<p>🔍 No tasks match your filters.</p>';
    }
    tasksList.appendChild(emptyState);
    return;
  }

  // Render each task
  filteredTasks.forEach(task => {
    const taskEl = createTaskElement(task);
    tasksList.appendChild(taskEl);
  });
}

/**
 * Create a task element DOM node with all task details
 */
function createTaskElement(task) {
  const taskItem = document.createElement('div');
  taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
  taskItem.dataset.taskId = task.id;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'task-checkbox';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', () => toggleTask(task.id));

  const taskContent = document.createElement('div');
  taskContent.className = 'task-content';

  // Priority badge
  const priorityBadge = document.createElement('span');
  priorityBadge.className = `priority-badge priority-${task.priority}`;
  const priorityEmoji = task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢';
  priorityBadge.textContent = priorityEmoji;
  taskContent.appendChild(priorityBadge);

  // Task title
  const taskTitle = document.createElement('div');
  taskTitle.className = 'task-title';
  taskTitle.textContent = task.title;
  taskContent.appendChild(taskTitle);

  // Task description
  if (task.description) {
    const taskDesc = document.createElement('div');
    taskDesc.className = 'task-description';
    taskDesc.textContent = task.description;
    taskContent.appendChild(taskDesc);
  }

  // Task meta information (category, due date, created date)
  const taskMeta = document.createElement('div');
  taskMeta.className = 'task-meta';

  if (task.category) {
    const categoryTag = document.createElement('span');
    categoryTag.className = 'tag tag-category';
    categoryTag.textContent = task.category;
    taskMeta.appendChild(categoryTag);
  }

  if (task.due_date) {
    const dueTag = document.createElement('span');
    dueTag.className = 'tag tag-due-date';
    const formattedDueDate = formatDate(task.due_date);
    dueTag.textContent = `📅 ${formattedDueDate}`;
    taskMeta.appendChild(dueTag);
  }

  const createdTag = document.createElement('span');
  createdTag.className = 'tag tag-created';
  createdTag.textContent = formatCreatedDate(task.created_at);
  taskMeta.appendChild(createdTag);

  taskContent.appendChild(taskMeta);

  // Task actions
  const taskActions = document.createElement('div');
  taskActions.className = 'task-actions';

  const editBtn = document.createElement('button');
  editBtn.className = 'btn-small btn-edit';
  editBtn.title = 'Edit task';
  editBtn.innerHTML = '✏️';
  editBtn.addEventListener('click', () => editTask(task.id));

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn-small btn-delete';
  deleteBtn.title = 'Delete task';
  deleteBtn.innerHTML = '🗑️';
  deleteBtn.addEventListener('click', () => deleteTask(task.id));

  taskActions.appendChild(editBtn);
  taskActions.appendChild(deleteBtn);

  taskItem.appendChild(checkbox);
  taskItem.appendChild(taskContent);
  taskItem.appendChild(taskActions);

  return taskItem;
}

/**
 * Update statistics counters
 */
function updateStats() {
  const total = allTasks.length;
  const completed = allTasks.filter(t => t.completed).length;
  const pending = total - completed;

  totalTasksEl.textContent = total;
  completedTasksEl.textContent = completed;
  pendingTasksEl.textContent = pending;
}

// Initialize app when page loads
document.addEventListener('DOMContentLoaded', initApp);

/**
 * 3D Interactive Star Canvas Background
 * Creates a dynamic, immersive starfield that responds to mouse movement
 */
class StarField {
  constructor() {
    this.canvas = document.getElementById('starCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.mouseX = 0;
    this.mouseY = 0;
    
    this.resizeCanvas();
    this.init();
    this.animate();
    
    window.addEventListener('resize', () => this.resizeCanvas());
    document.addEventListener('mousemove', (e) => this.onMouseMove(e));
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    this.stars = [];
    const starCount = 300;
    
    for (let i = 0; i < starCount; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        z: Math.random() * 1000,
        vz: Math.random() * 2 + 1,
        size: Math.random() * 1.5,
        opacity: Math.random() * 0.7 + 0.3,
        color: this.randomStarColor()
      });
    }
  }

  randomStarColor() {
    const colors = ['#fff', '#dfefff', '#ffdfef', '#fbf8ff', '#a8d8ff'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  onMouseMove(e) {
    this.mouseX = (e.clientX / this.canvas.width) * 2 - 1;
    this.mouseY = (e.clientY / this.canvas.height) * 2 - 1;
  }

  update() {
    for (let star of this.stars) {
      // Move stars forward (towards camera)
      star.z -= star.vz;
      
      // Reset stars that have passed the camera
      if (star.z <= 0) {
        star.z = 1000;
        star.x = Math.random() * this.canvas.width;
        star.y = Math.random() * this.canvas.height;
      }

      // Apply mouse influence (parallax effect)
      star.x += this.mouseX * star.z * 0.005;
      star.y += this.mouseY * star.z * 0.005;

      // Wrap around edges
      if (star.x < 0) star.x = this.canvas.width;
      if (star.x > this.canvas.width) star.x = 0;
      if (star.y < 0) star.y = this.canvas.height;
      if (star.y > this.canvas.height) star.y = 0;
    }
  }

  draw() {
    // Clear canvas with semi-transparent black for trail effect
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw stars
    for (let star of this.stars) {
      // Calculate size and brightness based on depth
      const scale = (1000 - star.z) / 1000;
      const size = star.size * scale;
      const opacity = star.opacity * scale;

      // Draw star
      this.ctx.fillStyle = `${star.color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
      this.ctx.fill();

      // Draw glow effect for closer stars
      if (scale > 0.5) {
        this.ctx.strokeStyle = `${star.color}${Math.round(opacity * 100).toString(16).padStart(2, '0')}`;
        this.ctx.lineWidth = size * 0.5;
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, size * 1.5, 0, Math.PI * 2);
        this.ctx.stroke();
      }

      // Draw connecting lines between nearby stars
      if (scale > 0.6) {
        for (let other of this.stars) {
          const otherScale = (1000 - other.z) / 1000;
          if (otherScale < 0.6) continue;

          const dx = star.x - other.x;
          const dy = star.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100 && distance > 0) {
            const lineOpacity = (1 - distance / 100) * opacity * 0.2;
            this.ctx.strokeStyle = `${star.color}${Math.round(lineOpacity * 255).toString(16).padStart(2, '0')}`;
            this.ctx.lineWidth = 0.5;
            this.ctx.beginPath();
            this.ctx.moveTo(star.x, star.y);
            this.ctx.lineTo(other.x, other.y);
            this.ctx.stroke();
          }
        }
      }
    }
  }

  animate = () => {
    this.update();
    this.draw();
    requestAnimationFrame(this.animate);
  };
}

// Initialize starfield when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new StarField();
  });
} else {
  new StarField();
}
