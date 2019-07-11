import * as React from 'react'
import Drawer from '@material-ui/core/Drawer';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import  { Stats } from "../stats/stats";
import { World, WorldProps, LaunchUserData, IsLaunchUserData } from './world'
import * as planck from 'planck-js';
import { LaunchPlayer, LaunchPlayerProps }  from './physics'
import { width, height } from '@material-ui/system';

export const Game = () => {
    const [world, setWorld] = React.useState(planck.World())
    const [worldScale, setWorldScale] = React.useState(0.125)
    const [simSpeed, setSimSpeed] = React.useState(2)
    const [player, setPlayer] = React.useState<planck.Body>()
    const [paused, setPaused] = React.useState(false)
    const [launches,setLaunches] = React.useState(0)
    const [sidebarOpen, setSidebarOpen] = React.useState(true)
    const canvasRef = React.useRef(null)

    const calculateCanvasSize = (width: number, height: number): {width: number, height: number} => {
        if (width < height) {
            return {width: width, height: width * 1.4}
        }
        return {width: height * 1.4, height: height} 
    }

    const canvasSize = calculateCanvasSize(document.body.clientWidth, document.body.clientHeight)

    React.useEffect(() => {
        
        var tMark = 0
        const render = (timestamp: number) => {
            const tDiff = timestamp - tMark
            tMark = timestamp

            const canvas = canvasRef.current;
            canvas.width = canvasSize.width
            canvas.height = canvasSize.height
            const context = canvas.getContext('2d');
            context.scale(1/0.125, 1/0.125)
            // in each frame call world.step(timeStep) with fixed timeStep
            const timestep = paused ? 0 : tDiff/1000 * simSpeed

            world.step(timestep, 60, 120);

            // clear canvas
            context.clearRect(0,0,canvasSize.width*worldScale, canvasSize.height*worldScale)

            // iterate over bodies and fixtures
            for (var body = world.getBodyList(); body; body = body.getNext()) {
                for (var fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
                    
                    context.fillStyle = "rgba(180, 180,180,1)"
                    context.strokeStyle = "rgba(180, 180,180,1)"
                    
                    const userData: any = body.getUserData()
                    if ( IsLaunchUserData(userData))  {
                        console.log(userData.fillStyle)
                        context.fillStyle = userData.fillStyle
                        context.strokeStyle = userData.strokeStyle
                    }
                    
                    const shape = fixture.getShape()
                    // draw or update fixture
                    context.save()
                    if (shape instanceof planck.Polygon) {
                        context.translate(body.m_xf.p.x, body.m_xf.p.y)
                        context.rotate(body.m_xf.q.getAngle())
                        context.beginPath()
                        context.moveTo(shape.m_vertices[0].x, shape.m_vertices[0].y)
                        for (var i = 1; i < shape.m_vertices.length; i++) {
                            const v = shape.m_vertices[i]
                            context.lineTo(v.x, v.y)
                        }
                        context.lineTo(shape.m_vertices[0].x, shape.m_vertices[0].y)
                        context.fill()
                        context.stroke()
                    } else if (shape instanceof planck.Circle) {
                        context.translate(body.m_xf.p.x, body.m_xf.p.y)
                        context.rotate(body.m_xf.q.getAngle())
                        context.beginPath()
                        context.arc(0, 0, shape.m_radius, 0, 2*Math.PI)
                        context.fill()
                        context.moveTo(0, 0)
                        context.lineTo(0, shape.m_radius)
                        context.stroke()
                    }
                    context.restore()
                }
            }
            window.requestAnimationFrame(render);
        }

        window.requestAnimationFrame(render);
    },[paused])

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

    React.useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (e.target != canvasRef.current) {
                return
            }

            const mx = e.clientX * worldScale
            const my = e.clientY * worldScale

            const launchPlayerProps: LaunchPlayerProps = {
                worldScale: worldScale,
                width: canvasSize.width,
                height: canvasSize.height,
                player: player,
                launches: launches,
                setLaunches: setLaunches,
                mx: mx,
                my: my
            }

            LaunchPlayer(launchPlayerProps)
            /*
        
            // only allow launch if grounded aka welded to an object
            if worldState.PlayerWelded || worldState.AbsorbCount > 0 {
                mx := e.Get("clientX").Float() * worldState.WorldScale
                my := e.Get("clientY").Float() * worldState.WorldScale
                worldState.LaunchPlayer(mx, my)
            }
        
            // always clear joints on click to prevent sticking to multiple debris
            worldState.ClearJoints(worldState.Player)
        
            */
            return
        }

        window.addEventListener("mousedown", handleClick);
        return () => {
            window.removeEventListener("mousedown", handleClick);
        }
    })

    const vertical = useMediaQuery('(max-aspect-ratio:1/1)');

    const theme = createMuiTheme({
        palette: {
          type: 'dark',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <canvas ref={canvasRef} />
            <World 
                world={world} 
                player={player} 
                setPlayer={setPlayer} 
                worldScale={worldScale} 
                simSpeed={simSpeed} 
                width={canvasSize.width} 
                height={canvasSize.height} />
            <Drawer 
                PaperProps={{
                    style:{
                        minHeight: document.body.clientHeight - canvasSize.height,
                        minWidth: document.body.clientWidth - canvasSize.width
                    }
                }}
                variant="persistent"
                anchor={vertical ? "bottom" : "right"}   
                open={sidebarOpen} >
                <Stats paused={paused} launches={launches} />
            </Drawer>
        </ThemeProvider>
    );
}