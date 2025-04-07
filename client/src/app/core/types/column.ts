export type Column = {
  dataField: string;
  dataType: string;
  label: string;
  visible: boolean;
  allowEditing?: boolean;
  lookup?: { dataSource: any; valueExpr: string; displayExpr: string };
  cellTemplate?: any;
};
