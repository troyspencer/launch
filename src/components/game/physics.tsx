import * as React from 'react'
import { World, WorldProps } from './world'
import * as planck from 'planck-js';

export interface LaunchPlayerProps { 
    worldScale: number,
    width: number,
    height: number,
    player: planck.Body,
    launches: number,
    setLaunches: React.Dispatch<React.SetStateAction<number>>, 
    mx: number,
    my: number,
}

export const LaunchPlayer = (props: LaunchPlayerProps) => {
    props.setLaunches(props.launches+1)

    const movementDx = props.mx - props.player.getPosition().x
	const movementDy = props.my - props.player.getPosition().y

	// create normalized movement vector from player to click location
	const impulseVelocity = planck.Vec2(movementDx,movementDy)
    impulseVelocity.normalize()
    
    var smallestDimension = props.height
    if (props.width < smallestDimension) {
        smallestDimension = props.width
    }
    impulseVelocity.mul(smallestDimension * props.worldScale / 2)
    /*
	if worldState.AbsorbCount > 0 {
		impulseVelocity.OperatorScalarMulInplace(0.5)
    }
    */

	//worldState.ClearJoints(worldState.Player)
	//worldState.ClearJoints(worldState.WeldedDebris)
	//worldState.PlayerWelded = false

	//worldState.PushDebris(impulseVelocity)

    // set player velocity to player desired velocity
	props.player.setLinearVelocity(impulseVelocity)
}