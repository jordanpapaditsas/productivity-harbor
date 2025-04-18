import { Guid } from 'guid-typescript';

export class SocialMediaDto {
  Id!: Guid | undefined;
  Url!: string;
  Name!: string;
  Icon?: string;
}
