
import { PlateMain } from './PlatePieces'

export default function Plate({ position = [ 0, 0, 0 ] })
{

    return <>   

        <group>
            <PlateMain position={ [ 3, -0.6, 1 ] }/>
        </group>

    </>

}