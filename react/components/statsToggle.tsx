import * as React from 'react'
import { Checkbox } from 'antd';

export interface StatsToggleProps { 
  setShowStats: React.Dispatch<React.SetStateAction<boolean>>, 
  showStats: boolean
}

export const StatsToggle = (props: StatsToggleProps) => {
  const styles = {
    checkbox: {
      color: "rgb(180,180,180)",
      margin: "1em"
    } as React.CSSProperties
  }

  return (
    <Checkbox style={styles.checkbox} checked={props.showStats} onChange={() => props.setShowStats(!props.showStats)}>
      {props.showStats ? "Stats Visible" : "Stats Hidden"}
    </Checkbox>
  )
}
