import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { UserDto } from '../../../core/dto/user/user.dto';
import { UserService } from '../user.service';
import { PhDataGridComponent } from '../../../shared/components/ph-data-grid/ph-data-grid.component';
import { Column } from '../../../core/interfaces/column';
import { PhContainerComponent } from '../../../shared/components/ph-container/ph-container.component';
import { PhTextBoxComponent } from '../../../shared/components/ph-text-box/ph-text-box.component';
import { PhToolbarComponent } from '../../../shared/components/ph-toolbar/ph-toolbar.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  imports: [
    MatTableModule,
    PhDataGridComponent,
    CommonModule,
    PhContainerComponent,
    PhToolbarComponent,
  ],
})
export class UsersListComponent implements OnInit {
  @ViewChild('usersGrid') usersGrid!: PhDataGridComponent;
  title = signal<string>('Users');
  usersDataSource: any;
  user: UserDto = new UserDto();
  columns: Array<Column> = [];
  usersLookupDataSource: any[] = [];
  private usersService = inject(UserService);

  ngOnInit() {
    this.getUsersDataSource();

    this.initializeColumns();
  }

  initializeColumns() {
    this.columns = [
      {
        dataField: 'Id',
        dataType: 'string',
        label: 'Id',
        visible: true,
        allowEditing: false,
      },
      {
        dataField: 'UserName',
        dataType: 'string',
        label: 'Username',
        visible: true,
        allowEditing: true,
      },
      {
        dataField: 'IsActive',
        dataType: 'boolean',
        label: 'Active',
        visible: true,
        allowEditing: true,
      },
      {
        dataField: 'CreatedAt',
        dataType: 'datetime',
        label: 'Created at',
        visible: true,
      },
    ];
  }

  getUsersDataSource() {
    this.usersService
      .getAllUsersData()
      .subscribe((response: Array<UserDto>) => {
        this.usersDataSource = response;
      });
  }

  onInsertRowClicked(user: UserDto) {
    if (user) {
      this.user = new UserDto();
    }
  }
  onInitNewRowClicked(e: any) {}

  onSaveRowClicked(user: UserDto) {
    if (!user.Id) {
      this.usersService.createUser(user).subscribe((response: UserDto) => {
        this.user = response;

        this.getUsersDataSource();
      });
    } else if (user.Id) {
      this.usersService.updateUser(user).subscribe((response: UserDto) => {
        this.user = response;

        this.getUsersDataSource();
      });
    }
  }
  onEditRowClicked(user: UserDto) {}

  onDeleteRowClicked(user: UserDto) {
    if (user) {
      this.usersService.deleteUserById(user.Id).subscribe((response) => {
        this.getUsersDataSource();
      });
    }
  }
}
