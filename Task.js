export default class Task {
  constructor(title, isCompleted = false) {
    this.taskId = Date.now().toString()
    this.title = title
    this.isCompleted = isCompleted
  }

  toggleCompleted() {
    this.isCompleted = !this.isCompleted
  }
}