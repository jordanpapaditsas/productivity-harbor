import { Component, Inject, input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PhDialogData } from '../../../core/interfaces/ph-dialog-data';
import { DialogTypeEnum } from '../../../core/enums/dialog/dialog-type.enum';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-ph-confirm',
  templateUrl: './ph-confirm.component.html',
  styleUrls: ['./ph-confirm.component.css'],
  imports: [NgClass],
})
export class PhConfirmComponent implements OnInit {
  popupType?: string;

  constructor(
    public dialogRef: MatDialogRef<PhConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PhDialogData
  ) {
    if (data.type === DialogTypeEnum.Warning) {
      this.popupType = 'ph-warning';
    } else if (data.type === DialogTypeEnum.Danger) {
      this.popupType = 'ph-danger';
    } else if (data.type === DialogTypeEnum.Passive) {
      this.popupType = 'ph-passive';
    } else if (data.type === null) {
      this.popupType = 'popup-inner-container';
    }
  }

  ngOnInit() {}

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
