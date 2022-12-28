import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { MathUtils } from 'three'

import { PlateLightBase, PlateLightBulb, PlateLightFilament } from './LightPieces'

export default function PlateLight({ position = [ 0, 0, 0 ] })
{

    const ref = useRef()

    useFrame((state, delta) =>
    {
        const time = state.clock.getElapsedTime()

        ref.current.children[2].material.emissiveIntensity = Math.abs(Math.sin(time) * 25)
    })

    return <>   

        <group
            ref={ref}
            position={ position }
        >
            <PlateLightBase position={[ 0, 0, 0 ]}/>
            <PlateLightBulb position={[ 0, 0, 0 ]}/>
            <PlateLightFilament position={[ 0, 0.25, 0]}/>
        </group>

    </>

}