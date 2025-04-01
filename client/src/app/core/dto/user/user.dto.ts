import { Guid } from 'guid-typescript';

export class UserDto {
  Id: Guid = Guid.createEmpty();
  UserName?: string;
  PasswordHash?: string;
  Email?: string;
  FullName?: string;
  Avatar?: string;
  Token?: string;
  IsActive?: boolean;
  IsDeleted?: boolean;
  CreatedAt: Date | string | number = new Date();
  CreatedById?: Guid;
  UpdatedAt?: Date | string | number;
  UpdatedById?: Guid;
}
