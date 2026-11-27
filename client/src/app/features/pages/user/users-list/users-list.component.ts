import {
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { UserDto } from '../../../../core/dtos/user/user.dto';
import { UserService } from '../user.service';
import { PhDataGridComponent } from '../../../../shared/components/ph-data-grid/ph-data-grid.component';
import { Column } from '../../../../core/dtos/shared/column';
import { PhContainerComponent } from '../../../../shared/components/ph-container/ph-container.component';
import { PhToolbarComponent } from '../../../../shared/components/ph-toolbar/ph-toolbar.component';
import { PhPopupComponent } from '../../../../shared/components/ph-popup/ph-popup.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatTableModule,
    PhDataGridComponent,
    PhContainerComponent,
    PhToolbarComponent,
    PhPopupComponent,
    UserEditComponent,
  ],
})
export class UsersListComponent implements OnInit {
  @ViewChild('usersGrid') usersGrid!: PhDataGridComponent;
  title = signal<string>('Users');
  usersDataSource: any;
  user: UserDto = {
    id: Guid.createEmpty(),
    createdAt: '',
  };
  columns: Array<Column> = [];
  usersLookupDataSource: any[] = [];
  private usersService = inject(UserService);
  isUserEditPopupVisible = signal<boolean>(false);
  userId = signal<Guid | null | undefined>(undefined);

  ngOnInit() {
    this.getUsersDataSource();
  }

  initializeColumns() {
    this.columns = [
      {
        dataField: 'id',
        dataType: 'string',
        label: 'Id',
        visible: true,
        allowEditing: false,
      },
      {
        dataField: 'userName',
        dataType: 'string',
        label: 'Username',
        visible: true,
        allowEditing: true,
        cellTemplate: (row: any, options: any) => {
          options.cell.innerHTML = '';
          const anchor = document.createElement('a');
          anchor.textContent = row.userName;
          anchor.classList.add('link-name-navigation');
          anchor.addEventListener('click', () => {
            this.onUserIdClick(row);
          });

          options.cell.append(anchor);
        },
      },
      {
        dataField: 'isActive',
        dataType: 'boolean',
        label: 'Active',
        visible: true,
        allowEditing: true,
      },
      {
        dataField: 'createdAt',
        dataType: 'datetime',
        label: 'CreatedAt',
        visible: true,
        allowEditing: true,
      },
    ];
  }

  onUserIdClick(data: any) {
    this.userId.set(data.id);
    this.isUserEditPopupVisible.set(true);
  }

  getUsersDataSource() {
    this.usersService.getAll().subscribe((response: Array<UserDto>) => {
      this.usersDataSource = response;

      this.initializeColumns();
    });
  }
  onCreateNewUser(e: any) {
    this.userId.set(undefined);
    this.isUserEditPopupVisible.set(true);
  }

  onSaveRowClicked(user: UserDto) {
    if (!user.id) {
      this.usersService.create(user).subscribe((response: UserDto) => {
        this.user = response;

        this.getUsersDataSource();
      });
    } else if (user.id) {
      this.usersService.update(user).subscribe((response: UserDto) => {
        this.user = response;

        this.getUsersDataSource();
      });
    }
  }
  onEditRowClicked(user: UserDto) {}

  onDeleteRowClicked(user: UserDto) {
    if (user) {
      this.usersService.deleteById(user.id).subscribe({
        next: (response) => {
          this.getUsersDataSource();
        },
        error: (error) => {},
      });
    }
  }

  onUserEditExitClicked(e: any) {
    this.isUserEditPopupVisible.set(false);
    this.getUsersDataSource();
  }

  onRefreshClicked(e: any) {
    this.getUsersDataSource();
  }
}
