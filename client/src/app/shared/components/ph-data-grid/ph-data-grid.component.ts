import { CommonModule, DatePipe } from '@angular/common';
import {
  Component,
  inject,
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
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { A11yModule } from '@angular/cdk/a11y';
import { Column } from '../../../core/types/column';
import { Guid } from 'guid-typescript';
import { PhDialogService } from '../../services/ph-dialog.service';

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
  private dialogService = inject(PhDialogService);

  public get dataSource() {
    return this._dataSource;
  }

  // INPUTS
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

  columns = input<Column[]>([]);
  canInsert = input<boolean>(false);
  canEdit = input<boolean>(false);
  canDelete = input<boolean>(false);

  // OUTPUTS
  onSavingRow = output<any>();
  onSavedRow = output<any>();
  onEditRow = output<any>();
  onDeleteRow = output<any>();
  onInsertRow = output<any>();
  onInitNewRow = output<any>();

  private _tempRowValues: Record<string, any> = {};
  private _dataSource!: any;
  rowIndex = signal<number | null>(null);
  rowKeys: Set<Guid> = new Set();
  isNewRow = signal<boolean>(false);
  isRowInViewMode = signal<boolean>(true);

  constructor() {}

  ngOnInit() {}

  protected getVisibleColumns() {
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

  protected getRowData(rowData: any) {
    return rowData;
  }

  protected getColumnData(columnData: any) {
    return columnData;
  }

  protected isRowInEditMode(row: any, index: number) {
    if (
      row.Id === null ||
      (row.Id === undefined && this.rowIndex() === index)
    ) {
      return true;
    } else if (this.rowKeys.has(row.Id) && this.rowIndex() === index) {
      return true;
    } else {
      return false;
    }
  }

  protected onEditRowBtnClick(row: any, index: number) {
    if (!this._tempRowValues[row.Id]) {
      this._tempRowValues[row.Id] = { ...row };
    }

    this.rowIndex.set(index);
    this.isRowInViewMode.set(false);

    this.rowKeys.add(row.Id);

    this.onEditRow.emit(row);
  }

  protected onSaveRowBtnClick(row: any) {
    if (!Object.keys(row).length) {
      alert('Row is empty!');
      return;
    } else {
      this.rowIndex.set(null);
      this.isRowInViewMode.set(true);
      if (row.Id) {
        this.rowKeys.delete(row.Id);
      }

      this.onSavedRow.emit(row);
      this.refreshDataSource();
      this.cleanTempRowValues(row);
    }
  }

  protected onCancelEditRowBtnClick(row: any, index: number) {
    if (!row.Id) {
      this.dataSource.data.shift();
    }
    if (this._tempRowValues[row.Id]) {
      Object.assign(row, this._tempRowValues[row.Id]);
    }

    this.rowIndex.set(null);
    this.isRowInViewMode.set(true);
    this.isNewRow.set(false);
    if (row.Id) {
      this.rowKeys.delete(row.Id);
    }

    this.refreshDataSource();
    this.cleanTempRowValues(row);
  }

  protected async onDeleteRowBtnClick(row: any) {
    let confirmation = await this.dialogService.confirmDialog(
      'Warning Message',
      'Are you sure you want to delete this row?'
    );
    if (confirmation) {
      this.onDeleteRow.emit(row);
    } else {
      return;
    }
    this.refreshDataSource();
  }

  protected onInsertRowBtnClick() {
    if (!this.isNewRow()) {
      const newRow: Record<string, any> = {};
      this.onInitNewRow.emit(newRow);
      this.isRowInViewMode.set(false);
      this.isNewRow.set(true);
      this.rowIndex.set(0);

      this._dataSource.data.unshift(newRow);

      this.refreshDataSource();
      this.onInsertRow.emit(newRow);
    } else {
      return;
    }
  }

  public refreshDataSource() {
    if (this.dataSource && this._dataSource.data) {
      this._dataSource.data = [...this.dataSource.data];
    }
  }

  private cleanTempRowValues(row: any) {
    if (row && this._tempRowValues) {
      delete this._tempRowValues[row.Id];
    }
  }
}
