import { Component, signal, ViewChild } from '@angular/core';
import { TaskItem } from './components/task-item/task-item';
import { TaskDetailPanel } from './components/task-detail-panel/task-detail-panel';
import { TaskResponse } from './types/task.types';

@Component({
  selector: 'app-dashboard',
  imports: [TaskItem, TaskDetailPanel],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  @ViewChild(TaskItem) taskItem!: TaskItem;
  selectedTask = signal<TaskResponse | null>(null);

  onTaskSelected(task: TaskResponse): void {
    this.selectedTask.set(task);
  }

  onTaskDeleted(taskId: number): void {
    this.selectedTask.set(null);
    this.taskItem.loadTasks();
  }

  onTaskUpdated(updatedTask: TaskResponse): void {
    if (!this.selectedTask()) {
      this.taskItem.loadTasks();
    } else {
      this.taskItem.updateTaskInList(updatedTask);
    }
  }

  onAddTask(): void {
    this.selectedTask.set(null);
  }
}
