import * as planck from 'planck-js';

export interface WorldProps { 
    worldScale: number
    simSpeed: number
    width: number
    height: number
}

export const World = (props: WorldProps): planck.World => {
    var world = new planck.World();
    world.setGravity(planck.Vec2(0,10))
    PopulateWorld(world, props)
    return world
}

export const ClearWorld = (world: planck.World) => {
    // clear out world of any elements
	for (var joint = world.getJointList(); joint; joint = joint.getNext()) {
		world.destroyJoint(joint)
	}

	for (var body = world.getBodyList(); body; body = body.getNext()) {
		world.destroyBody(body)
	}
}

export const PopulateWorld = (world: planck.World, props: WorldProps) => {
    ClearWorld(world)
    CreateLaunchBlock(world, props)
	CreatePlayer(world, props)
	CreateGoalBlock(world, props)
	//CreateDebris()
	//CreateStaticDebris()
	//CreateBouncyDebris()
	//CreateStaticBouncyDebris()
	//CreateStickyDebris()
    //CreateWater()
}

const CreatePlayer = (world: planck.World, props: WorldProps) => {
    const smallestDimension = props.width < props.height ? props.width : props.height
    var player = world.createDynamicBody(
        planck.Vec2(
            smallestDimension * props.worldScale / 32, 
            props.height*props.worldScale - smallestDimension*props.worldScale/32
        )
    )
    var circle = planck.Circle(smallestDimension * props.worldScale / 64);
    player.createFixture(circle, {
        density: 1.0,
        restitution: 1.0
    });
}

const CreateLaunchBlock = (world: planck.World, props: WorldProps) => {
    const smallestDimension = props.width < props.height ? props.width : props.height
    var launchBlock = world.createBody(
        planck.Vec2(
            smallestDimension * props.worldScale / 32, 
            props.height*props.worldScale - smallestDimension*props.worldScale/32
        )
    )
    var launchBlockShape = planck.Box(
        smallestDimension*props.worldScale/32,
		smallestDimension*props.worldScale/32,
    )
    launchBlock.createFixture(launchBlockShape, {
        density: 1.0,
        restitution: 1.0
    });
}

const CreateGoalBlock = (world: planck.World, props: WorldProps) => {
    const smallestDimension = props.width < props.height ? props.width : props.height
    var goalBlock = world.createKinematicBody(
        planck.Vec2(
            props.width*props.worldScale - smallestDimension*props.worldScale/32, 
            smallestDimension * props.worldScale / 32,
        )
    )
    var goalBlockShape = planck.Box(
        smallestDimension*props.worldScale/32,
		smallestDimension*props.worldScale/32,
    )
    goalBlock.createFixture(goalBlockShape, {
        density: 1.0,
        restitution: 1.0
    });
}


