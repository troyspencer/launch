import * as React from "react";
import Sidebar from "react-sidebar";
import { SettingsButton } from "./settingsButton"
import  { Stats } from "./stats";
import { GameView } from './gameView'
import { SidebarContent } from "./sidebarContent";
import FlexView from 'react-flexview';
import { Spin, Icon } from 'antd';

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
    const [sidebarOpen, setSidebarOpen] = React.useState(false)

    const styles = {
        spin: {
        marginTop: '20em',
        color: 'rgb(180,180,180',
        backgroundColor: 'black'
        }
    }

    React.useEffect(() => {
        if (props.setPaused) {
            props.setPaused(sidebarOpen)
        }
    }, [sidebarOpen, props.setPaused])

    return ( 
        <Sidebar
            sidebar={<SidebarContent showStats={showStats} setShowStats={setShowStats} />}
            open={sidebarOpen}
            onSetOpen={setSidebarOpen}
            styles={{ sidebar: { background: "#464646", color: "rgb(180,180,180)", width: "10em"} }}>
            <Spin 
                tip="Loading WebAssembly..." 
                size="large" 
                spinning={props.loading}
                style={styles.spin}
                indicator={<Icon type="loading" spin />}>
                <GameView 
                    setLoading={props.setLoading}
                    setLoaded={props.setLoaded}/>
                <FlexView hidden={!props.loaded || sidebarOpen} vAlignContent='top'>
                    <SettingsButton onClick={() => {setSidebarOpen(!sidebarOpen)}} />
                    <Stats paused={props.paused} showStats={showStats} setPaused={props.setPaused} />
                </FlexView>
            </Spin>
        </Sidebar>
    );
}