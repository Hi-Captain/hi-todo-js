import Task from './Task.js'

const taskContainer = document.querySelector('#task-container')
const taskTemplate = document.querySelector('#task-template')
const newTaskForm = document.querySelector('#new-task-form')
const newTaskInput = document.querySelector('#new-task-input')

let taskData = [{
  taskId: Date.now().toString(),
  title: '독서하기',
  isCompleted: false,
}]

function renderTask({taskId, isCompleted, title}) {
  const taskNode = document.importNode(taskTemplate.content, true)
  const taskElement = taskNode.querySelector('li')
  const checkbox = taskNode.querySelector('input')
  const label = taskNode.querySelector('label')
  const deleteBtn = taskNode.querySelector('#delete-btn')

  taskElement.id = `task-${taskId}`

  checkbox.id = `task-input-${taskId}`
  checkbox.checked = isCompleted

  label.htmlFor = `task-input-${taskId}`
  label.append(title)

  deleteBtn.dataset.taskId = taskId

  taskContainer.appendChild(taskNode)
}

function submitNewTaskForm(e) {
  e.preventDefault()

  const title = newTaskInput.value
  if (!title) return alert('오늘 할 일을 입력해 주세요!')

  const task = new Task(title)
  newTaskInput.value = ''
  taskData.push(task)

  renderTask(task)
}

function deleteTask(taskId) {
  const targetElement = document.querySelector(`#task-${taskId}`)
  
  taskData = taskData.filter(task => task.taskId !== taskId)

  targetElement.remove()
}

function clickTaskContainer(e) {
  const { id, dataset } = e.target

  if (id === 'delete-btn') deleteTask(dataset.taskId)
}

function initRender() {
  taskData.forEach((task) => renderTask(task))
}

newTaskForm.addEventListener('submit', e => submitNewTaskForm(e))
taskContainer.addEventListener('click', e => clickTaskContainer(e))

initRender()

// test
const dataCheckBtn = document.querySelector('#data-check')
dataCheckBtn.addEventListener('click', () => {
  console.log(taskData)
})