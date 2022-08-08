import { createTheme } from "@material-ui/core/styles"

export const theme = createTheme({
  palette: {
    primary: {
      main: "#fcc101",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f4d160",
    },
    error: {
      main: "#e40017",
    },
    warning: {
      main: "#f1f1f1",
    },
    info: {
      main: "#1687a7",
    },
    success: {
      main: "#00917c",
    },
  },
})
