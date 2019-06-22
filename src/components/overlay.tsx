import * as React from "react";
import Drawer from '@material-ui/core/Drawer';
import { GameView } from './gameView'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import  { Stats } from "./stats/stats";

export interface OverlayProps { 
    paused: boolean,
    setPaused: React.Dispatch<React.SetStateAction<boolean>>,
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    loaded: boolean,
    setLoaded: React.Dispatch<React.SetStateAction<boolean>>
}


export const Overlay = (props: OverlayProps) => {
    const [sidebarOpen, setSidebarOpen] = React.useState(true)

    const vertical = useMediaQuery('(max-aspect-ratio:1/1)');

    React.useEffect(() => {
        if (props.setPaused) {
            props.setPaused(sidebarOpen)
        }
    }, [sidebarOpen, props.setPaused])

    const theme = createMuiTheme({
        palette: {
          type: 'dark',
        },
    });

    return ( 
        <ThemeProvider theme={theme}>
            <GameView />
            <Drawer 
                variant="persistent"
                anchor={vertical ? "bottom" : "left"}   
                open={sidebarOpen} 
            >
                <Stats paused={props.paused}setPaused={props.setPaused} />
            </Drawer>
        </ThemeProvider>
    );
}