import { OrbitControls, Stage } from '@react-three/drei'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { Perf } from 'r3f-perf'
import PlateLight from './components/light/Light'

import Plate from './components/plate/Plate'
import Toggle from './components/toggle/Toggle'

export default function Experience()
{

    return <>   

        <EffectComposer>
            <Bloom mipmapBlur />
        </EffectComposer>

        <Perf />

        <OrbitControls />

        <Stage>

            <Toggle position={ [ 0, 0, 0 ] }/>
            <Toggle position={ [ 3, 0, 0 ] }/>
            <Toggle position={ [ 6, 0, 0 ] }/>
            <PlateLight position={ [ 0, 0, 2.5 ] }/>
            <PlateLight position={ [ 3, 0, 2.5 ] }/>
            <PlateLight position={ [ 6, 0, 2.5 ] }/>
            <Plate />

        </Stage>
            
    </>

}