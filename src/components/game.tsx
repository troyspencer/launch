import * as React from 'react'
import Drawer from '@material-ui/core/Drawer';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import  { Stats } from "./stats/stats";
import * as planck from 'planck-js';

export const Game = () => {
    const [paused, setPaused] = React.useState(false)
    const [sidebarOpen, setSidebarOpen] = React.useState(true)

    const canvasRef = React.useRef(null)

    React.useEffect(() => {
        var worldScale = 0.125
        var width = document.body.clientWidth
        var height = document.body.clientHeight
        var pl = planck, Vec2 = pl.Vec2;
        var world = new pl.World(Vec2(0, -15));
        world.setGravity(Vec2(0,15))
        var ground = world.createBody(Vec2(30, height*worldScale));
        ground.createFixture(pl.Edge(Vec2(0, 0.0), Vec2(width*worldScale, 0.0)));
    
        var circle = pl.Circle(1.0);

        var ball = world.createDynamicBody(Vec2(width*worldScale / 2, 20.0));
        ball.createFixture(circle, {
            density: 1.0,
            restitution: 1.0
        });
        
        var tMark = 0
    
        const render = (timestamp: number) => {
            const tDiff = timestamp - tMark
            tMark = timestamp

            const canvas = canvasRef.current;
            canvas.width = document.body.clientWidth
            canvas.height = document.body.clientHeight
            const context = canvas.getContext('2d');
            context.scale(1/0.125, 1/0.125)
            // in each frame call world.step(timeStep) with fixed timeStep
            world.step(tDiff/1000, 60, 120);
            // iterate over bodies and fixtures
            for (var body = world.getBodyList(); body; body = body.getNext()) {
                for (var fixture = body.getFixtureList(); fixture; fixture = fixture.getNext()) {
                    context.fillStyle = "rgba(180, 180,180,1)"
                    context.strokeStyle = "rgba(180, 180,180,1)"
            
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
    },[])

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

    const vertical = useMediaQuery('(max-aspect-ratio:1/1)');

    const theme = createMuiTheme({
        palette: {
          type: 'dark',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <canvas ref={canvasRef} />
            <Drawer 
                variant="persistent"
                anchor={vertical ? "bottom" : "left"}   
                open={sidebarOpen} 
            >
                <Stats paused={paused} setPaused={setPaused} />
            </Drawer>
        </ThemeProvider>
    );
}