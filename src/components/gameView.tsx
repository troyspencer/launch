import * as React from 'react'

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

export const GameView = () => {
    return (
        <canvas style={styles.mycanvas} id="mycanvas" />
    );
}