export interface Column {
  index?: number;
  dataField: string;
  dataType: string;
  label: string;
  visible: boolean;
  allowEditing?: boolean;
  format?: string;
  lookup?: { dataSource: any; valueExpr: string; displayExpr: string };
  cellTemplate?: (row: any, options: any) => void;
}
