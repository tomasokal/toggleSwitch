
import { PlateMain } from './PlatePieces'

export default function Plate({ position })
{

    return <>   

        <group>
            <PlateMain position={position}/>
        </group>

    </>

}