import { extend } from '@react-three/fiber'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry'

// Import materials and sounds because I am bad at web dev :)

    // Corresponds to textures from plastic folder
    import plasticAmbientOcclusion from './materials/plastic/Plastic_Rough_001_ambientOcclusion.jpg'
    import plasticBase from './materials/plastic/Plastic_Rough_001_basecolor.jpg'
    import plasticNormal from './materials/plastic/Plastic_Rough_001_normal.jpg'
    import plasticRoughness from './materials/plastic/Plastic_Rough_001_roughness.jpg'

// Construct plate

    // Geometry
    const plateGeometry = new RoundedBoxGeometry( 10, 1, 5, 32, 0.10 )

    // Material
    const textureLoader = new THREE.TextureLoader()
    const matAmbientOcclusion = textureLoader.load(plasticAmbientOcclusion)
    const matBase = textureLoader.load(plasticBase)
    const matNormal = textureLoader.load(plasticNormal)
    const matRoughness = textureLoader.load(plasticRoughness)

    const plateMaterial = new THREE.MeshPhysicalMaterial({ 

        aoMap: matAmbientOcclusion,
        map: matBase,
        color: '#0c0c1c',
        normalMap: matNormal,
        roughnessMap: matRoughness

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
