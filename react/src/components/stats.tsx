import * as React from 'react'
import { Launches } from './launches'
import { Timer } from './timer'

export interface StatsProps { 
    paused: boolean,
    setPaused: React.Dispatch<React.SetStateAction<boolean>>, 
    showStats: boolean
}

export const Stats = (props: StatsProps) => {
    const [launches,setLaunches] = React.useState(0)

    return (
        <div hidden={!props.showStats}>
            <Launches launches={launches} setLaunches={setLaunches} />
            <Timer launches={launches} paused={props.paused} setPaused={props.setPaused} />
        </div>
    )
}
