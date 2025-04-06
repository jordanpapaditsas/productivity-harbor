import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  Input,
  input,
  OnInit,
  output,
  ViewChild,
} from '@angular/core';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Guid } from 'guid-typescript';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { A11yModule } from '@angular/cdk/a11y';

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
    MatPaginator,
    MatPaginatorModule,
    MatToolbarModule,
    MatTooltipModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    DatePipe,
    A11yModule,
  ],
})
export class PhDataGridComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;

  public get dataSource() {
    return this._dataSource;
  }
  @Input()
  public set dataSource(value: MatTableDataSource<any, MatPaginator>) {
    if (!(value instanceof MatTableDataSource)) {
      this._dataSource = new MatTableDataSource(value);
    } else {
      this._dataSource = value;
    }
    if (this._dataSource && this.paginator) {
      this._dataSource.paginator = this.paginator;
    }
  }

  columns = input<
    Array<{
      dataField: string;
      dataType: string;
      label: string;
      visible: boolean;
      allowEditing?: boolean;
    }>
  >([]);
  canInsert = input<boolean>(false);
  canEdit = input<boolean>(false);
  canDelete = input<boolean>(false);
  onSavingRow = output<any>();
  onSavedRow = output<any>();
  onEditRow = output<any>();
  onDeleteRow = output<any>();
  onInsertRow = output<any>();
  onInitNewRow = output<any>();

  protected _rowKeyId: string | Guid | null = null;
  private _tempRowValues: Record<string, any> = {};
  private _dataSource!: any;

  constructor() {}

  ngOnInit() {}

  getVisibleColumns() {
    const visibleColumns = this.columns()
      .filter((x) => x.visible)
      .map((x) => x.label);

    if (
      (this.canEdit() || this.canDelete()) &&
      !visibleColumns.includes('actions')
    ) {
      visibleColumns.push('actions');
    }

    return visibleColumns;
  }

  getRowData(rowData: any) {
    return rowData;
  }

  getColumnData(columnData: any) {
    return columnData;
  }

  isRowInEditMode(row: any): boolean {
    return this._rowKeyId === row.Id;
  }

  isNewRow(row: any): boolean {
    return row.Id === null || row.Id === undefined;
  }

  onEditRowBtnClick(row: any) {
    this._rowKeyId = row.Id;

    if (!this._tempRowValues[row.Id]) {
      this._tempRowValues[row.Id] = { ...row };
    }

    this.onEditRow.emit(row);
  }

  onSaveRowBtnClick(row: any) {
    debugger;
    if (!Object.keys(row).length) {
      alert('Row is empty!');
      return;
    }

    this._rowKeyId = null;

    this.refreshDataSource();
    this.onSavedRow.emit(row);
    this.cleanTempRowValues(this._tempRowValues[row.Id]);
  }

  onCancelEditRowBtnClick(row: any) {
    this._rowKeyId = null;
    if (this.isNewRow(row)) {
      this.dataSource.data.shift();
      this.refreshDataSource();
    } else if (this._tempRowValues[row.Id]) {
      Object.assign(row, this._tempRowValues[row.Id]);
      this.refreshDataSource();
    }
    this.cleanTempRowValues(this._tempRowValues[row.Id]);
  }

  async onDeleteRowBtnClick(row: any) {
    if (this._rowKeyId === row.Id) {
      this._rowKeyId = null;
    }

    this.onDeleteRow.emit(row);
  }
  onInsertRowBtnClick() {
    const newRow: Record<string, any> = {};
    this.onInitNewRow.emit(newRow);
    debugger;

    this._dataSource.data.unshift(newRow);

    this.refreshDataSource();
    this.onInsertRow.emit(newRow);
  }

  refreshDataSource() {
    if (this.dataSource && this._dataSource.data) {
      this._dataSource.data = [...this.dataSource.data];
    }
  }

  cleanTempRowValues(row: any) {
    if (row && this._tempRowValues) {
      delete this._tempRowValues[row.Id];
    }
  }
}
