import * as React from "react";
import { StatsToggle } from "./statsToggle";
import { Col } from "antd";

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
      <Col>
        <div style={styles.header}>
          Settings 
        </div> 
        <StatsToggle showStats={props.showStats} setShowStats={props.setShowStats} />
      </Col>
    )
}
