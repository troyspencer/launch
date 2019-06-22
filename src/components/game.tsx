import * as React from 'react'
import { Overlay } from './overlay';

export const Game = () => {
    const [paused, setPaused] = React.useState(false)

    const handleKey = (e: KeyboardEvent) => {
        if (e.which == 32) {
            setPaused(!paused)
        }
    }

    React.useEffect(() => {
        window.addEventListener("keyup", handleKey);
        return () => {
            window.removeEventListener("keyup", handleKey);
        }
    }, [paused])

    return (
        <Overlay paused={paused} setPaused={setPaused} />
    );
}