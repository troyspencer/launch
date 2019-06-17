import React, {useEffect} from 'react'

const styles = {
    mycanvas: {
        position: "fixed",
        backgroundColor: "black",
        opacity: 1.0,
        width: "100%",
        height: "100%",
        top:0,
        right:0,
        bottom:0,
        left:0
    }
}

export default function GameView(props) {
    props.setLoading(false)
    props.setLoaded(true)

    return (
        <canvas style={styles.mycanvas} id="mycanvas" />
    );
}