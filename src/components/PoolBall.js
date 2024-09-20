import React from 'react'
import { Sphere } from '@react-three/drei'

const PoolBall = ({ position }) => {
  return (
    <Sphere args={[0.2, 32, 32]} position={position}>
      <meshStandardMaterial color="white" />
    </Sphere>
  )
}

export default PoolBall