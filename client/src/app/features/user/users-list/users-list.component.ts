import { Component, inject, OnInit } from '@angular/core';
import { UserDto } from '../../../core/dto/user/user.dto';
import { MatTableModule } from '@angular/material/table';
import { UserService } from '../user.service';
import { PhDataGridComponent } from '../../../shared/components/ph-data-grid/ph-data-grid.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  imports: [MatTableModule, PhDataGridComponent],
})
export class UsersListComponent implements OnInit {
  usersDataSource: Array<any> = [];
  columns: Array<any> = [];
  usersLookupDataSource: any[] = [];
  private usersService = inject(UserService);
  displayedColumns: Array<string> = [];

  ngOnInit() {
    this.getUsersDataSource();

    this.initializeColumns();
  }

  initializeColumns() {
    debugger;
    this.columns = [
      {
        dataField: 'Id',
        dataType: 'string',
        label: 'Id',
        visible: false,
      },
      {
        dataField: 'UserName',
        dataType: 'string',
        label: 'Username',
        visible: true,
      },
      {
        dataField: 'IsActive',
        dataType: 'boolean',
        label: 'Active',
        visible: true,
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
}
