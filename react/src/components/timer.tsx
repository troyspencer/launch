import * as React from 'react'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Badge from '@material-ui/core/Badge'
import TimerIcon from '@material-ui/icons/Timer'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const styles = {
    button: {
        marginTop: '15px',
        marginLeft: '10px'
    } as React.CSSProperties
}

export interface TimerProps { 
    launches: number,
    paused: boolean,
    setPaused: React.Dispatch<React.SetStateAction<boolean>>
}

export const Timer = (props: TimerProps) => {
    const initialNow = Date.now()
    const [startTime,setStartTime] = React.useState(initialNow)
    const [now,setNow] = React.useState(initialNow)
    const [totalPausedTime,setTotalPausedTime] = React.useState(0)
    const [pauseStartedTime,setPauseStartedTime] = React.useState(initialNow)
    const [startedLevel, setStartedLevel] = React.useState(false)

    React.useEffect(() => {
        if (props.launches != 0) {
            setStartedLevel(true)
        }
    }, [props.launches])

    React.useEffect(() => {
        if (startedLevel) {
            setStartTime(Date.now())
        }
    }, [startedLevel])

    React.useEffect(() => {
        setNow(startTime)
        setPauseStartedTime(startTime)
        setTotalPausedTime(0)
    }, [startTime])

    React.useEffect(() => {
        if (!props.paused) {
            setPauseStartedTime(now)
        }
        if (!startedLevel) {
            setStartTime(now)
        }
    }, [now, props.paused, startedLevel])

    React.useEffect(() => {
        if (props.paused) {
            setPauseStartedTime(Date.now())
        } else {
            setTotalPausedTime(totalPausedTime + Date.now() - pauseStartedTime)
        }
    }, [props.paused])

    React.useEffect(() => {
        const handleResetTimer = () => { 
            setStartedLevel(false)
        }
        window.document.addEventListener("resetTimer", handleResetTimer);

        const updateNow = () => {
            setNow(Date.now())
        }
        const interval = setInterval(updateNow, 1000);
        return () => {
            window.document.removeEventListener("resetTimer", handleResetTimer);
            clearInterval(interval);
        }
    }, [])

    const generateDisplayTime = (totalSeconds: number): string => {
        if (totalSeconds <= 0) {
            return '0'
        }

        var days   = Math.floor(totalSeconds / 86400);
        var hours   = Math.floor((totalSeconds - (days * 86400)) / 3600);
        var minutes = Math.floor((totalSeconds - (days * 86400) - (hours * 3600)) / 60);
        var seconds = totalSeconds - (days * 86400) - (hours * 3600) - (minutes * 60);
    
        var daysString: string = days+''
        var hoursString: string = hours+''
        var minutesString: string = minutes+''
        var secondsString: string = seconds+''
        if (minutes == 0 && hours == 0 && days == 0) {
            return secondsString
        }
        if (seconds < 10) {secondsString = "0"+secondsString;}
        if (hours == 0 && days == 0) {
            return minutesString+':'+secondsString
        }
        if (minutes < 10) {minutesString = "0"+minutesString;}
        if (days == 0) {
            return hoursString+':'+minutesString+':'+secondsString;
        }
        if (hours < 10) {hoursString = "0"+hoursString;}
        return daysString+':'+hoursString+':'+minutesString+':'+secondsString;
    }

    const generateElapsedTime = () => {
        const totalSeconds = Math.round((now - startTime - (totalPausedTime + now - pauseStartedTime))/1000)
        return generateDisplayTime(totalSeconds)
    }

    const theme = createMuiTheme({
        palette: {
          type: 'dark',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Badge style={styles.button} badgeContent={generateElapsedTime()} invisible={props.launches == 0} color="primary">
                <Tooltip placement="bottom" title="Elapsed Time">
                <Button style={styles.button} >
                        <TimerIcon />
                    </Button>
                </Tooltip>
            </Badge>
        </ThemeProvider>

    )
}