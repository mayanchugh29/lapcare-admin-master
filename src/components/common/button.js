import Button from "@material-ui/core/Button"
import React from "react"

const ButtonComponent = (props) => {
  return (
    <Button
      variant="contained"
      onClick={props.handleSubmit}
      disableElevation
      style={{
        marginLeft: `${props.marginLeft}`,
        padding: `${props.padding}`,
        position: `${props.position}`,
        left: `${props.left}`,
        fontWeight: `${props.fontWeight}`,
        backgroundColor: `${props.color}`,
        color: `${props.textColor}`,
      }}>
      {props.buttonContent}
    </Button>
  )
}

export default ButtonComponent
