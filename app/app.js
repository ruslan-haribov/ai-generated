(function () {
  const form = document.querySelector('[data-testid="task-form"]');
  const input = document.querySelector('[data-testid="task-input"]');
  const taskList = document.querySelector('[data-testid="task-list"]');
  const emptyState = document.querySelector('[data-testid="empty-state"]');
  const totalCount = document.querySelector('[data-testid="total-count"]');
  const activeCount = document.querySelector('[data-testid="active-count"]');
  const filterButtons = document.querySelectorAll('.filter-btn');

  let tasks = [];
  let currentFilter = 'all';
  let nextId = 1;

  function updateStats() {
    const active = tasks.filter((t) => !t.completed).length;
    totalCount.textContent = `${tasks.length} task${tasks.length !== 1 ? 's' : ''}`;
    activeCount.textContent = `${active} active`;
    emptyState.classList.toggle('hidden', tasks.length > 0);
  }

  function getFilteredTasks() {
    if (currentFilter === 'active') return tasks.filter((t) => !t.completed);
    if (currentFilter === 'completed') return tasks.filter((t) => t.completed);
    return tasks;
  }

  function render() {
    const filtered = getFilteredTasks();
    taskList.innerHTML = '';

    filtered.forEach((task) => {
      const li = document.createElement('li');
      li.className = `task-item${task.completed ? ' completed' : ''}`;
      li.dataset.testid = 'task-item';
      li.dataset.taskId = String(task.id);

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'task-checkbox';
      checkbox.dataset.testid = 'task-checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => toggleTask(task.id));

      const span = document.createElement('span');
      span.className = 'task-text';
      span.dataset.testid = 'task-text';
      span.textContent = task.text;

      const deleteBtn = document.createElement('button');
      deleteBtn.type = 'button';
      deleteBtn.className = 'delete-btn';
      deleteBtn.dataset.testid = 'delete-task-btn';
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => deleteTask(task.id));

      li.append(checkbox, span, deleteBtn);
      taskList.appendChild(li);
    });

    updateStats();
  }

  function addTask(text) {
    tasks.push({ id: nextId++, text, completed: false });
    render();
  }

  function toggleTask(id) {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.completed = !task.completed;
      render();
    }
  }

  function deleteTask(id) {
    tasks = tasks.filter((t) => t.id !== id);
    render();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addTask(text);
    input.value = '';
    input.focus();
  });

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter;
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      render();
    });
  });

  render();
})();
