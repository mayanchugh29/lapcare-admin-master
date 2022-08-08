import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import NewNoteModal from "./NewNoteModal"
import AddIcon from "@material-ui/icons/Add"

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "1rem",
  },
  title: {
    fontSize: 14,
    marginBottom: 12,
  },
  pos: {
    marginBottom: 12,
  },
  textfield: {
    marginTop: 14,
    marginBottom: 14,
  },
  cardTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
})

const Notes = (props) => {
  const classes = useStyles()
  const [openNewNoteModal, setOpenNewNoteModal] = useState(false)

  const openNewNoteModalHandler = () => {
    setOpenNewNoteModal(true)
  }

  const closeNewNoteModalHandler = () => {
    setOpenNewNoteModal(false)
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.cardTitle}>
          <Typography variant="h6">Notes</Typography>
          <AddIcon
            onClick={openNewNoteModalHandler}
            style={{ cursor: "pointer" }}
          />
        </div>
        <NewNoteModal
          open={openNewNoteModal}
          onClose={closeNewNoteModalHandler}
          orderId={props.orderId}
        />
      </CardContent>
    </Card>
  )
}

export default Notes
