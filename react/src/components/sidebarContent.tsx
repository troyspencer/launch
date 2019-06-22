import * as React from "react";
import { StatsToggle } from "./statsToggle";
import Grid from "@material-ui/core/Grid";

const styles = {
  header: {
    color: "rgb(180,180,180)",
    fontSize: "1.5em",
    textAlign: "center",
  } as React.CSSProperties
}

export interface SidebarContentProps {
  showStats: boolean,
  setShowStats: React.Dispatch<React.SetStateAction<boolean>>
}

export const SidebarContent = (props: SidebarContentProps) => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} style={styles.header}>
          Settings
        </Grid>
        <Grid item xs={12} >
          <StatsToggle showStats={props.showStats} setShowStats={props.setShowStats} />
        </Grid>
      </Grid>
    )
}
