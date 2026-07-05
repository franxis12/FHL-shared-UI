# DataTable

Use `DataTable` to render reusable table layouts where columns are defined at render time.

Exports:

- `DataTable`

Common props:

- `columns`
- `rows`
- `rowKey`
- `selectedRowKey`
- `onRowClick`
- `emptyMessage`

Column options:

- `key`
- `label`
- `accessor`
- `render`
- `align`
- `width`
- `emphasize`

Example:

```jsx
import { DataTable } from "@franxis12/fhl-shared-ui";

const columns = [
  { key: "name", label: "Name", accessor: "name", emphasize: true },
  { key: "rent", label: "Rent", accessor: "rent", align: "right" },
];

<DataTable
  columns={columns}
  rows={rows}
  selectedRowKey={selectedLeaseId}
  onRowClick={(row) => setSelectedLeaseId(row.id)}
/>;
```
