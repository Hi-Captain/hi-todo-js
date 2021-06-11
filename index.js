import Task from './Task.js';

const taskContainer = document.querySelector('#task-container')
const taskTemplate = document.querySelector('#task-template')
const newTaskForm = document.querySelector('#new-task-form')
const newTaskInput = document.querySelector('#new-task-input')

let taskData = [{
  taskId: Date.now().toString(),
  title: '독서하기',
  isCompleted: false,
}]

function renderTask(task) {
  const taskNode = document.importNode(taskTemplate.content, true);
  const taskElement = taskNode.querySelector('li');
  const checkbox = taskNode.querySelector('input');
  const label = taskNode.querySelector('label');

  taskElement.id = `task-${task.taskId}`;

  checkbox.id = `task-input-${task.taskId}`;
  checkbox.checked = task.completed;

  label.htmlFor = `task-input-${task.taskId}`;
  label.append(task.title);

  taskContainer.appendChild(taskNode);
}

function submitNewTaskForm(e) {
  e.preventDefault();

  const title = newTaskInput.value;
  if (!title) return alert('오늘 할 일을 입력해 주세요!');

  const task = new Task(title);
  newTaskInput.value = '';
  taskData.push(task);
  
  renderTask(task);
}

function initRender() {
  taskData.forEach((task) => renderTask(task));
}

newTaskForm.addEventListener('submit', e => submitNewTaskForm(e));

initRender();