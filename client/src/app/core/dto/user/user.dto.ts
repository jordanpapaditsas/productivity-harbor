import { Guid } from 'guid-typescript';

export class UserDto {
  Id!: Guid;
  UserName?: string;
  PasswordHash?: string;
  Email?: string;
  FullName?: string;
  Avatar?: string;
  Token?: string;
  IsActive?: boolean;
  IsDeleted?: boolean;
  CreatedAt: Date | string | number = new Date();
  CreatedByUserId?: Guid;
  UpdatedAt?: Date | string | number;
  UpdatedByUserId?: Guid;
}
