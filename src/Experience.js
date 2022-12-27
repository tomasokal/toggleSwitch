import { OrbitControls, Stage } from '@react-three/drei'
import { Perf } from 'r3f-perf'

import Plate from './components/plate/Plate'
import Toggle from './components/toggle/Toggle'

export default function Experience()
{

    return <>   

        <Perf />

        <OrbitControls />

        <Stage>

            <Toggle position={ [ 0, 0, 0 ] }/>
            <Toggle position={ [ 3, 0, 0 ] }/>
            <Toggle position={ [ 6, 0, 0 ] }/>
            <Plate />

        </Stage>
            
    </>

}