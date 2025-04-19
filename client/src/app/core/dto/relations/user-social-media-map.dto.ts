import { Guid } from 'guid-typescript';

export class UserSocialMediaMapDto {
  Id?: Guid;
  UserId?: Guid;
  SocialMediaId?: Guid;
  Url?: string;
  Name?: string;
  Icon?: string;
}
