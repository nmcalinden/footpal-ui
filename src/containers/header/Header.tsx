import { Grid } from "@mui/material";
import * as React from "react";
import Login from "../../components/login/Login";

const Header = () => {
  return (
    <Grid container spacing={2} sx={{p: 1, borderBottom: 1, borderColor:'divider'}} >
      <Grid item xs={8} md={10} justifyContent="flex-start">
          <p>Footpal</p>
      </Grid>
      <Grid item xs={4} md={2} justifyContent="flex-end" display={"flex"}>
        <Login />
      </Grid>
    </Grid>
  )
}

export default Header;