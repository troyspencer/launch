import * as React from 'react'
import Drawer from '@material-ui/core/Drawer';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import  { Stats } from "./stats/stats";

export const Game = () => {
    const [paused, setPaused] = React.useState(false)
    const [sidebarOpen, setSidebarOpen] = React.useState(true)

    React.useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.which == 32) {
                setPaused(!paused)
            }
        }

        window.addEventListener("keyup", handleKey);
        return () => {
            window.removeEventListener("keyup", handleKey);
        }
    }, [paused])

    const vertical = useMediaQuery('(max-aspect-ratio:1/1)');

    const theme = createMuiTheme({
        palette: {
          type: 'dark',
        },
    });

    const styles = {
        mycanvas: {
            position: 'fixed',
            backgroundColor: "black",
            opacity: 1.0,
            width: "100%",
            height: "100%",
            top:0,
            right:0,
            bottom:0,
            left:0
        } as React.CSSProperties
    } 

    return (
        <ThemeProvider theme={theme}>
            <canvas style={styles.mycanvas} id="mycanvas" />
            <Drawer 
                variant="persistent"
                anchor={vertical ? "bottom" : "left"}   
                open={sidebarOpen} 
            >
                <Stats paused={paused} setPaused={setPaused} />
            </Drawer>
        </ThemeProvider>
    );
}