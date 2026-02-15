import { Component, OnInit, inject, ChangeDetectionStrategy, signal, output, input } from '@angular/core';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../../services/tasks.service';
import { CommonModule } from '@angular/common';
import { TaskResponse } from '../../types/task.types';
import { TASK_TABLE_COLUMNS, TASK_STATUS_LABELS } from '../../constants/task.constants';
import { TableComponent } from '../../../../shared/components/table-component/table-component';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [TableModule, CommonModule, FormsModule, TableComponent],
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItem implements OnInit {
  statusLabels = TASK_STATUS_LABELS;
  private taskService = inject(TasksService);

  cols = TASK_TABLE_COLUMNS;
  taskDetails = signal<TaskResponse[]>([]);
  
  selectedTask = input<TaskResponse | null>(null);
  taskSelected = output<TaskResponse>();
  addTask = output<void>();

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (response) => {
        this.taskDetails.set(response);
        if (response && response.length > 0 && !this.selectedTask()) {
          this.taskSelected.emit(response[0]);
        }
      },
      error: (err) => {
        console.error('Failed to load tasks:', err);
      }
    });
  }

  onRowSelect(task: TaskResponse): void {
    this.taskSelected.emit(task);
    console.log('Task selected:', task);
  }

  onAddTaskClick(): void {
    this.addTask.emit();
  }

  updateTaskInList(updatedTask: TaskResponse): void {
    const tasks = this.taskDetails();
    const index = tasks.findIndex(t => t.id === updatedTask.id);
    
    if (index !== -1) {
      tasks[index] = updatedTask;
      this.taskDetails.set([...tasks]);
    }
  }
}
