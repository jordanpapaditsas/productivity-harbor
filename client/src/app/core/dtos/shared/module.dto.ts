import { Guid } from 'guid-typescript';

export class ModuleDto {
  Id!: Guid;
  Key: string = '';
  Label: string = '';
  Icon: string = '';
  Route: string = '';
  SubModules?: ModuleDto[];
}
