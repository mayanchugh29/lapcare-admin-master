import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import FaqTextField from "./FaqTextField"

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "1rem",
  },
  title: {
    fontSize: 14,
    marginBottom: 12,
  },
  textfield: {
    width: "50%",
  },
  faqSectionContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 14,
    marginBottom: 14,
    gap: "20px",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "14px 0",
  },
})

const Faqs = (props) => {
  const classes = useStyles()
  const [options, setOptions] = useState(
    props.edit && props.value.length !== 0 ? [] : [1]
  )
  const [count, setcount] = useState(2)
  const [faqs, setfaqs] = useState([])
  const prevValue = props.value

  const addNewOption = () => {
    setcount(count + 1)
    setOptions((prev) => [...prev, count])
  }

  const handleConfirmVariants = () => {
    props.setFieldValue("faqs", faqs)
  }

  const handleConfirmVariantForEdit = () => {
    props.setFieldValue("faqs", [...prevValue, ...faqs])
  }

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h6" color="textPrimary" gutterBottom>
            FAQ Section
          </Typography>
          {props.edit ? (
            <div>
              {prevValue.map((value, i) => (
                <div key={i}>
                  <FaqTextField objectId={i} faq={value} edit={true} />
                </div>
              ))}
              {options.map((option, i) => (
                <div key={i}>
                  <FaqTextField
                    objectId={i}
                    faqs={faqs}
                    setfaqs={setfaqs}
                    edit={false}
                  />
                </div>
              ))}
              <div className={classes.buttonsContainer}>
                <Button
                  color="primary"
                  style={{ display: "inline-block" }}
                  onClick={addNewOption}
                  variant="outlined">
                  Add Field
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  style={{ display: "inline-block", marginLeft: "2rem" }}
                  onClick={handleConfirmVariantForEdit}>
                  Confirm Fields
                </Button>
              </div>
            </div>
          ) : (
            <div>
              {options.map((option, i) => (
                <div>
                  <div key={i}>
                    <FaqTextField
                      objectId={i}
                      faqs={faqs}
                      setfaqs={setfaqs}
                      edit={false}
                    />
                  </div>
                </div>
              ))}
              <div className={classes.buttonsContainer}>
                <Button
                  color="primary"
                  style={{ display: "inline-block" }}
                  onClick={addNewOption}
                  variant="outlined">
                  Add Field
                </Button>
                <Button
                  color="primary"
                  variant="outlined"
                  style={{ display: "inline-block", marginLeft: "2rem" }}
                  onClick={handleConfirmVariants}>
                  Confirm Fields
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Faqs
