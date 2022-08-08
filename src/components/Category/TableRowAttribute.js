import {
  TextField,
  Checkbox,
  Select,
  MenuItem,
  TableRow,
  TableCell,
} from "@material-ui/core"
import React, { useState } from "react"

const TableRowAttribute = (props) => {
  const [isMandatory, setisMandatory] = useState(false)
  const [name, setname] = useState("")
  const [type, settype] = useState(1)
  const [values, setvalues] = useState()
  const [functionCalled, setfunctionCalled] = useState(false)

  const handleOnChange = (key, event) => {
    if (key === 1) {
      setisMandatory(event.target.checked)
    } else if (key === 2) {
      setname(event.target.value)
    } else if (key === 3) {
      settype(event.target.value)
    } else {
      setvalues(event.target.value)
    }

    if (functionCalled === false) {
      const attribute = {
        rowId: props.rowId,
        isMandatory: true,
        name,
        type,
        values,
      }
      props.setFieldValue("attributes", [...props.attributes, attribute])
      setfunctionCalled(true)
    } else {
      props.attributes.forEach((element) => {
        if (element.rowId === props.rowId) {
          if (key === 1) {
            element.isMandatory = event.target.checked
          } else if (key === 2) {
            element.name = event.target.value
          } else if (key === 3) {
            element.type = event.target.value
          } else {
            element.values = event.target.value
          }
        }
      })
    }
  }

  return (
    <TableRow>
      <TableCell align="center">
        {" "}
        <Checkbox
          checked={isMandatory}
          name="checkedB"
          color="primary"
          onChange={(e) => handleOnChange(1, e)}
        />
      </TableCell>
      <TableCell align="center">
        <TextField
          variant="outlined"
          color="primary"
          size="small"
          onChange={(event) => handleOnChange(2, event)}
        />
      </TableCell>
      <TableCell align="center">
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={type}
          label="Age"
          variant="outlined"
          onChange={(event) => handleOnChange(3, event)}>
          <MenuItem value={1}>Text</MenuItem>
          <MenuItem value={2}>Number</MenuItem>
          <MenuItem value={3}>Dropdown</MenuItem>
          <MenuItem value={4}>Checkbox</MenuItem>
        </Select>
      </TableCell>
      <TableCell align="center">
        <TextField
          variant="outlined"
          id="outlined-multiline-static"
          color="primary"
          size="small"
          onChange={(event) => handleOnChange(4, event)}
        />
      </TableCell>
    </TableRow>
  )
}

export default TableRowAttribute
