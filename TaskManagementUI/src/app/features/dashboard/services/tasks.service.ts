import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskResponse } from '../types/task.types';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private http = inject(HttpClient);
  private apiUrl = '/api/TaskManage';

  getAllTasks(): Observable<TaskResponse[]> {
    return this.http.get<TaskResponse[]>(this.apiUrl);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateTask(task: TaskResponse): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${task.id}`, task);
  }

  addTask(task: Omit<TaskResponse, 'id'>): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(this.apiUrl, task);
  }

}
