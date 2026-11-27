import { Guid } from 'guid-typescript';
import { Address } from '../shared/address';
import { Phone } from '../shared/phone';

export interface UserDto {
  id: Guid;
  userName?: string;
  password?: string;
  email?: string;
  fullName?: string;
  avatar?: string;
  token?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt: Date | string | number;
  createdByUserId?: Guid;
  updatedAt?: Date | string | number;
  updatedByUserId?: Guid;
  color?: string;
  userSocialMediaLinksMap?: any;
  phone?: Phone;
  address?: Address;
  portfolio?: string;
  country?: string;
  birthdate?: Date | string | number;
}
