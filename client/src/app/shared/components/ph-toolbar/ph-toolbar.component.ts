import { Component, inject, input, OnInit, output } from '@angular/core';
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
  styleUrls: ['./ph-toolbar.component.scss'],
  imports: [MatToolbarModule, MatIconModule, MatTooltipModule, CommonModule],
})
export class PhToolbarComponent implements OnInit {
  toolbarItems!: Array<ToolbarItem>;
  title = input<string>('');
  canExit = input<boolean>(false);
  canEdit = input<boolean>(false);
  canSave = input<boolean>(false);
  canDelete = input<boolean>(false);
  canDeactivate = input<boolean>(false);
  canView = input<boolean>(false);
  isCalledFromEditScreen = input<boolean>(false);

  exit = output<MouseEvent>();
  edit = output<MouseEvent>();
  save = output<MouseEvent>();
  delete = output<MouseEvent>();
  deactivate = output<MouseEvent>();
  private dialogService = inject(PhDialogService);

  constructor() {}

  ngOnInit() {
    this.toolbarItems = [
      {
        id: 1,
        label: 'Edit',
        icon: 'edit',
        position: 'before',
        visible: this.canEdit?.() ?? false,
        onItemClick: (e: MouseEvent) => {
          this.refreshToolbarItems();
          this.edit?.emit(e);
        },
      },
      {
        id: 0,
        label: 'View',
        icon: 'remove_red_eye',
        position: 'before',
        visible:
          (this.isCalledFromEditScreen() &&
            this.canView() &&
            !this.canEdit()) ??
          false,
        // false ||
        // (!this.canEdit?.() &&
        //   this.isCalledFromEditScreen() &&
        //   this.canView()),
        onItemClick: (e: MouseEvent) => {
          this.refreshToolbarItems();
          this.edit?.emit(e);
        },
      },
      {
        id: 2,
        label: 'Deactivate',
        icon: 'power_off',
        position: 'before',
        visible: this.canDeactivate?.() ?? false,
        onItemClick: async (e: MouseEvent) => {
          let result = await this.dialogService.confirmDialog(
            'Confirm Deactivation',
            'Are you sure you want to deactivate this item? This action can be reversed?',
            DialogTypeEnum.Warning
          );
          if (result) {
            this.deactivate?.emit(e);
          } else {
            return;
          }
        },
      },
      {
        id: 3,
        label: 'Delete',
        icon: 'delete',
        position: 'after',
        visible: this.canDelete?.() ?? false,
        onItemClick: async (e: MouseEvent) => {
          let result = await this.dialogService.confirmDialog(
            'Confirm Deletion',
            'Are you sure you want to permanently delete this item? This action cannot be undone.',
            DialogTypeEnum.Danger
          );
          if (result) {
            this.delete?.emit(e);
          } else {
            return;
          }
        },
      },
      {
        id: 4,
        label: 'Save',
        icon: 'save',
        position: 'after',
        visible: this.canSave?.() ?? false,
        onItemClick: async (e: MouseEvent) => {
          let result = await this.dialogService.confirmDialog(
            'Confirm Save',
            'Do you want to save the changes?',
            DialogTypeEnum.Passive
          );
          if (result) {
            this.save?.emit(e);
          } else {
            return;
          }
        },
      },
      {
        id: 5,
        label: 'Exit',
        icon: 'exit_to_app',
        position: 'after',
        visible: this.canExit?.() ?? false,
        onItemClick: (e: MouseEvent) => {
          this.exit?.emit(e);
        },
      },
    ];

    this.toolbarItems.sort((a, b) => a.id - b.id);
  }

  refreshToolbarItems() {
    this.toolbarItems.forEach((item) => {
      if (item.label === 'Edit') {
        item.visible = !item.visible;
      }
      if (item.label === 'View') {
        item.visible = !item.visible;
      }
    });
  }
}
