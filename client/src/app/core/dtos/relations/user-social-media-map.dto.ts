import { Guid } from 'guid-typescript';

export interface UserSocialMediaMapDto {
  id: Guid;
  userId: Guid;
  socialMediaId?: Guid;
  url?: string;
  name?: string;
  icon?: string;
}
