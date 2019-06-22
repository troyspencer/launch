import * as React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

export interface StatsToggleProps { 
  setShowStats: React.Dispatch<React.SetStateAction<boolean>>, 
  showStats: boolean
}

export const StatsToggle = (props: StatsToggleProps) => {
    const theme = createMuiTheme({
        palette: {
        type: 'dark',
        },
    });
    const styles = {
        statsToggle: {
          margin: "0.5em"
        } as React.CSSProperties
      }
    
    return (
        <ThemeProvider theme={theme}>
            <FormControlLabel
                style={styles.statsToggle}
                control={
                    <Switch 
                        checked={props.showStats} 
                        onChange={() => props.setShowStats(!props.showStats)} 
                    />}
                label="Stats"
            />
        </ThemeProvider>
  )
}
