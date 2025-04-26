import {
  Component,
  effect,
  EventEmitter,
  Input,
  input,
  OnInit,
  Output,
  output,
  signal,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ph-select-box',
  templateUrl: './ph-select-box.component.html',
  styleUrls: ['./ph-select-box.component.scss'],
  imports: [
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
    CommonModule,
  ],
})
export class PhSelectBoxComponent implements OnInit {
  value = input.required<any>();
  _value: any;
  selectedValue: any;
  dataSource = input<any>(null);
  filteredDataSource = signal<any>(null);
  displayExpr = input<string>();
  valueExpr = input<string>();
  searchEnabled = input<boolean>();
  showClearButton = input<boolean>();
  placeholder = input<string>('');
  disabled = input<boolean>(false);
  @Input() customCssClass!: string;

  selectionChanged = output<any>();
  valueChange = output<any>();

  constructor() {
    effect(() => {
      if (this.dataSource()) {
        this._value = this.value();
        this.filteredDataSource.set(this.dataSource());
        this.dataSource().forEach((item: any) => {
          if (this.displayExpr()) {
            return item[this.displayExpr()!];
          }
        });
      }
      if (!this.searchEnabled() && this.dataSource()) {
        this.filteredDataSource.set(this.dataSource());
        this.selectedValue = this.dataSource().find(
          (item: any) => this._value === item[this.valueExpr()!]
        );

        if (this.selectedValue) {
          return this.selectedValue;
        }
      }
    });
  }
  ngOnInit() {}

  onSelectionChanged(item: any) {
    this.selectionChanged.emit(item);
  }

  onInputValueChange(inputVal: any) {
    let searchVal = inputVal.toLowerCase();

    const filteredData = this.dataSource().filter((item: any) =>
      item[this.displayExpr()!].toLowerCase().includes(searchVal)
    );

    this.filteredDataSource.set(filteredData);
  }

  displayFn(value: any) {
    if (!value || !this.dataSource()) {
      return '';
    } else {
      let selectedItem = this.dataSource().find(
        (item: any) => item[this.valueExpr()!] === value
      );

      if (!selectedItem) {
        return '';
      } else {
        this.valueChange.emit(selectedItem[this.valueExpr()!]);
        return selectedItem[this.displayExpr()!];
      }
    }
  }

  onClearButtonClick() {
    this._value = null;
    if (!this.filteredDataSource()) {
      this.filteredDataSource.set(this.dataSource());
    }
  }

  populateDataSource() {
    this.filteredDataSource.set(this.dataSource());
  }
}
