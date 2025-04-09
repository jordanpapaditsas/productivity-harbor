import { Component, Inject, input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PhDialogData } from '../../../core/interfaces/ph-dialog-data';

@Component({
  selector: 'app-ph-confirm',
  templateUrl: './ph-confirm.component.html',
  styleUrls: ['./ph-confirm.component.css'],
})
export class PhConfirmComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PhConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PhDialogData
  ) {}

  ngOnInit() {}

  onConfirm() {
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
