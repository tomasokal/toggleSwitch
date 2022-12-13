import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

// Construct plate

    // Shape
    const shape = new THREE.Shape()
    const angleStep = Math.PI * 0.5
    const radius = 1

    shape.absarc(9, 2, radius, angleStep * 0, angleStep * 1)
    shape.absarc(0, 2, radius, angleStep * 1, angleStep * 2)
    shape.absarc(0, -2, radius, angleStep * 2, angleStep * 3)
    shape.absarc(9, -2, radius, angleStep * 3, angleStep * 4)

    // Geometry
    const plateGeometry = new THREE.ExtrudeGeometry(shape, {
        depth: 1,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelSegments: 20,
        curveSegments: 20
    })
    plateGeometry.center()
    plateGeometry.rotateX(Math.PI * -0.5)

    // Material
    const plateMaterial = new THREE.MeshStandardMaterial({ color: '#5A647B', metalness: 1.0, roughness: 0.05 })

export function PlateMain({ position = [ 0, 0, 0 ] })
{

    return <>   

        <mesh 
            geometry={ plateGeometry }
            material={ plateMaterial }
            position={ position }
        />

    </>

}
