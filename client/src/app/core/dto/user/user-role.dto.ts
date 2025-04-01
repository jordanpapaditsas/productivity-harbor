import { Guid } from 'guid-typescript';

export class UserRoleDto {
  UserId: Guid = Guid.createEmpty();
  RoleId: Guid = Guid.createEmpty();
}
