import * as React from 'react'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Badge from '@material-ui/core/Badge'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import TrendingUpIcon from '@material-ui/icons/TrendingUp'

export interface LaunchesProps { 
    launches: number
    setLaunches: React.Dispatch<React.SetStateAction<number>>, 
}

export const Launches = (props: LaunchesProps) => { 
    const theme = createMuiTheme({
        palette: {
          type: 'dark',
        },
    });

    React.useEffect(() => {
        const updateLaunches = (e: any) => props.setLaunches(e.launches)
        window.document.addEventListener("updateLaunches", updateLaunches);
        return () => {
            window.document.removeEventListener("updateLaunches", updateLaunches);
        } 
    },[])

    return (
        <ThemeProvider theme={theme}>
            <Badge badgeContent={props.launches}>
                <Tooltip placement="bottom" title="Launches">
                    <Button >
                        <TrendingUpIcon />
                    </Button>
                </Tooltip>
            </Badge>
        </ThemeProvider>
    )
}   
