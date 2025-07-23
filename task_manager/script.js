const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, idx) => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.done ? ' task-done' : '');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    checkbox.addEventListener('change', () => {
      tasks[idx].done = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;

    // 日付表示
    const dateSpan = document.createElement('span');
    dateSpan.className = 'task-date';
    dateSpan.style.marginLeft = '12px';
    dateSpan.style.fontSize = '0.9em';
    dateSpan.style.color = '#888';
    dateSpan.textContent = task.date ? `(${task.date})` : '';

    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.textContent = '✕';
    delBtn.addEventListener('click', () => {
      tasks.splice(idx, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(dateSpan);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

taskForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text) {
    // 日付をYYYY-MM-DD形式で取得
    const now = new Date();
    const date = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
    tasks.push({ text, done: false, date });
    saveTasks();
    renderTasks();
    taskInput.value = '';
  }
});

renderTasks(); 