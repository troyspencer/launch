import * as React from 'react'
import { Overlay } from './overlay';

export const Game = () => {
    const [loading, setLoading] = React.useState(true)
    const [loaded, setLoaded] = React.useState(false)
    const [paused, setPaused] = React.useState(false)

    const pauseEvent = new Event("pause")
    const unpauseEvent = new Event("unpause")

    React.useEffect(() => {
        if (paused) {
            window.document.dispatchEvent(pauseEvent)
        } else {
            window.document.dispatchEvent(unpauseEvent)
        }
    }, [paused])

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
        <Overlay 
        paused={paused} setPaused={setPaused}
        loading={loading} setLoading={setLoading}
        loaded={loaded} setLoaded={setLoaded} />
    );
}