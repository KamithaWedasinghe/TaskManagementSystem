import { TASK_STATUS_LABELS } from '../../constants/task.constants';
import { Component, input, ChangeDetectionStrategy, effect, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskResponse } from '../../types/task.types';
import { TasksService } from '../../services/tasks.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService } from '../../../../shared/services/dialog-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { computed } from '@angular/core';

@Component({
  selector: 'app-task-detail-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, ToastModule, ConfirmDialogModule],
  templateUrl: './task-detail-panel.html',
  styleUrl: './task-detail-panel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailPanel {
  readonly isAddDisabled = computed(() => {
    const form = this.formData();
    return !form.title && !form.description && !form.dueDate && (form.status === undefined || form.status === null);
  });
  statusLabels = TASK_STATUS_LABELS;
  statusKeys = Object.keys(TASK_STATUS_LABELS);

  selectedTask = input<TaskResponse | null>(null);

  taskDeleted = output<number>();

  today = new Date();

  taskUpdated = output<TaskResponse>();

  formData = signal<Partial<TaskResponse>>({})
  isDeleting = false;
  isSaving = false;

  readonly hasChanges = computed(() => {
    const task = this.selectedTask();
    const form = this.formData();
    if (!task) return true;
    return (
      form.title !== undefined && form.title !== task.title ||
      form.description !== undefined && form.description !== task.description ||
      form.dueDate !== undefined && form.dueDate !== task.dueDate ||
      form.status !== undefined && form.status !== task.status
    );
  });

  private tasksService = inject(TasksService);
  private dialogService = inject(DialogService);
  private messageService = inject(MessageService);
  private destroy$ = new Subject<void>();

  constructor() {
    effect(() => {
      const task = this.selectedTask();
      if (task) {
        this.formData.set({ ...task });
      } else {
        this.formData.set({});
      }
    });
  }

  onDeleteTask() {
    const task = this.selectedTask();
    if (!task) return;

    this.dialogService.confirmAction({
      header: 'Delete Confirmation',
      message: `Are you sure you want to delete task with ID ${task.id}?`,
      onAccept: () => this.executeDelete(task.id)
    });
  }

  private executeDelete(taskId: number) {
    this.isDeleting = true;
    this.tasksService.deleteTask(taskId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.taskDeleted.emit(taskId);
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: `Task with ID ${taskId} deleted successfully` });
          this.isDeleting = false;
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `Failed to delete task with ID ${taskId}` });
          this.isDeleting = false;
        }
      });
  }

  onSaveTask() {
    const task = this.selectedTask();

    if (!task) {
      this.dialogService.confirmAction({
        header: 'Add task Confirmation',
        message: `Are you sure you want to add this new task?`,
        onAccept: () => this.addNewTask()
      });
      return;
    }
    this.dialogService.confirmAction({
      header: 'Update Confirmation',
      message: `Are you sure you want to update changes?`,
      onAccept: () => this.updateTask(task)
    });
  }

  private updateTask(task: TaskResponse) {
    const updatedTask: TaskResponse = {
      id: task.id,
      title: this.formData().title || task.title,
      description: this.formData().description || task.description,
      status: this.formData().status ?? task.status,
      dueDate: this.formData().dueDate || task.dueDate,
      createdAt: task.createdAt,
    };
    this.isSaving = true;
    this.tasksService.updateTask(updatedTask)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.taskUpdated.emit(updatedTask);
          this.isSaving = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Updated',
            detail: `Task with ID ${updatedTask.id} updated successfully!`
          });
        },
        error: (err) => {
          this.isSaving = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Failed to update task with ID ${updatedTask.id}. Please try again.`
          });
        },
      });
  }

  private addNewTask() {
    const newTask = {
      title: this.formData().title || '',
      description: this.formData().description || '',
      status: this.formData().status ?? 0,
      dueDate: this.formData().dueDate || '',
      createdAt: this.today.toISOString().slice(0, 10),
    };
    this.isSaving = true;
    this.tasksService.addTask(newTask as TaskResponse)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (createdTask) => {
          this.taskUpdated.emit(createdTask);
          this.formData.set({});
          this.isSaving = false;
          this.messageService.add({
            severity: 'success',
            summary: 'New Task Added',
            detail: 'New task has been successfully added!'
          });
        },
        error: (err) => {
          this.isSaving = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error adding task. Please try again.'
          });
        }
      });
  }

  updateTitle(value: string) {
    this.formData.update(v => ({ ...v, title: value }));
  }

  updateDescription(value: string) {
    this.formData.update(v => ({ ...v, description: value }));
  }

  updateDueDate(value: string) {
    this.formData.update(v => ({ ...v, dueDate: value }));
  }

  updateStatus(value: string) {
    this.formData.update(v => ({ ...v, status: parseInt(value) }));
  }

  trackByStatusKey(index: number, key: string) {
    return key;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
