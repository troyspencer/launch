import * as React from 'react'
import Fab from '@material-ui/core/Fab'
import SettingsIcon from '@material-ui/icons/Settings'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';



export interface SettingsButtonProps { 
    onClick: (event: React.MouseEvent<any, MouseEvent>) => void
}

export const SettingsButton = (props: SettingsButtonProps) => {
    const styles = {
        button: {
            marginTop: '15px',
            marginLeft: '10px'
        } as React.CSSProperties
    }

    const theme = createMuiTheme({
        palette: {
          type: 'dark',
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <Fab style={styles.button} size="small" onClick={props.onClick}>
                <SettingsIcon />
            </Fab>
        </ThemeProvider>
        
    )
}
