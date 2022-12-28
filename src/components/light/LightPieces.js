import * as THREE from 'three'

// Import materials and sounds because I am bad at web dev :)

    // Corresponds to textures from metal folder
    import metalOneAmbientOcclusion from '../../materials/metal/Metal_006_ambientOcclusion.jpg'
    import metalOneRoughness from '../../materials/metal/Metal_006_roughness.jpg'

    // Corresponds to textures from metal scratch folder
    import metalTwoRoughness from '../../materials/metal-scratch/Metal_scratched_009_roughness.jpg'

// Generate geometries one time so we can reuse them
const cylinderGeometry = new THREE.CylinderGeometry(0.75, 0.75, 0.25, 32)
const capsuleGeometry = new THREE.SphereGeometry(0.70, 32, 32, 0, (Math.PI * 2), 0, (Math.PI * 0.5))
const filamentGeometry = new THREE.TorusKnotGeometry(0.20, 0.015, 64, 3, 4, 3)

// Textures :(

    // Load textureloader lol
    const textureLoader = new THREE.TextureLoader()

    // Metals
    const mapMetalOneAmbientOcclusion = textureLoader.load(metalOneAmbientOcclusion)
    const mapMetalOneRoughness = textureLoader.load(metalOneRoughness)
    const mapMetalTwoRoughness = textureLoader.load(metalTwoRoughness)

    // Map these to materials

        // Base
        const baseMaterial = new THREE.MeshPhysicalMaterial({ 
            aoMap: mapMetalOneAmbientOcclusion,
            metalness: 0.99,
            color: '#ae8951',
            roughnessMap: mapMetalTwoRoughness
        })

        // Bulb
        const bulbMaterial = new THREE.MeshPhysicalMaterial({
            roughness: 0,
            transmission: 1,
            thickness: 0.15,
            specularColor: 'orange',
            attenuationColor: 'orange',
        })

        // Filament
        const filamentMaterial = new THREE.MeshStandardMaterial({
            color: 'black',
            emissive: 'orange',
            emissiveIntensity: 0,
            toneMapped: false,
        })

export function PlateLightBase({ position = [ 0, 0, 0 ] })
{

    return <>   

        <mesh 
            geometry={ cylinderGeometry }
            material={ baseMaterial }
            position={ position }
        />

    </>

}

export function PlateLightBulb({ position = [ 0, 0, 0 ] })
{

    return <>   

        <mesh 
            geometry={ capsuleGeometry }
            material={ bulbMaterial }
            position={ position }
        />

    </>

}

export function PlateLightFilament({ position = [ 0, 0, 0 ] })
{

    return <>   

        <mesh geometry={ filamentGeometry } position={ position } material={ filamentMaterial } />

    </>

}