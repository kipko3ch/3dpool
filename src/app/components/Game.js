import React, { useRef, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import io from 'socket.io-client'
import PoolTable from './PoolTable'
import PoolBall from './PoolBall'
import Cue from './Cue'

const Game = () => {
  const [ballPositions, setBallPositions] = useState([
    [0, 0.5, 0],
    [-1, 0.5, -0.5],
    [-1, 0.5, 0.5],
    [-2, 0.5, -1],
    [-2, 0.5, 0],
    [-2, 0.5, 1],
  ])

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL)

    socket.on('connect', () => {
      console.log('Connected to server')
    })

    socket.on('ballMoved', (data) => {
      setBallPositions((prevPositions) => {
        const newPositions = [...prevPositions]
        newPositions[data.index] = data.position
        return newPositions
      })
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const handleBallClick = (index) => {
    const newPosition = [
      Math.random() * 8 - 4,
      0.5,
      Math.random() * 4 - 2
    ]
    setBallPositions((prevPositions) => {
      const newPositions = [...prevPositions]
      newPositions[index] = newPosition
      return newPositions
    })
    socket.emit('moveBall', { index, position: newPosition })
  }

  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <PoolTable />
      {ballPositions.map((position, index) => (
        <PoolBall key={index} position={position} onClick={() => handleBallClick(index)} />
      ))}
      <Cue position={[0, 0.5, 2]} />
      <OrbitControls />
    </Canvas>
  )
}

export default Game