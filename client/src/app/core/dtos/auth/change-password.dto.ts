import { Guid } from 'guid-typescript';

export class ChangePasswordDto {
  UserId!: Guid;
  CurrentPassword!: string;
  NewPassword!: string;
}
