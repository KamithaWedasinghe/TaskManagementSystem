export const TASK_TABLE_COLUMNS = [
  { field: 'id', header: 'Task ID', sortable: true, filterable: true, filterType: 'text' },
  { field: 'title', header: 'Title', sortable: true, filterable: true, filterType: 'text' },
  { field: 'dueDate', header: 'Due Date', sortable: true },
  { field: 'status', header: 'Status', sortable: true, filterable: true, filterType: 'text' },
  { field: 'createdAt', header: 'Created At', sortable: true}
];

export const TASK_STATUS_LABELS: { [key: string]: string } = {
  '1': 'Backlog',
  '2': 'To Do',
  '3': 'In progress',
  '4': 'In QA',
  '5': 'Done',
  '6': 'Blocked',
};


