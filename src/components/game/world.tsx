import * as planck from 'planck-js';

export interface WorldProps { 
    worldScale: number
    simSpeed: number
}

export const World = (props: WorldProps): planck.World => {
    var width = document.body.clientWidth
    var height = document.body.clientHeight
    var pl = planck, Vec2 = pl.Vec2;
    var world = new pl.World();
    world.setGravity(Vec2(0,10))
    var ground = world.createBody(Vec2(0, height*props.worldScale));
    ground.createFixture(pl.Edge(Vec2(0, 0.0), Vec2(width*props.worldScale, 0.0)));

    var circle = pl.Circle(1.0);

    var ball = world.createDynamicBody(Vec2(width*props.worldScale / 2, height*props.worldScale / 2));
    ball.createFixture(circle, {
        density: 1.0,
        restitution: 1.0
    });

    return world
}