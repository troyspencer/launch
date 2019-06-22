import * as React from "react";
import Drawer from '@material-ui/core/Drawer';
import { GameView } from './gameView'
import { createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';

import  { Stats } from "./stats";

export interface OverlayProps { 
    paused: boolean,
    setPaused: React.Dispatch<React.SetStateAction<boolean>>,
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    loaded: boolean,
    setLoaded: React.Dispatch<React.SetStateAction<boolean>>
}


export const Overlay = (props: OverlayProps) => {
    const [showStats, setShowStats] = React.useState(true)
    const [sidebarOpen, setSidebarOpen] = React.useState(true)

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
        <div>
            <GameView 
            setLoading={props.setLoading}
            setLoaded={props.setLoaded}/>
                    
            <ThemeProvider theme={theme}>
                <Drawer 
                    variant="persistent"
                    anchor="left"   
                    open={sidebarOpen} 
                >
                    <Stats paused={props.paused}setPaused={props.setPaused} />
                </Drawer>
            </ThemeProvider>
            
        </div>
    );
}