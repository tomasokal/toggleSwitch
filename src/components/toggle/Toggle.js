
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

import { ToggleKnob, ToggleScrew, ToggleScrewInside, ToggleWasher } from './TogglePieces'
import { PlateLightBase, PlateLightBulb } from './LightPieces'

import audio from '../../sounds/click.mp3'

export default function Toggle({ position, toggle })
{

    // Pull in audio
    const [ clickSound ] = useState(() => new Audio(audio))

    // Create refs
    const refToggle = useRef()
    const refBulb = useRef()

    // Create states
    const [ hovered, setHovered ] = useState(false)
    const [ clicked, setClicked ] = useState(false)

    // Create geometry for filament
    const filamentGeometry = new THREE.TorusKnotGeometry(0.20, 0.015, 64, 3, 4, 3)

    // Create material
        // This is where the switch is.
    const filamentMaterial = new THREE.MeshStandardMaterial({
        color: 'black',
        emissive: 'orange',
        emissiveIntensity: clicked ? 25 : 0,
        toneMapped: false,
    })

    // Moved this function here because was having trouble making material reactive.
    function PlateLightFilament({ position = [ 0, 0, 0 ] })
    {
        return <>   
            <mesh geometry={ filamentGeometry } position={ position } material = { filamentMaterial } />
        </>
    }
    
    // Function for toggle event.
    const toggleClick = (event) => {
        setClicked(!clicked)
        clickSound.currentTime = 0
        clickSound.play()
        event.stopPropagation()
    }

    // Animation for switch
    useFrame((state, delta) =>
    {

        refToggle.current.children[6].rotation.x = THREE.MathUtils.lerp(
            refToggle.current.children[6].rotation.x, 
            !clicked ? -Math.PI / 8 : Math.PI / 8, 
            0.075
        )

    })

    // Added for hover effect.
    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }, [hovered])

    return <>   

        <group>

            <group 
                ref={refToggle}
                position={position}
                onPointerOver={ () => setHovered(true) }
                onPointerOut={ () => setHovered(false) }
                onClick={toggleClick}
            >
                <ToggleWasher position={ [ 0, 0, 0 ] }/>
                <ToggleScrew position={ [ 0, 0.3, 0 ] }/>
                <ToggleScrew position={ [ 0, 0.4, 0 ] }/>
                <ToggleScrew position={ [ 0, 0.5, 0 ] }/>
                <ToggleScrew position={ [ 0, 0.6, 0 ] }/>
                <ToggleScrewInside position={ [ 0, 0.45, 0 ] }/>
                <ToggleKnob position={ [ 0, 0.1, 0 ] }/>
            </group>

            <group
                ref={refBulb}
                position={position}
            >
                <PlateLightBase position={[ 0, 0, 2.25 ]}/>
                <PlateLightBulb position={[ 0, 0, 2.25 ]}/>
                <PlateLightFilament position={[ 0, 0.25, 2.25 ]} material={ filamentMaterial } />
            </group>
            
        </group>

    </>

}