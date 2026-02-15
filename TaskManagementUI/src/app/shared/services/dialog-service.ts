import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private confirmationService = inject(ConfirmationService);
  
  confirmAction(config: { message: string, header: string, onAccept: () => void }) {
    this.confirmationService.confirm({
      message: config.message,
      header: config.header,
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: "p-button-danger",
      accept: () => config.onAccept()
    });
  }
}
