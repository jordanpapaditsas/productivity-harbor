import { Guid } from 'guid-typescript';

export interface ChangePasswordDto {
  userId: Guid;
  currentPassword: string;
  newPassword: string;
}
