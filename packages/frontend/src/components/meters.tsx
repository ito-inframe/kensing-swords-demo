import { List, Datagrid, TextField, ImageField } from "react-admin";
//import { EditableDatagrid, RowForm } from '@react-admin/ra-editable-datagrid'

export const MeterList = () => (
  <List>
    <Datagrid rowClick="edit">
    {/* <EditableDatagrid editForm={<MeterItemForm/>}> */}
      <TextField label="メーター番号" source="installationMeterNo" />
      <TextField label="種別" source="typeName" />
      <TextField label="当月指針" source="presentMonthValue" />
      <ImageField label="確認画像" source="attachments[0]"  />
    </Datagrid>
  </List>
);