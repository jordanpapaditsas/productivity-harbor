import { Component, inject, OnInit } from '@angular/core';
import { UserDto } from '../../../core/dto/user/user.dto';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../user.service';
import { PhDataGridComponent } from '../../../shared/components/ph-data-grid/ph-data-grid.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  imports: [MatTableModule, PhDataGridComponent],
})
export class UsersListComponent implements OnInit {
  usersDataSource: any;
  columns: Array<any> = [];
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
        allowEditing: true,
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
        visible: false,
      },
      {
        dataField: 'CreatedAt',
        dataType: 'datetime',
        label: 'Created at',
        visible: false,
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

  onSaveRowClicked(e: any) {}
  onEditRowClicked(e: any) {}
  async onDeleteRowClicked(row: UserDto) {
    let result = await confirm(
      `Are you sure you want to delete user ${row.FullName}?`
    );

    if (result) {
      this.usersService.deleteById(row.Id).subscribe((response) => {
        this.getUsersDataSource();
      });
    }
  }
}
