import { OrbitControls, Stage } from '@react-three/drei'
import Plate from './Plate'

import Toggle from './Toggle'

export default function Experience()
{

    return <>   

        <OrbitControls />

        <Stage>

            <Toggle position={ [ 0, 0, 0 ] }/>
            <Toggle position={ [ 3, 0, 0 ] }/>
            <Toggle position={ [ 6, 0, 0 ] }/>
            <Plate />

        </Stage>
            
    </>

}