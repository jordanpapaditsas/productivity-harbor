import { Guid } from 'guid-typescript';
import { Address } from '../../interfaces/address';
import { Phone } from '../../interfaces/phone';
import { UserSocialMediaMapDto } from '../relations/user-social-media-map.dto';

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
  Color?: string;
  UserSocialMediaLinksMap: any;
  Phone: Phone | undefined | null;
  Address: Address | undefined | null;
  Portfolio?: string;
  Country!: string;
  Birthdate!: Date | string | number;
}
