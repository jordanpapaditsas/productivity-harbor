import { Guid } from 'guid-typescript';

export class RoleDto {
  Id: Guid = Guid.createEmpty();
  Name?: string;
}
