/**
 * Daily Task Checklist - Frontend JavaScript
 * Handles all UI interactions and API calls to the backend
 */

// Dynamically set API URL based on current domain/IP
const API_URL = `${window.location.protocol}//${window.location.hostname}:5000`;
let allTasks = [];
let currentFilter = 'all';
let editingTaskId = null;

// DOM Elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const tasksList = document.getElementById('tasksList');
const errorMessage = document.getElementById('errorMessage');
const loadingSpinner = document.getElementById('loadingSpinner');
const filterBtns = document.querySelectorAll('.filter-btn');

// Statistics Elements
const totalTasksEl = document.getElementById('totalTasks');
const completedTasksEl = document.getElementById('completedTasks');
const pendingTasksEl = document.getElementById('pendingTasks');

// Event Listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
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

/**
 * Initialize the app by loading all tasks from the server
 */
async function initApp() {
  await loadTasks();
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
  setTimeout(() => {
    errorMessage.classList.remove('show');
  }, duration);
}

/**
 * Load all tasks from the API
 */
async function loadTasks() {
  try {
    showSpinner(true);
    const response = await fetch(`${API_URL}/tasks`);

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
 * Add a new task via API
 */
async function addTask() {
  const title = taskInput.value.trim();

  // Validation
  if (!title) {
    showError('Please enter a task title');
    return;
  }

  if (title.length > 100) {
    showError('Task title cannot exceed 100 characters');
    return;
  }

  try {
    showSpinner(true);
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Failed to create task');
    }

    const newTask = await response.json();
    allTasks.unshift(newTask); // Add to beginning of array
    taskInput.value = '';
    renderTasks();
    updateStats();
    showError('Task added successfully!', 2000);
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
    showError('Task deleted successfully!', 2000);
  } catch (error) {
    console.error('Error deleting task:', error);
    showError('Failed to delete task');
  } finally {
    showSpinner(false);
  }
}

/**
 * Edit a task title via API
 */
async function editTask(id) {
  const task = allTasks.find(t => t.id === id);
  if (!task) return;

  const newTitle = prompt('Edit task title:', task.title);
  if (newTitle === null) return; // User cancelled

  const trimmedTitle = newTitle.trim();
  if (!trimmedTitle) {
    showError('Task title cannot be empty');
    return;
  }

  if (trimmedTitle === task.title) {
    return; // No change
  }

  try {
    showSpinner(true);
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: trimmedTitle,
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
    showError('Task updated successfully!', 2000);
  } catch (error) {
    console.error('Error editing task:', error);
    showError(error.message);
  } finally {
    showSpinner(false);
  }
}

/**
 * Format date to a readable string
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
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
 * Render tasks based on current filter
 */
function renderTasks() {
  // Filter tasks based on current filter
  let filteredTasks = allTasks;
  if (currentFilter === 'completed') {
    filteredTasks = allTasks.filter(t => t.completed);
  } else if (currentFilter === 'pending') {
    filteredTasks = allTasks.filter(t => !t.completed);
  }

  // Clear the tasks list
  tasksList.innerHTML = '';

  // If no tasks, show empty state
  if (filteredTasks.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    if (currentFilter === 'all') {
      emptyState.innerHTML = '<p>📝 No tasks yet. Add one to get started!</p>';
    } else if (currentFilter === 'pending') {
      emptyState.innerHTML = '<p>✨ All tasks completed! Great job!</p>';
    } else {
      emptyState.innerHTML = '<p>📋 No completed tasks yet.</p>';
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
 * Create a task element DOM node
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

  const taskTitle = document.createElement('div');
  taskTitle.className = 'task-title';
  taskTitle.textContent = task.title;

  const taskDate = document.createElement('div');
  taskDate.className = 'task-date';
  taskDate.textContent = formatDate(task.created_at);

  taskContent.appendChild(taskTitle);
  taskContent.appendChild(taskDate);

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
