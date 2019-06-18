import * as React from 'react'
import { Launches } from './launches'
import { Timer } from './timer'
import { Row, Col } from 'antd'

export interface StatsProps { 
    paused: boolean,
    setPaused: React.Dispatch<React.SetStateAction<boolean>>, 
    showStats: boolean
}

export const Stats = (props: StatsProps) => {
    const [launches,setLaunches] = React.useState(0)

    return (
        <div hidden={!props.showStats}>
            <Row>
                <Col span={12}>
                    <Launches launches={launches} setLaunches={setLaunches} />
                </Col>
                <Col span={12}>
                    <Timer launches={launches} paused={props.paused} setPaused={props.setPaused} />
                </Col>
            </Row>
        </div>
    )
}
