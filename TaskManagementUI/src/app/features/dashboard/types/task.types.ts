export enum TaskStatus {
  Backlog = 1,
  ToDo = 2,
  InProgress = 3,
  InQA = 4,
  Done = 5,
  Blocked = 6
}

export interface TaskResponse {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
  updatedAt?: string;
}


