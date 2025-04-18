import { Guid } from 'guid-typescript';

export class SocialMedia {
  Id!: Guid | undefined;
  Url!: string;
  Name!: string;
  Icon?: string;
}
