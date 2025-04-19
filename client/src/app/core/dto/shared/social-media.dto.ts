import { Guid } from 'guid-typescript';

export class SocialMediaDto {
  Id!: Guid;
  Name!: string;
  Icon?: string;
}
