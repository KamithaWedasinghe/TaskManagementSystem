import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-table-component',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './table-component.html',
  styleUrl: './table-component.scss',
})
export class TableComponent {
  @Input() columns: any[] = [];
  @Input() data: any[] = [];
  @Input() statusLabels: { [key: string]: string } = {};
  @Input() selectedTask: any;
  @Output() rowSelect = new EventEmitter<any>();
  @Output() addTask = new EventEmitter<void>();

  onRowSelect(row: any) {
    this.rowSelect.emit(row);
  }

  onAddTaskClick() {
    this.addTask.emit();
  }
}
