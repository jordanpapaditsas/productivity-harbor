import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { Component, Input, input, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ph-data-grid',
  templateUrl: './ph-data-grid.component.html',
  styleUrls: ['./ph-data-grid.component.css'],
  imports: [MatTableModule, CommonModule, MatCheckboxModule, FormsModule],
})
export class PhDataGridComponent implements OnInit {
  dataSource = input<CdkTableDataSourceInput<any[]>>([]);
  @Input() columns: Array<{
    dataField: string;
    dataType: string;
    label: string;
    visible: boolean;
  }> = [];

  constructor() {}

  ngOnInit() {}

  getVisibleColumns() {
    return this.columns.filter((x) => x.visible === true).map((x) => x.label);
  }

  getRowData(rowData: any) {
    return rowData;
  }

  getCellData(columnData: any) {
    return columnData;
  }
}
