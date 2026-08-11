import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// DNA Helix — reduced segments on mobile
export function DNAHelix({ mobile = false }) {
  const groupRef = useRef()
  const segments = mobile ? 20 : 60
  
  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.3
  })

  const helixPoints = []
  for (let i = 0; i < segments; i++) {
    const t = (i / segments) * Math.PI * 8
    const y = (i / segments) * 12 - 6
    const radius = 1.2
    helixPoints.push({
      x1: Math.cos(t) * radius, z1: Math.sin(t) * radius,
      x2: Math.cos(t + Math.PI) * radius, z2: Math.sin(t + Math.PI) * radius,
      y
    })
  }

  const curve1 = new THREE.CatmullRomCurve3(helixPoints.map(p => new THREE.Vector3(p.x1, p.y, p.z1)))
  const curve2 = new THREE.CatmullRomCurve3(helixPoints.map(p => new THREE.Vector3(p.x2, p.y, p.z2)))
  const tubeSegs = mobile ? 40 : 100
  const sphereSegs = mobile ? 6 : 16
  const cylSegs = mobile ? 4 : 8

  return (
    <group ref={groupRef}>
      <mesh>
        <tubeGeometry args={[curve1, tubeSegs, 0.03, 6, false]} />
        <meshStandardMaterial color="#2ecc71" emissive="#2ecc71" emissiveIntensity={0.4} />
      </mesh>
      <mesh>
        <tubeGeometry args={[curve2, tubeSegs, 0.03, 6, false]} />
        <meshStandardMaterial color="#16a085" emissive="#16a085" emissiveIntensity={0.4} />
      </mesh>

      {helixPoints.map((p, i) => (
        <group key={i}>
          <mesh position={[p.x1, p.y, p.z1]}>
            <sphereGeometry args={[0.12, sphereSegs, sphereSegs]} />
            <meshStandardMaterial color="#2ecc71" emissive="#2ecc71" emissiveIntensity={0.6} metalness={0.5} roughness={0.2} />
          </mesh>
          <mesh position={[p.x2, p.y, p.z2]}>
            <sphereGeometry args={[0.12, sphereSegs, sphereSegs]} />
            <meshStandardMaterial color="#16a085" emissive="#16a085" emissiveIntensity={0.6} metalness={0.5} roughness={0.2} />
          </mesh>
          {i % (mobile ? 5 : 3) === 0 && (
            <mesh
              position={[(p.x1 + p.x2) / 2, p.y, (p.z1 + p.z2) / 2]}
              rotation={[0, Math.atan2(p.z2 - p.z1, p.x2 - p.x1), Math.PI / 2]}
            >
              <cylinderGeometry args={[0.02, 0.02, Math.sqrt((p.x2-p.x1)**2 + (p.z2-p.z1)**2), cylSegs]} />
              <meshStandardMaterial color="#27ae60" emissive="#27ae60" emissiveIntensity={0.3} transparent opacity={0.6} />
            </mesh>
          )}
        </group>
      ))}
      
      {!mobile && (
        <>
          <pointLight position={[0, 3, 0]} intensity={0.5} color="#2ecc71" distance={8} />
          <pointLight position={[0, -3, 0]} intensity={0.5} color="#16a085" distance={8} />
        </>
      )}
    </group>
  )
}

// Particles — fewer on mobile
export function Particles({ count = 500 }) {
  const points = useRef()
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    const color = new THREE.Color(i % 2 === 0 ? "#2ecc71" : "#16a085")
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  useFrame((state) => {
    points.current.rotation.x = state.clock.getElapsedTime() * 0.02
    points.current.rotation.y = state.clock.getElapsedTime() * 0.03
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.8} />
    </points>
  )
}

// Neural Network — fewer nodes on mobile
export function NeuralNetwork({ mobile = false }) {
  const groupRef = useRef()
  const nodeCount = mobile ? 8 : 20
  const nodes = []
  
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: (Math.random() - 0.5) * 8,
      y: (Math.random() - 0.5) * 8,
      z: (Math.random() - 0.5) * 8
    })
  }

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
  })

  const segs = mobile ? 6 : 12

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={[node.x, node.y, node.z]}>
          <sphereGeometry args={[0.08, segs, segs]} />
          <meshStandardMaterial color="#2ecc71" emissive="#2ecc71" emissiveIntensity={0.6} />
        </mesh>
      ))}
    </group>
  )
}

// Galaxy — fewer points on mobile
export function Galaxy({ mobile = false }) {
  const points = useRef()
  const count = mobile ? 800 : 3000
  
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  
  for (let i = 0; i < count; i++) {
    const radius = Math.random() * 5
    const spinAngle = radius * 5
    const angle = Math.random() * Math.PI * 2
    positions[i * 3] = Math.cos(angle + spinAngle) * radius
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2
    positions[i * 3 + 2] = Math.sin(angle + spinAngle) * radius
    const color = new THREE.Color()
    color.setHSL(0.3 + Math.random() * 0.1, 0.7, 0.5)
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  useFrame((state) => {
    points.current.rotation.y = state.clock.getElapsedTime() * 0.05
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={mobile ? 0.04 : 0.02} vertexColors transparent opacity={0.8} />
    </points>
  )
}

// Glowing Orb — lower poly on mobile
export function GlowingOrb({ mobile = false }) {
  const meshRef = useRef()
  const segs = mobile ? 16 : 32
  
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, segs, segs]} />
        <MeshDistortMaterial
          color="#2ecc71"
          distort={mobile ? 0.2 : 0.3}
          speed={mobile ? 1 : 1.5}
          roughness={0}
          metalness={0.8}
        />
      </mesh>
      {!mobile && <pointLight position={[0, 0, 0]} intensity={2} color="#2ecc71" distance={5} />}
    </Float>
  )
}
