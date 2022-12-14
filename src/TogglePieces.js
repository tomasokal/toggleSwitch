import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { MathUtils } from 'three'
import * as THREE from 'three'

import waterMaterial from './materials/Water_1_M_Normal.jpg'
import goldNormal from './materials/Scratched_gold_01_1K_Normal.png'
import audio from './sounds/click.mp3'

const torusGeometry = new THREE.TorusGeometry(0.75, 0.1, 3, 64)
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 0.5, 6)
const sphereGeometry = new THREE.SphereGeometry(0.75, 32, 16, Math.PI * 2, Math.PI * 2, Math.PI * 2, Math.PI / 1.8)
const capsuleGeometry = new THREE.CapsuleGeometry(0.25, 2, 32, 64)
const cylinderHollowGeometry = new THREE.CylinderGeometry(0.695, 0.695, 0.4, 64, 1, true)

const textureLoader = new THREE.TextureLoader()
const materialMapping = textureLoader.load(waterMaterial)
const normalMapping = textureLoader.load(goldNormal)

const washerMaterial = new THREE.MeshPhysicalMaterial({ 
    clearcoat: 0.75,
    metalness: 0.99,
    roughness: 0.10,
    color: '#726b64',
    normalMap: materialMapping,
    normalScale: new THREE.Vector2( 0.15, 0.15 ),
    clearcoatNormalMap: normalMapping
})

const screwMaterial = new THREE.MeshPhysicalMaterial({ 
    clearcoat: 0.75,
    metalness: 0.99,
    roughness: 0.10,
    color: '#705834',
    normalMap: materialMapping,
    normalScale: new THREE.Vector2( 0.15, 0.15 ),
    clearcoatNormalMap: normalMapping
})

const screwInsideMaterial = new THREE.MeshPhysicalMaterial({ 
    clearcoat: 0.75,
    metalness: 0.99,
    roughness: 0.10,
    color: '#705834',
    normalMap: materialMapping,
    normalScale: new THREE.Vector2( 0.15, 0.15 ),
    clearcoatNormalMap: normalMapping,
    side: THREE.BackSide
})

const knobMaterial = new THREE.MeshStandardMaterial({ color: '#a1a28c', metalness: 1.0, roughness: 0.25 })

export function ToggleScrew({ position = [ 0, 0, 0 ] })
{

    return <>   

        <mesh 
            geometry={ torusGeometry }
            material={ screwMaterial }
            rotation-x={ Math.PI / 2 } 
            position={ position }
        />

    </>

}

export function ToggleScrewInside({ position = [ 0, 0, 0 ] })
{

    return <>   

        <mesh 
            geometry={ cylinderHollowGeometry }
            material={ screwInsideMaterial }
            // rotation-x={ Math.PI / 2 } 
            position={ position }
        />

    </>

}

export function ToggleWasher({ position = [ 0, 0, 0] })
{

    return <>
    
        <mesh
            geometry={ cylinderGeometry }
            material={ washerMaterial }
            rotation-y={ Math.PI / 2 } 
            position={ position}
        />
    
    </>

}

export function ToggleKnob({ position = [ 0, 0, 0] })
{

    const knobBoi = useRef()
    const [ clickSound ] = useState(() => new Audio(audio))
    console.log(clickSound)
    const [ clicked, setClicked ] = useState(false)

    useFrame((state, delta) =>
    {
        knobBoi.current.rotation.x = MathUtils.lerp(knobBoi.current.rotation.x, !clicked ? -Math.PI / 8 : Math.PI / 8, 0.075)
    })

    return <>

        <group 
            ref={ knobBoi }
            onClick={ (event) => {

                setClicked(!clicked) 

                clickSound.currentTime = 0
                clickSound.play()

                event.stopPropagation()
            }}
        >
            <mesh
                geometry={ sphereGeometry }
                material={ knobMaterial }
                position={ position }
            />
            <mesh
                geometry={ capsuleGeometry }
                material={ knobMaterial }
                position={ [ 0, 1, 0 ] }
            />
        </group>
    
    </>

}
