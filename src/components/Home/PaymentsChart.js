import React,{useState,useEffect} from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"
import { makeStyles } from "@material-ui/core"
import { Typography } from "@material-ui/core"

ChartJS.register(ArcElement, Tooltip, Legend)

const useStyles = makeStyles((theme) => ({
  graphContainer: {
    padding: 20,
    backgroundColor: "#fff1c2",
    width: "100%",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    margin: "10px auto 30px",
  },
}))



const options = {
  scales: {
    y: {
      display: false,
    },
    x: {
      display: false,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
  },
  maintainAspectRatio: false,
  responsive: false,
}

const PaymentChart = (props) => {
  const classes = useStyles()
  const [orderCount, setorderCount] = useState(0)
  const [prepaidCount, setprepaidCount] = useState(0)
  useEffect(() => {
    let orderCount = 0
    let prepaidOrders = 0
    props.orders.forEach((month) => {
      orderCount += month.orderCount
      prepaidOrders+=month.prepaid
    })
    setorderCount(orderCount)
    setprepaidCount(prepaidOrders)
  }, [props.orders])

  const data = {
    labels: ["Prepaid", "COD"],
    datasets: [
      {
        label: "Payment",
        data: [prepaidCount, orderCount-prepaidCount],
        backgroundColor: ["#e2e2e2", "#f8ceb3"],
        borderColor: ["silver", "#b94a03"],
        borderWidth: 2,
      },
    ],
  }
  return (
    <div className={classes.graphContainer}>
      <div className={classes.heading}>
        <Typography variant="h6" color="#555" align="center">
          Payment Statistics
        </Typography>
      </div>

      <Pie data={data} options={options} width={400} height={320} />
    </div>
  )
}

export default PaymentChart
