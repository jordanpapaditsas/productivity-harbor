import {
  Component,
  computed,
  effect,
  Input,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

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
  ],
})
export class PhSelectBoxComponent implements OnInit {
  value = input<any>();
  inputText = signal<string>('');
  dataSource = input<any>(null);
  displayExpr = input<string>();
  valueExpr = input<string>();
  searchEnabled = input<boolean>();
  showClearButton = input<boolean>();
  placeholder = input<string>('');

  selectionChanged = output<any>();
  valueChanged = output<any>();

  constructor() {
    effect(() => {
      if (this.dataSource()) {
        this.dataSource().forEach((item: any) => {
          if (this.displayExpr()) {
            return item[this.displayExpr()!];
          }
        });
      }
    });
  }
  ngOnInit() {}

  onSelectionChanged(item: any) {
    this.selectionChanged.emit(item);
  }

  onValueChange() {
    if (this.valueExpr() && this.value()) {
    }
  }

  onInputTextChange(e: any) {
    this.inputText.set(e);
  }

  // private _getLookupFromItem(item: any) {
  //   if (this.displayExpr() && Object.hasOwn(item, this.displayExpr()!)) {
  //     return item[this.displayExpr()!];
  //   } else {
  //     return '';
  //   }
  // }
}
