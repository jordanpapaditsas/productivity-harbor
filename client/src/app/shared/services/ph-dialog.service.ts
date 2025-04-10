import { Injectable } from '@angular/core';
import { PhConfirmComponent } from '../components/ph-confirm/ph-confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { PhDialogData } from '../../core/interfaces/ph-dialog-data';
import { firstValueFrom, Observable } from 'rxjs';
import { DialogTypeEnum } from '../../core/enums/dialog/dialog-type.enum';

@Injectable({
  providedIn: 'root',
})
export class PhDialogService {
  constructor(private dialog: MatDialog) {}

  // Method overloads
  async confirmDialog(
    title: string,
    message: string,
    type: DialogTypeEnum
  ): Promise<boolean>;
  async confirmDialog(data: PhDialogData): Promise<boolean>;

  async confirmDialog(
    dataOrTitle: string | PhDialogData,
    message?: string,
    type?: DialogTypeEnum
  ): Promise<boolean> {
    let dialogData: PhDialogData;

    if (typeof dataOrTitle === 'string') {
      dialogData = {
        Title: dataOrTitle,
        Message: message || '',
        ConfirmText: 'Confirm',
        CancelText: 'Cancel',
        Type: type,
      };
    } else {
      dialogData = dataOrTitle;
    }

    const dialogRef = this.dialog.open(PhConfirmComponent, {
      data: dialogData,
      width: '500px',
      height: 'auto',
      disableClose: true,
    });

    return await firstValueFrom(dialogRef.afterClosed());
  }
}
