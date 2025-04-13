import { Guid } from 'guid-typescript';

export class SocialMedia {
  Id!: Guid;
  Url!: string;
  Name?: string;
  Icon?: string;
}
