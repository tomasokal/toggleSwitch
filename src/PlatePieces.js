import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { TextureLoader } from 'three'

import waterMaterial from './materials/Water_1_M_Normal.jpg'
import goldNormal from './materials/Scratched_gold_01_1K_Normal.png'

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
        bevelSegments: 64,
        curveSegments: 64
    })
    plateGeometry.center()
    plateGeometry.rotateX(Math.PI * -0.5)

    // Material
    const textureLoader = new THREE.TextureLoader()
    const plateMapping = textureLoader.load(waterMaterial)
    const clearCoatMapping = textureLoader.load(goldNormal)

    const plateMaterial = new THREE.MeshPhysicalMaterial({ 
        clearcoat: 0.25,
        metalness: 0.90,
        roughness: 1.00,
        color: '#0c0c1c',
        normalMap: plateMapping,
        normalScale: new THREE.Vector2( 0.15, 0.15 ),
        clearcoatNormalMap: clearCoatMapping,

        // y scale is negated to compensate for normal map handedness.
        clearcoatNormalScale: new THREE.Vector2( 1, 1 )
    })

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
