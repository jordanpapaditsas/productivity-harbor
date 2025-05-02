import { UserDto } from '../user/user.dto';

export class ChangePasswordDto {
  User!: UserDto;
  currentPassword!: string;
  newPassword!: string;
}
