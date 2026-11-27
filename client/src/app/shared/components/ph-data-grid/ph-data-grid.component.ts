import { CommonModule, DatePipe } from '@angular/common';
import {
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
  ChangeDetectionStrategy,
  effect,
  viewChild,
  afterRenderEffect,
  computed,
  AfterViewInit,
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
import { Column } from '../../../core/dtos/shared/column';
import { PhSelectBoxComponent } from '../ph-select-box/ph-select-box.component';
import { PhTextBoxComponent } from '../ph-text-box/ph-text-box.component';

@Component({
  selector: 'ph-data-grid',
  templateUrl: './ph-data-grid.component.html',
  styleUrls: ['./ph-data-grid.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
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
    PhSelectBoxComponent,
    PhTextBoxComponent,
  ],
})
export class PhDataGridComponent implements AfterViewInit {
  paginator = viewChild<MatPaginator>(MatPaginator);
  table = viewChild<MatTable<any>>(MatTable);
  @ViewChildren('cellTemplateContainer')
  cellTemplateContainer!: QueryList<ElementRef>;

  private dialogService = inject(PhDialogService);

  dataSource = input<any[] | MatTableDataSource<any>>([]);

  tableDataSource = computed(() => {
    const incomingData = this.dataSource();
    const paginatorRef = this.paginator();

    const dataSource =
      incomingData instanceof MatTableDataSource
        ? incomingData
        : new MatTableDataSource<any>(incomingData ?? []);

    if (paginatorRef) {
      dataSource.paginator = paginatorRef;
    }

    return dataSource;
  });

  constructor() {
    afterRenderEffect(() => {
      this.tableDataSource();
      this.columns();
      this.renderCustomTemplate();
    });
  }

  columns = input<Column[]>([]);
  canInsertRow = input<boolean>(false);
  canCreate = input<boolean>(false);
  canEdit = input<boolean>(false);
  canDelete = input<boolean>(false);
  canRefresh = input<boolean>(false);

  // OUTPUTS
  savingRow = output<any>();
  savedRow = output<any>();
  editRow = output<any>();
  deleteRow = output<any>();
  insertRow = output<any>();
  create = output();
  refresh = output<any>();

  private _tempRowValues: Record<string, any> = {};
  rowIndex = signal<number | null>(null);
  rowKeys: Set<Guid> = new Set();
  isNewRow = signal<boolean>(false);
  isRowInViewMode = signal<boolean>(true);

  ngAfterViewInit() {
    const paginatorRef = this.paginator();
    if (paginatorRef) {
      this.tableDataSource().paginator = paginatorRef;
    }
  }

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
    rowIndex: number,
  ) {
    if (this.isRowInEditMode(row, rowIndex)) {
      return;
    }

    if (column.cellTemplate) {
      column.cellTemplate(row, { column, cell: cellElement });
    }
  }

  renderCustomTemplate() {
    const rows = this.tableDataSource().data;
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
      row.id === null ||
      (row.id === undefined && this.rowIndex() === index)
    ) {
      return true;
    } else if (this.rowKeys.has(row.id) && this.rowIndex() === index) {
      return true;
    } else {
      return false;
    }
  }

  protected onEditRowBtnClick(row: any, index: number) {
    if (!this._tempRowValues[row.id]) {
      this._tempRowValues[row.id] = { ...row };
    }

    this.rowIndex.set(index);
    this.isRowInViewMode.set(false);

    this.rowKeys.add(row.id);

    this.editRow.emit(row);
  }

  protected onSaveRowBtnClick(row: any) {
    if (!Object.keys(row).length) {
      this.dialogService.alertDialog(
        'Warning Message',
        'Row is empty!',
        DialogTypeEnum.Warning,
      );
      return;
    } else {
      this.rowIndex.set(null);
      this.isRowInViewMode.set(true);
      this.isNewRow.set(false);
      if (row.id) {
        this.rowKeys.delete(row.id);
      }

      this.savedRow.emit(row);
      // this.toastr.success('Record has been saved successfully.');
      // ADD MATERIALS SNACKBAR

      this.refreshDataSource();
      this.cleanTempRowValues(row);
    }
  }

  protected onCancelEditRowBtnClick(row: any, index: number) {
    const ds = this.tableDataSource();

    if (!row.id) {
      ds.data = ds.data.slice(1);
    }
    if (this._tempRowValues[row.id]) {
      Object.assign(row, this._tempRowValues[row.id]);
    }

    this.rowIndex.set(null);
    this.isRowInViewMode.set(true);
    this.isNewRow.set(false);
    if (row.id) {
      this.rowKeys.delete(row.id);
    }

    this.refreshDataSource();
    this.cleanTempRowValues(row);
  }

  protected onInsertRowBtnClick() {
    if (!this.isNewRow()) {
      const newRow: Record<string, any> = {};
      this.isRowInViewMode.set(false);
      this.isNewRow.set(true);
      this.rowIndex.set(0);

      const ds = this.tableDataSource();
      ds.data = [newRow, ...ds.data];
      this.insertRow.emit(newRow);
      this.refreshDataSource();
    }
  }

  public refreshDataSource() {
    const ds = this.tableDataSource();
    if (ds?.data) {
      ds.data = [...ds.data];
      this.table()?.renderRows();
      this.refresh.emit(ds.data);
    }
  }

  protected async onDeleteRowBtnClick(row: any) {
    let result = await this.dialogService.confirmDialog(
      'Warning Message',
      'Are you sure you want to delete this record?',
      DialogTypeEnum.Danger,
    );
    if (result) {
      this.deleteRow.emit(row);
      // this.toastr.success('Record has been deleted successfully');
      // ADD MATERIALS SNACKBAR
    } else {
      return;
    }
    this.refreshDataSource();
  }

  protected onCreate() {
    this.create.emit();
  }

  private cleanTempRowValues(row: any) {
    if (row && this._tempRowValues) {
      delete this._tempRowValues[row.id];
    }
  }
}
