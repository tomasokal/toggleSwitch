import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { MathUtils } from 'three'
import * as THREE from 'three'

// Import materials and sounds because I am bad at web dev :)

    // Corresponds to textures from metal folder
    import metalOneAmbientOcclusion from './materials/metal/Metal_006_ambientOcclusion.jpg'
    import metalOneRoughness from './materials/metal/Metal_006_roughness.jpg'

    // Corresponds to textures from metal scratch folder
    import metalTwoRoughness from './materials/metal-scratch/Metal_scratched_009_roughness.jpg'

    // Corresponds to audio
    import audio from './sounds/click.mp3'

// Generate geometries one time so we can reuse them
const torusGeometry = new THREE.TorusGeometry(0.75, 0.1, 3, 64)
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 0.5, 6)
const sphereGeometry = new THREE.SphereGeometry(0.75, 32, 16, Math.PI * 2, Math.PI * 2, Math.PI * 2, Math.PI / 1.8)
const capsuleGeometry = new THREE.CapsuleGeometry(0.25, 2, 32, 64)
const cylinderHollowGeometry = new THREE.CylinderGeometry(0.695, 0.695, 0.4, 64, 1, true)

// Textures :(

    // Load textureloader lol
    const textureLoader = new THREE.TextureLoader()

    // Metals
    const mapMetalOneAmbientOcclusion = textureLoader.load(metalOneAmbientOcclusion)
    const mapMetalOneRoughness = textureLoader.load(metalOneRoughness)
    const mapMetalTwoRoughness = textureLoader.load(metalTwoRoughness)

    // Map these to materials

        // Washer
        const washerMaterial = new THREE.MeshPhysicalMaterial({ 
            aoMap: mapMetalOneAmbientOcclusion,
            metalness: 0.99,
            color: '#ae8951',
            roughnessMap: mapMetalTwoRoughness
        })

        // Screws outside
        const screwMaterial = new THREE.MeshPhysicalMaterial({ 
            aoMap: mapMetalOneAmbientOcclusion,
            metalness: 0.99,
            color: '#705834',
            roughnessMap: mapMetalTwoRoughness
        })

        // Screws inside
        const screwInsideMaterial = new THREE.MeshPhysicalMaterial({ 
            aoMap: mapMetalOneAmbientOcclusion,
            metalness: 0.99,
            color: '#705834',
            roughnessMap: mapMetalTwoRoughness,
            side: THREE.BackSide
        })

        // Knob
        const knobMaterial = new THREE.MeshStandardMaterial({ 
            aoMap: mapMetalOneAmbientOcclusion,
            metalness: 0.99,
            color: '#a1a28c',
            roughnessMap: mapMetalOneRoughness
        })

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
