
import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import { MathUtils } from 'three'

import { ToggleKnob, ToggleScrew, ToggleScrewInside, ToggleWasher } from './TogglePieces'

// Corresponds to audio
import audio from './sounds/click.mp3'

export default function Toggle({ position = [ 0, 0, 0 ] })
{

    const knobBoi = useRef()
    const [ clickSound ] = useState(() => new Audio(audio))
    const [ clicked, setClicked ] = useState(false)
    const [ hovered, setHovered ] = useState(false)

    useFrame((state, delta) =>
    {
        knobBoi.current.children[6].rotation.x = MathUtils.lerp(
            knobBoi.current.children[6].rotation.x, 
            !clicked ? -Math.PI / 8 : Math.PI / 8, 
            0.075
        )
    })

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }, [hovered])

    return <>   

        <group 
            ref={knobBoi}
            position={ position }
            onPointerOver={ () => setHovered(true) }
            onPointerOut={ () => setHovered(false) }
            onClick={ (event) => {
                setClicked(!clicked) 
                clickSound.currentTime = 0
                clickSound.play()
                event.stopPropagation()
            }}
        >
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