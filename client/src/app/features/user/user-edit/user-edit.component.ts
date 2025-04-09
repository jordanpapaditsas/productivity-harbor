import { Component, Input, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  private _userId!: Guid;

  public get userId(): Guid {
    return this._userId;
  }

  @Input()
  public set userId(value: Guid) {
    debugger;
    this._userId = value;
  }

  constructor() {}

  ngOnInit() {}
}
