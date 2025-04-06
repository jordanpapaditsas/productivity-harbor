import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  input,
  OnInit,
  output,
  signal,
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
  ],
})
export class PhDataGridComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<any>;

  private _dataSource!: any;
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
  onSaveRowClicked = output<any>();
  onEditRowClicked = output<any>();
  onDeleteRowClicked = output<any>();
  onInsertRowClicked = output<any>();

  protected _rowKeyId: string | Guid | null = null;

  isInEditMode = signal<boolean>(false);

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

  onEditRowBtnClick(row: any) {
    this._rowKeyId = row.Id;
    this.onEditRowClicked.emit(row);
  }

  onSaveRowBtnClick(row: any) {
    this._rowKeyId = null;
    this.onSaveRowClicked.emit(row);
  }

  onCancelEditRowBtnClick(row: any) {
    this._rowKeyId = null;
  }

  onDeleteRowBtnClick(row: any) {
    if (this._rowKeyId === row.Id) {
      this._rowKeyId = null;
    }
    this.onDeleteRowClicked.emit(row);
  }
  onInsertRowBtnClick() {
    debugger;
    let newRow: any[] = [];

    newRow = this.columns();

    this._dataSource.data.unshift(newRow);

    this._dataSource.data = [...this._dataSource.data];
    this.isInEditMode.set(true);
    this.table.renderRows();
    //this.onInsertRowClicked.emit(newRow);
  }
}
