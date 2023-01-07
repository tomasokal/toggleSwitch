// external packages
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Bloom, ColorAverage, EffectComposer } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

// internal components
import Plate from './components/plate/Plate'
import Toggle from './components/toggle/Toggle'
import useIcon from './stores/useIcon'
import Lights from './Lights'

export default function Experience()
{

  const ref = useRef()

  const clicked = useIcon((state) => state.iconRotate)

  useFrame((state, delta) => {
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y, 
      clicked ? ref.current.rotation.y += delta / 10 : ref.current.rotation.y += 0, 
      10
    )
  })

  return <>   

    <EffectComposer>
      <Bloom mipmapBlur />
      <ColorAverage blendFunction={BlendFunction.MULTIPLY} />
    </EffectComposer>

    <OrbitControls />

    <Lights />

    <group ref={ref}>
      <Toggle castShadow receiveShadow position={ [ -3, 0, -1 ] } />
      <Toggle castShadow receiveShadow position={ [ 0, 0, -1 ] } />
      <Toggle castShadow receiveShadow position={ [ 3, 0, -1 ] } />
      <Plate receiveShadow position={ [ 0, -0.6, 0 ] } />
    </group>
          
  </>

}