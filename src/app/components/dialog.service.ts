import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from '../models/dialog-data/confirm-dialog-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  confirmDialog(data: ConfirmDialogData): Observable<boolean>{
    return this.dialog.open(ConfirmDialogComponent,{
      data,
      width: '400px',
    }).afterClosed();
  }
}
