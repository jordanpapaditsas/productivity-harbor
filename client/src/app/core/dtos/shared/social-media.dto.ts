import { Guid } from 'guid-typescript';

export interface SocialMediaDto {
  id: Guid;
  name: string;
  icon?: string;
}
