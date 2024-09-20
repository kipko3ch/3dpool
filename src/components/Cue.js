import React from 'react'
import { Cylinder } from '@react-three/drei'

const Cue = ({ position }) => {
  return (
    <Cylinder args={[0.05, 0.05, 4]} position={position} rotation={[0, 0, Math.PI / 2]}>
      <meshStandardMaterial color="brown" />
    </Cylinder>
  )
}

export default Cue