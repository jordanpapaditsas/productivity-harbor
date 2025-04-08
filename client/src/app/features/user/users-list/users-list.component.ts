import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { UserDto } from '../../../core/dto/user/user.dto';
import { MatTableModule } from '@angular/material/table';
import { UserService } from '../user.service';
import { PhDataGridComponent } from '../../../shared/components/ph-data-grid/ph-data-grid.component';
import { Column } from '../../../core/types/column';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  imports: [MatTableModule, PhDataGridComponent],
})
export class UsersListComponent implements OnInit {
  @ViewChild('usersGrid') usersGrid!: PhDataGridComponent;
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
      .getAllUsersDataSource()
      .subscribe((response: Array<UserDto>) => {
        this.usersDataSource = response;
      });
  }

  onInsertRowClicked(user: UserDto) {
    debugger;
    if (user) {
      this.user = new UserDto();
    }
  }
  onSaveRowClicked(user: UserDto) {
    if (user) {
      this.usersService.insertUser(user).subscribe((response: UserDto) => {
        this.user = response;

        this.getUsersDataSource();
      });
    }
  }
  onEditRowClicked(user: UserDto) {}

  async onDeleteRowClicked(row: UserDto) {
    debugger;
    let result = await confirm(
      `Are you sure you want to delete user ${row.UserName}?`
    );

    if (result) {
      this.usersService.deleteById(row.Id).subscribe((response) => {
        this.getUsersDataSource();
      });
    }
  }
  onInitNewRowClicked(e: any) {}
}
