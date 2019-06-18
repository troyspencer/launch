import * as React from 'react'
import {Button} from 'antd'

const styles = {
    button: {
        marginBottom: '10px',
        marginTop: '10px',
        marginRight: '10px',
        marginLeft: '10px'
    } as React.CSSProperties
}

export interface SettingsButtonProps { 
    onClick: (event: React.MouseEvent<any, MouseEvent>) => void
}

export const SettingsButton = (props: SettingsButtonProps) => {
    return (
        <Button style={styles.button} size="large" type="primary" shape="circle" icon="setting" onClick={props.onClick}/>
    )
}
