import * as planck from 'planck-js';
import * as React from 'react'

export interface WorldProps { 
    world: planck.World,
    player: planck.Body,
    setPlayer: React.Dispatch<React.SetStateAction<planck.Body>>, 
    worldScale: number
    simSpeed: number
    width: number
    height: number
    resetWorld: boolean
    setResetWorld: React.Dispatch<React.SetStateAction<boolean>>, 
}

export interface LaunchUserData {
    fillStyle:   string,
    strokeStyle: string,
    sticky:  boolean,
    bouncy:  boolean,
    breaks:  boolean,
    absorbs: boolean,
}

export const IsLaunchUserData = (userData: any): userData is LaunchUserData => {
    if (userData == null) {
        return false
    }
    return userData.fillStyle !== undefined
}

export const World = (props: WorldProps): JSX.Element => {
    React.useEffect(() => {
        if (props.resetWorld) {
            ClearWorld(props.world)
            props.setResetWorld(false)
        } else {
            PopulateWorld(props)
        }
    },[props.height, props.width, props.resetWorld])
    return <div />
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

export const PopulateWorld = (props: WorldProps) => {
    ClearWorld(props.world)
    CreateLaunchBlock(props)
	CreatePlayer(props)
	CreateGoalBlock(props)
	//CreateDebris()
	//CreateStaticDebris()
	//CreateBouncyDebris()
	//CreateStaticBouncyDebris()
	//CreateStickyDebris()
    //CreateWater()
}

const CreatePlayer = (props: WorldProps) => {
    const smallestDimension = props.width < props.height ? props.width : props.height
    var player = props.world.createDynamicBody(
        planck.Vec2(
            smallestDimension * props.worldScale / 32, 
            props.height*props.worldScale - smallestDimension*props.worldScale/32
        )
    )
    var circle = planck.Circle(smallestDimension * props.worldScale / 64);
    const userData: LaunchUserData = {
        fillStyle:   "rgba(180, 180,180,1)",
        strokeStyle: "rgba(180, 180,180,1)",
        sticky:  true,
        bouncy:  false,
        breaks:  false,
        absorbs: false,
    } 
    player.setUserData(userData)
    player.createFixture(circle, {
        density: 1.0,
        restitution: 1.0
    });
    props.setPlayer(player)
}

const CreateLaunchBlock = (props: WorldProps) => {
    const smallestDimension = props.width < props.height ? props.width : props.height
    var launchBlock = props.world.createBody(
        planck.Vec2(
            smallestDimension * props.worldScale / 32, 
            props.height*props.worldScale - smallestDimension*props.worldScale/32
        )
    )
    var launchBlockShape = planck.Box(
        smallestDimension*props.worldScale/32,
		smallestDimension*props.worldScale/32,
    )
    const userData: LaunchUserData = {
        fillStyle:   "rgba(50,50,50,1)",
        strokeStyle: "rgba(50,50,50,1)",
        sticky:  true,
        bouncy:  false,
        breaks:  false,
        absorbs: false,
    } 
    launchBlock.setUserData(userData)
    launchBlock.createFixture(launchBlockShape, {
        density: 1.0,
        restitution: 1.0
    });
}

const CreateGoalBlock = (props: WorldProps) => {
    const smallestDimension = props.width < props.height ? props.width : props.height
    var goalBlock = props.world.createKinematicBody(
        planck.Vec2(
            props.width*props.worldScale - smallestDimension*props.worldScale/32, 
            smallestDimension * props.worldScale / 32,
        )
    )
    var goalBlockShape = planck.Box(
        smallestDimension*props.worldScale/32,
		smallestDimension*props.worldScale/32,
    )
    const userData: LaunchUserData = {
        fillStyle:   "rgba(0,200,0,1)",
        strokeStyle: "rgba(0,200,0,1)",
        sticky:  true,
        bouncy:  false,
        breaks:  false,
        absorbs: false,
    } 
    goalBlock.setUserData(userData)
    goalBlock.createFixture(goalBlockShape, {
        density: 1.0,
        restitution: 1.0
    });
}


