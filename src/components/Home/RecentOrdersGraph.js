import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core"
import { Typography } from "@material-ui/core"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

const useStyles = makeStyles((theme) => ({
  graphContainer: {
    padding: 16,
    backgroundColor: "#fff1c2",
    width: "100%",
    borderRadius: "4px",
  },
  heading: {
    margin: "10px auto 30px",
  },
}))

const RecentOrdersBar = (props) => {
  ChartJS.register(ArcElement, Tooltip, Legend)
  const classes = useStyles()
  const [graphData, setgraphData] = useState([])
  const [labels, setlabels] = useState([])

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Orders",
        data: graphData,
        backgroundColor: [
          "#fcc101",
          "#fcc101",
          "#fcc101",
          "#fcc101",
          "#fcc101",
          "#fcc101",
        ],
        borderColor: [
          "#fcc101",
          "#fcc101",
          "#fcc101",
          "#fcc101",
          "#fcc101",
          "#fcc101",
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    scales: {
      y: {
        display: true,
      },
      x: {
        display: true,
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
  }

  useEffect(() => {
    setgraphData([])
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]

    props.orders
      .slice(props.orders.length - 6, props.orders.length)
      .forEach((month) => {
        setgraphData((prev) => [...prev, month.orderCount])
        const selectedMonthName = months[month._id.month - 1]
        setlabels((prev) => [...prev, selectedMonthName])
      })
  }, [props.orders])

  return (
    <div className={classes.graphContainer}>
      <div className={classes.heading}>
        <Typography variant="h6" color="#555" align="center">
          Order Statistics Of Last {graphData.length} Months
        </Typography>
      </div>

      <Bar data={data} options={options} />
    </div>
  )
}

export default RecentOrdersBar
