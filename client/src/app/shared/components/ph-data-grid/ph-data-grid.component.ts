import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { Component, Input, input, OnInit, output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'ph-data-grid',
  templateUrl: './ph-data-grid.component.html',
  styleUrls: ['./ph-data-grid.component.css'],
  imports: [
    MatTableModule,
    CommonModule,
    MatCheckboxModule,
    FormsModule,
    MatIconModule,
  ],
})
export class PhDataGridComponent implements OnInit {
  dataSource = input<CdkTableDataSourceInput<any[]>>([]);
  columns = input<
    Array<{
      dataField: string;
      dataType: string;
      label: string;
      visible: boolean;
    }>
  >([]);

  canEdit = input<boolean>(false);
  canDelete = input<boolean>(false);
  canSave = input<boolean>(false);
  onSaveRowClicked = output<any>();
  onEditRowClicked = output<any>();
  onDeleteRowClicked = output<any>();

  editingRowId: string | Guid | null = null;

  constructor() {}

  ngOnInit() {}

  getVisibleColumns() {
    const cols = this.columns()
      .filter((x) => x.visible)
      .map((x) => x.label);

    if (
      (this.canEdit() || this.canDelete() || this.canSave()) &&
      !cols.includes('actions')
    ) {
      cols.push('actions');
    }

    return cols;
  }

  getRowData(rowData: any) {
    return rowData;
  }

  getCellData(columnData: any) {
    return columnData;
  }

  isRowInEditMode(row: any): boolean {
    return this.editingRowId === row.Id;
  }

  onEditRowBtnClick(row: any) {
    this.editingRowId = row.Id;
    this.onEditRowClicked.emit(row);
  }

  onSaveRowClick(row: any) {
    this.onSaveRowClicked.emit(row);
    this.editingRowId = null;
  }

  onCancelEditRowClick(row: any) {
    this.editingRowId = null;
  }

  onDeleteRowBtnClick(row: any) {
    this.onDeleteRowClicked.emit(row);
    if (this.editingRowId === row.Id) {
      this.editingRowId = null;
    }
  }
}
