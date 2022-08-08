import * as React from "react"
import { DataGrid } from "@material-ui/data-grid"

export default function DataTable(props) {
  return (
    <div style={{ width: `${props.tableWidth}` }}>
      <DataGrid
        rows={props.rows}
        rowHeight={props.rowHeight}
        columns={props.columns}
        autoHeight={true}
        pageSize={props.pageSize}
        checkboxSelection={props.checkboxSelection}
        onRowClick={(e) => props.handleRowClick(e)}
        onRowSelected={(e) => props.handleRowSelected(e)}
        paginationMode={props.paginationMode}
      />
    </div>
  )
}
