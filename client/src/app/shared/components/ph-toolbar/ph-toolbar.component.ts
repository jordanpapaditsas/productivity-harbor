import {
  Component,
  inject,
  input,
  Input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarItem } from '../../../core/interfaces/toolbar-item';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PhDialogService } from '../../services/ph-dialog.service';
import { DialogTypeEnum } from '../../../core/enums/dialog/dialog-type.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ph-toolbar',
  templateUrl: './ph-toolbar.component.html',
  styleUrls: ['./ph-toolbar.component.css'],
  imports: [MatToolbarModule, MatIconModule, MatTooltipModule, CommonModule],
})
export class PhToolbarComponent implements OnInit {
  toolbarItems!: Array<ToolbarItem>;
  toolbarTitle = input<string>('');
  canExit = input<boolean>(false);
  canEdit = input<boolean>(false);
  canSave = input<boolean>(false);
  canDelete = input<boolean>(false);
  isCalledFromEditScreen = input<boolean>(false);

  onExit = output<any>();
  onEdit = output<any>();
  onSave = output<any>();
  onDelete = output<any>();
  private dialogService = inject(PhDialogService);

  constructor() {}

  ngOnInit() {
    this.toolbarItems = [
      {
        id: 4,
        label: 'Exit',
        icon: 'exit_to_app',
        visible: this.canExit?.() ?? false,
        onItemClick: (e: MouseEvent) => {
          this.onExit?.emit(e);
        },
      },
      {
        id: 2,
        label: 'Edit',
        icon: 'edit',
        visible: this.canEdit?.() ?? false,
        onItemClick: (e: MouseEvent) => {
          this.onEdit?.emit(e);
        },
      },
      {
        id: 3,
        label: 'Save',
        icon: 'save',
        visible: this.canSave?.() ?? false,
        onItemClick: (e: MouseEvent) => {
          this.dialogService.confirmDialog(
            'Message',
            'Save changes?',
            DialogTypeEnum.Passive
          );
          this.onSave?.emit(e);
        },
      },
      {
        id: 1,
        label: 'Delete',
        icon: 'delete',
        visible: this.canDelete?.() ?? false,
        onItemClick: (e: MouseEvent) => {
          this.dialogService.confirmDialog(
            'Warning Message',
            'Proceed to delete?',
            DialogTypeEnum.Danger
          );
          this.onDelete?.emit(e);
        },
      },
    ];

    this.toolbarItems.sort((a, b) => a.id - b.id);
  }
}
