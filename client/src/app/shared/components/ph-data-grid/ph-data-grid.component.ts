import { CommonModule, DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  input,
  OnInit,
  output,
  QueryList,
  signal,
  ViewChild,
  ViewChildren,
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
import { Guid } from 'guid-typescript';
import { PhDialogService } from '../../services/ph-dialog.service';
import { DialogTypeEnum } from '../../../core/enums/dialog/dialog-type.enum';
import { Column } from '../../../core/interfaces/column';
import { ToastrService } from 'ngx-toastr';

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
  @ViewChildren('cellTemplateContainer')
  cellTemplateContainer!: QueryList<ElementRef>;

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

    setTimeout(() => {
      this.renderCustomTemplate();
    });
  }

  columns = input<Column[]>([]);
  canInsertRow = input<boolean>(false);
  canCreate = input<boolean>(false);
  canEdit = input<boolean>(false);
  canDelete = input<boolean>(false);

  // OUTPUTS
  savingRow = output<any>();
  savedRow = output<any>();
  editRow = output<any>();
  deleteRow = output<any>();
  insertRow = output<any>();
  create = output();

  private _tempRowValues: Record<string, any> = {};
  private _dataSource!: any;
  rowIndex = signal<number | null>(null);
  rowKeys: Set<Guid> = new Set();
  isNewRow = signal<boolean>(false);
  isRowInViewMode = signal<boolean>(true);

  private toastr = inject(ToastrService);

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

  protected getTableRowAndColumnData(
    row: any,
    column: Column,
    cellElement: HTMLTableCellElement,
    rowIndex: number
  ) {
    if (this.isRowInEditMode(row, rowIndex)) {
      return;
    }

    if (column.cellTemplate) {
      column.cellTemplate(row, { column, cell: cellElement });
    }
  }

  renderCustomTemplate() {
    const rows = this._dataSource.data;
    const cols = this.columns();

    const containersByPosition = new Map<string, HTMLElement>();

    this.cellTemplateContainer.forEach((ref: ElementRef) => {
      const el: HTMLElement = ref.nativeElement;
      const rowIndex = el.getAttribute('data-row');
      const colLabel = el.getAttribute('data-col');
      containersByPosition.set(`${rowIndex}-${colLabel}`, el);
    });

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const row = rows[rowIndex];

      for (let colIndex = 0; colIndex < cols.length; colIndex++) {
        const column = cols[colIndex];

        if (this.isRowInEditMode(row, rowIndex)) {
          continue;
        }

        if (column) {
          const key = `${rowIndex}-${column.label}`;
          const cellElement = containersByPosition.get(key);

          if (column.cellTemplate) {
            if (cellElement) {
              column.cellTemplate(row, { col: column, cell: cellElement });
            }
          }
        }
      }
    }
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

    this.editRow.emit(row);
  }

  protected onSaveRowBtnClick(row: any) {
    if (!Object.keys(row).length) {
      this.dialogService.alertDialog(
        'Warning Message',
        'Row is empty!',
        DialogTypeEnum.Warning
      );
      return;
    } else {
      this.rowIndex.set(null);
      this.isRowInViewMode.set(true);
      this.isNewRow.set(false);
      if (row.Id) {
        this.rowKeys.delete(row.Id);
      }

      this.savedRow.emit(row);
      this.toastr.success('Record has been saved successfully.');
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
    let result = await this.dialogService.confirmDialog(
      'Warning Message',
      'Are you sure you want to delete this record?',
      DialogTypeEnum.Danger
    );
    if (result) {
      this.deleteRow.emit(row);
      this.toastr.success('Record has been deleted successfully');
    } else {
      return;
    }
    this.refreshDataSource();
  }

  protected onInsertRowBtnClick() {
    if (!this.isNewRow()) {
      const newRow: Record<string, any> = {};
      this.isRowInViewMode.set(false);
      this.isNewRow.set(true);
      this.rowIndex.set(0);

      this._dataSource.data.unshift(newRow);
      this.insertRow.emit(newRow);
      this.refreshDataSource();
    } else {
      return;
    }
  }

  protected onCreate() {
    this.create.emit();
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
