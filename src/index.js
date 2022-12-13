import './style.css'

import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'

import Experience from './Experience.js'

const root = createRoot(document.querySelector('#root'))

root.render(

        <Canvas>
            <Experience />      
        </Canvas>

)