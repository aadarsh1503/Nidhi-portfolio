import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// ─── MOBILE DNA: single tube pair only, no spheres, no cylinders, basicMaterial
export function DNAHelixMobile() {
  const groupRef = useRef()

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
  })

  const segments = 12
  const helixPoints = []
  for (let i = 0; i < segments; i++) {
    const t = (i / segments) * Math.PI * 6
    const y = (i / segments) * 10 - 5
    helixPoints.push({
      x1: Math.cos(t) * 1.2, z1: Math.sin(t) * 1.2,
      x2: Math.cos(t + Math.PI) * 1.2, z2: Math.sin(t + Math.PI) * 1.2,
      y
    })
  }

  const curve1 = new THREE.CatmullRomCurve3(helixPoints.map(p => new THREE.Vector3(p.x1, p.y, p.z1)))
  const curve2 = new THREE.CatmullRomCurve3(helixPoints.map(p => new THREE.Vector3(p.x2, p.y, p.z2)))

  return (
    <group ref={groupRef}>
      <mesh>
        <tubeGeometry args={[curve1, 20, 0.04, 4, false]} />
        <meshBasicMaterial color="#2ecc71" />
      </mesh>
      <mesh>
        <tubeGeometry args={[curve2, 20, 0.04, 4, false]} />
        <meshBasicMaterial color="#16a085" />
      </mesh>
    </group>
  )
}

// ─── DESKTOP DNA: full quality
export function DNAHelix() {
  const groupRef = useRef()

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.3
  })

  const helixPoints = []
  for (let i = 0; i < 60; i++) {
    const t = (i / 60) * Math.PI * 8
    const y = (i / 60) * 12 - 6
    helixPoints.push({
      x1: Math.cos(t) * 1.2, z1: Math.sin(t) * 1.2,
      x2: Math.cos(t + Math.PI) * 1.2, z2: Math.sin(t + Math.PI) * 1.2,
      y
    })
  }

  const curve1 = new THREE.CatmullRomCurve3(helixPoints.map(p => new THREE.Vector3(p.x1, p.y, p.z1)))
  const curve2 = new THREE.CatmullRomCurve3(helixPoints.map(p => new THREE.Vector3(p.x2, p.y, p.z2)))

  return (
    <group ref={groupRef}>
      <mesh>
        <tubeGeometry args={[curve1, 100, 0.03, 8, false]} />
        <meshStandardMaterial color="#2ecc71" emissive="#2ecc71" emissiveIntensity={0.4} />
      </mesh>
      <mesh>
        <tubeGeometry args={[curve2, 100, 0.03, 8, false]} />
        <meshStandardMaterial color="#16a085" emissive="#16a085" emissiveIntensity={0.4} />
      </mesh>
      {helixPoints.map((p, i) => (
        <group key={i}>
          <mesh position={[p.x1, p.y, p.z1]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#2ecc71" emissive="#2ecc71" emissiveIntensity={0.6} metalness={0.5} roughness={0.2} />
          </mesh>
          <mesh position={[p.x2, p.y, p.z2]}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#16a085" emissive="#16a085" emissiveIntensity={0.6} metalness={0.5} roughness={0.2} />
          </mesh>
          {i % 3 === 0 && (
            <mesh
              position={[(p.x1 + p.x2) / 2, p.y, (p.z1 + p.z2) / 2]}
              rotation={[0, Math.atan2(p.z2 - p.z1, p.x2 - p.x1), Math.PI / 2]}
            >
              <cylinderGeometry args={[0.02, 0.02, Math.sqrt((p.x2 - p.x1) ** 2 + (p.z2 - p.z1) ** 2), 8]} />
              <meshStandardMaterial color="#27ae60" emissive="#27ae60" emissiveIntensity={0.3} transparent opacity={0.6} />
            </mesh>
          )}
        </group>
      ))}
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#2ecc71" distance={8} />
      <pointLight position={[0, -3, 0]} intensity={0.5} color="#16a085" distance={8} />
    </group>
  )
}

// ─── MOBILE PARTICLES: single merged point cloud, basicMaterial
export function ParticlesMobile({ count = 60 }) {
  const points = useRef()
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14
      const c = new THREE.Color(i % 2 === 0 ? '#2ecc71' : '#16a085')
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b
    }
    return { positions: pos, colors: col }
  }, [count])

  useFrame((state) => {
    points.current.rotation.y = state.clock.getElapsedTime() * 0.02
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} vertexColors transparent opacity={0.7} />
    </points>
  )
}

// ─── DESKTOP PARTICLES
export function Particles({ count = 500 }) {
  const points = useRef()
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
      const c = new THREE.Color(i % 2 === 0 ? '#2ecc71' : '#16a085')
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b
    }
    return { positions: pos, colors: col }
  }, [count])

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

// ─── MOBILE NEURAL: just 5 spinning dots, basicMaterial
export function NeuralNetworkMobile() {
  const groupRef = useRef()
  const nodes = useMemo(() => Array.from({ length: 5 }, () => ({
    x: (Math.random() - 0.5) * 6,
    y: (Math.random() - 0.5) * 6,
    z: (Math.random() - 0.5) * 6
  })), [])

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
  })

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={[node.x, node.y, node.z]}>
          <sphereGeometry args={[0.12, 5, 5]} />
          <meshBasicMaterial color="#2ecc71" />
        </mesh>
      ))}
    </group>
  )
}

// ─── DESKTOP NEURAL
export function NeuralNetwork() {
  const groupRef = useRef()
  const nodes = useMemo(() => Array.from({ length: 20 }, () => ({
    x: (Math.random() - 0.5) * 8,
    y: (Math.random() - 0.5) * 8,
    z: (Math.random() - 0.5) * 8
  })), [])

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
  })

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={[node.x, node.y, node.z]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#2ecc71" emissive="#2ecc71" emissiveIntensity={0.6} />
        </mesh>
      ))}
    </group>
  )
}

// ─── MOBILE GALAXY: 300 points, basicMaterial
export function GalaxyMobile() {
  const points = useRef()
  const count = 300
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 4
      const angle = Math.random() * Math.PI * 2
      pos[i * 3] = Math.cos(angle + r * 4) * r
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1.5
      pos[i * 3 + 2] = Math.sin(angle + r * 4) * r
      const c = new THREE.Color()
      c.setHSL(0.3 + Math.random() * 0.1, 0.7, 0.5)
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b
    }
    return { positions: pos, colors: col }
  }, [])

  useFrame((state) => {
    points.current.rotation.y = state.clock.getElapsedTime() * 0.04
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.8} />
    </points>
  )
}

// ─── DESKTOP GALAXY
export function Galaxy() {
  const points = useRef()
  const count = 3000
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 5
      const angle = Math.random() * Math.PI * 2
      pos[i * 3] = Math.cos(angle + r * 5) * r
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2
      pos[i * 3 + 2] = Math.sin(angle + r * 5) * r
      const c = new THREE.Color()
      c.setHSL(0.3 + Math.random() * 0.1, 0.7, 0.5)
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b
    }
    return { positions: pos, colors: col }
  }, [])

  useFrame((state) => {
    points.current.rotation.y = state.clock.getElapsedTime() * 0.05
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} vertexColors transparent opacity={0.8} />
    </points>
  )
}

// ─── MOBILE ORB: low-poly icosphere, basicMaterial wireframe
export function GlowingOrbMobile() {
  const meshRef = useRef()

  useFrame((state) => {
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 8, 8]} />
      <meshBasicMaterial color="#2ecc71" wireframe />
    </mesh>
  )
}

// ─── DESKTOP ORB
export function GlowingOrb() {
  const meshRef = useRef()

  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <MeshDistortMaterial color="#2ecc71" distort={0.3} speed={1.5} roughness={0} metalness={0.8} />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={2} color="#2ecc71" distance={5} />
    </Float>
  )
}
