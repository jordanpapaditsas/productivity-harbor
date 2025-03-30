import { Guid } from 'guid-typescript';

export class UserDto {
  Id: Guid = Guid.createEmpty();
  FullName: string = '';
  Avatar: string = '';
  CreatedAt: Date | string | number = new Date();
  CreatedBy: Guid = Guid.createEmpty();
  UpdatedAt: Date | string | number = new Date();
  UpdatedBy: Guid = Guid.createEmpty();
  Token: string = '';
}
