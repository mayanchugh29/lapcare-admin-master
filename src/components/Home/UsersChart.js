import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core"
import UserIcon from "@material-ui/icons/AccountCircle"
import { Typography } from "@material-ui/core"
import { Line } from "react-chartjs-2"

const useStyles = makeStyles((theme) => ({
  graphContainer: {
    padding: 12,
    backgroundColor: "#fff1c2",
    maxWidth: "400px",
    borderRadius: "4px",
  },
  heading: {
    display: "flex",
    justifyContent: "space-between",
    color: "#555",
  },
  icon: {
    color: "#555",
    fontSize: "40px",
  },
}))

const UsersChart = (props) => {
  const classes = useStyles()
  const [userCount, setuserCount] = useState(0)
  const [graphData, setgraphData] = useState([])
  const [labels, setlabels] = useState([])

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Users",
        data: graphData,
        fill: true,
        backgroundColor: "#fbd865",
        borderColor: "#fcc101",
      },
    ],
  }

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
    },
    elements: {
      point: {
        radius: 6,
      },
    },
  }

  useEffect(() => {
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
    let users = 0
    props.users.forEach((month) => {
      users += month.usersCount
      setgraphData((prev) => [...prev, month.usersCount])
      const selectedMonthName = months[month._id.month - 1]
      setlabels((prev) => [...prev, selectedMonthName])
    })
    setuserCount(users)
  }, [props.users])

  if (graphData.length > 6) {
    setgraphData(graphData.slice(graphData.length - 6, graphData.length))
    setlabels(labels.slice(graphData.length - 6, graphData.length))
  }

  return (
    <div className={classes.graphContainer}>
      <div className={classes.heading}>
        <div>
          <Typography style={{ fontWeight: "500", fontSize: "18px" }}>
            Registered Users
          </Typography>
          <Typography variant="h5">{userCount}</Typography>
        </div>
        <UserIcon className={classes.icon} />
      </div>
      <Line data={data} options={options} />
    </div>
  )
}

export default UsersChart
