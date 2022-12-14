import './style.css'

import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'

import Experience from './Experience.js'

const root = createRoot(document.querySelector('#root'))

root.render(

        <Canvas>
            <Suspense fallback={null}>
                <Experience /> 
            </Suspense>  
        </Canvas>

)