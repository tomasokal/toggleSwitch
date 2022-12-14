
import { ToggleKnob, ToggleScrew, ToggleScrewInside, ToggleWasher } from './TogglePieces'

export default function Toggle({ position = [ 0, 0, 0 ] })
{

    return <>   

        <group position={ position }>
            <ToggleWasher position={ [ 0, 0, 0 ] }/>
            <ToggleScrew position={ [ 0, 0.3, 0 ] }/>
            <ToggleScrew position={ [ 0, 0.4, 0 ] }/>
            <ToggleScrew position={ [ 0, 0.5, 0 ] }/>
            <ToggleScrew position={ [ 0, 0.6, 0 ] }/>
            <ToggleScrewInside position={ [ 0, 0.45, 0 ] }/>
            <ToggleKnob position={ [ 0, 0.1, 0 ] }/>
        </group>

    </>

}