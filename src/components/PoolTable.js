import React from 'react'
import { Box } from '@react-three/drei'

const PoolTable = () => {
  return (
    <Box args={[10, 0.5, 5]} position={[0, -0.25, 0]}>
      <meshStandardMaterial color="green" />
    </Box>
  )
}

export default PoolTable