import { Guid } from 'guid-typescript';

export class ModuleDto {
  Id!: Guid;
  ParentId?: Guid;
  Key: string = '';
  Label: string = '';
  Icon: string = '';
  Route: string = '';
  SortOrder?: number;
  IsVisible: boolean = false;
  SubModules?: ModuleDto[];
}
