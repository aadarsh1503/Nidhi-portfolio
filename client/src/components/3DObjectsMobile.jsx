import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Section 0 — Hero: Icosahedron with two orbiting rings
export function MobileHero() {
  const groupRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.3
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.3
    ring1Ref.current.rotation.z = t * 0.5
    ring2Ref.current.rotation.x = t * 0.4
  })

  return (
    <group ref={groupRef}>
      {/* Core icosahedron */}
      <mesh>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial color="#2ecc71" wireframe />
      </mesh>
      {/* Solid inner glow */}
      <mesh>
        <icosahedronGeometry args={[1.0, 0]} />
        <meshBasicMaterial color="#16a085" transparent opacity={0.15} />
      </mesh>
      {/* Orbit ring 1 */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.2, 0.025, 8, 80]} />
        <meshBasicMaterial color="#2ecc71" />
      </mesh>
      {/* Orbit ring 2 */}
      <mesh ref={ring2Ref} rotation={[0, Math.PI / 4, Math.PI / 4]}>
        <torusGeometry args={[2.8, 0.02, 8, 80]} />
        <meshBasicMaterial color="#16a085" transparent opacity={0.6} />
      </mesh>
      {/* Orbiting dot on ring1 */}
      <OrbitingDot radius={2.2} speed={1.2} color="#2ecc71" tiltX={Math.PI / 3} />
      <OrbitingDot radius={2.8} speed={0.8} color="#16a085" tiltY={Math.PI / 4} tiltZ={Math.PI / 4} />
    </group>
  )
}

function OrbitingDot({ radius, speed, color, tiltX = 0, tiltY = 0, tiltZ = 0 }) {
  const ref = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed
    const x = Math.cos(t) * radius
    const y = Math.sin(t) * radius
    // Apply tilt manually
    const cosX = Math.cos(tiltX), sinX = Math.sin(tiltX)
    const cosZ = Math.cos(tiltZ), sinZ = Math.sin(tiltZ)
    ref.current.position.set(
      x * cosZ - y * sinX * sinZ,
      y * cosX,
      x * sinZ + y * sinX * cosZ
    )
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}

// Section 1 — About: Floating crystal cluster (octahedra)
export function MobileAbout() {
  const groupRef = useRef()

  const positions = useMemo(() => [
    [0, 0, 0],
    [1.4, 0.5, 0.3],
    [-1.2, 0.8, -0.2],
    [0.3, -1.3, 0.5],
    [-0.5, 1.5, 0.8],
    [1.0, -0.8, -1.0],
  ], [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.2
    groupRef.current.rotation.z = Math.sin(t * 0.15) * 0.15
  })

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh>
            <octahedronGeometry args={[0.35 + i * 0.05, 0]} />
            <meshBasicMaterial color={i % 2 === 0 ? '#2ecc71' : '#16a085'} wireframe />
          </mesh>
          <mesh>
            <octahedronGeometry args={[0.28 + i * 0.04, 0]} />
            <meshBasicMaterial color="#2ecc71" transparent opacity={0.1} />
          </mesh>
        </group>
      ))}
      {/* Connecting lines as thin cylinders */}
      <ConnectingLines positions={positions} />
    </group>
  )
}

function ConnectingLines({ positions }) {
  const lines = useMemo(() => {
    const result = []
    const pairs = [[0,1],[0,2],[0,3],[1,4],[2,5]]
    pairs.forEach(([a, b]) => {
      const pA = new THREE.Vector3(...positions[a])
      const pB = new THREE.Vector3(...positions[b])
      const mid = pA.clone().add(pB).multiplyScalar(0.5)
      const dist = pA.distanceTo(pB)
      const dir = pB.clone().sub(pA).normalize()
      const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)
      result.push({ mid, dist, quat })
    })
    return result
  }, [positions])

  return (
    <>
      {lines.map((l, i) => (
        <mesh key={i} position={l.mid} quaternion={l.quat}>
          <cylinderGeometry args={[0.008, 0.008, l.dist, 4]} />
          <meshBasicMaterial color="#2ecc71" transparent opacity={0.35} />
        </mesh>
      ))}
    </>
  )
}

// Section 2 — Education: Torus knot + stars
export function MobileEducation() {
  const knotRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    knotRef.current.rotation.x = t * 0.25
    knotRef.current.rotation.y = t * 0.18
  })

  return (
    <group>
      <mesh ref={knotRef}>
        <torusKnotGeometry args={[1.2, 0.2, 80, 12, 2, 3]} />
        <meshBasicMaterial color="#2ecc71" wireframe />
      </mesh>
      {/* Inner solid knot */}
      <mesh ref={knotRef}>
        <torusKnotGeometry args={[1.2, 0.12, 80, 12, 2, 3]} />
        <meshBasicMaterial color="#16a085" transparent opacity={0.12} />
      </mesh>
    </group>
  )
}

// Section 3 — Achievements: Spinning diamond (dodecahedron) with sparkles
export function MobileAchievements() {
  const groupRef = useRef()
  const innerRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.4
    groupRef.current.rotation.x = t * 0.15
    innerRef.current.rotation.y = -t * 0.6
  })

  const sparkles = useMemo(() => Array.from({ length: 12 }, (_, i) => {
    const phi = Math.acos(1 - 2 * (i + 0.5) / 12)
    const theta = Math.PI * (1 + Math.sqrt(5)) * i
    return {
      x: 2.5 * Math.sin(phi) * Math.cos(theta),
      y: 2.5 * Math.cos(phi),
      z: 2.5 * Math.sin(phi) * Math.sin(theta)
    }
  }), [])

  return (
    <group ref={groupRef}>
      <mesh>
        <dodecahedronGeometry args={[1.3, 0]} />
        <meshBasicMaterial color="#2ecc71" wireframe />
      </mesh>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.8, 0]} />
        <meshBasicMaterial color="#16a085" transparent opacity={0.2} />
      </mesh>
      {sparkles.map((s, i) => (
        <mesh key={i} position={[s.x, s.y, s.z]}>
          <octahedronGeometry args={[0.06, 0]} />
          <meshBasicMaterial color={i % 3 === 0 ? '#ffffff' : '#2ecc71'} />
        </mesh>
      ))}
    </group>
  )
}

// Section 4 — Skills: Morphing sphere with orbiting cubes
export function MobileSkills() {
  const sphereRef = useRef()
  const cubesRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    sphereRef.current.rotation.x = t * 0.3
    sphereRef.current.rotation.y = t * 0.2
    cubesRef.current.rotation.y = t * 0.35
    cubesRef.current.rotation.x = Math.sin(t * 0.2) * 0.2
  })

  const cubePositions = useMemo(() => Array.from({ length: 6 }, (_, i) => {
    const angle = (i / 6) * Math.PI * 2
    return [Math.cos(angle) * 2.4, Math.sin(angle * 0.5) * 0.6, Math.sin(angle) * 2.4]
  }), [])

  return (
    <group>
      {/* Central layered sphere */}
      <mesh ref={sphereRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial color="#2ecc71" wireframe />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.9, 8, 8]} />
        <meshBasicMaterial color="#16a085" transparent opacity={0.1} />
      </mesh>
      {/* Orbiting mini-cubes */}
      <group ref={cubesRef}>
        {cubePositions.map((pos, i) => (
          <mesh key={i} position={pos}>
            <boxGeometry args={[0.25, 0.25, 0.25]} />
            <meshBasicMaterial color={i % 2 === 0 ? '#2ecc71' : '#16a085'} wireframe />
          </mesh>
        ))}
      </group>
    </group>
  )
}

// Section 5 — Interests: Double helix of spheres (DNA-like but artistic)
export function MobileInterests() {
  const groupRef = useRef()

  const spiralPoints = useMemo(() => {
    const pts = []
    for (let i = 0; i < 24; i++) {
      const t = (i / 24) * Math.PI * 4
      const y = (i / 24) * 6 - 3
      pts.push({
        a: [Math.cos(t) * 1.5, y, Math.sin(t) * 1.5],
        b: [Math.cos(t + Math.PI) * 1.5, y, Math.sin(t + Math.PI) * 1.5],
        size: 0.08 + Math.sin(t) * 0.03
      })
    }
    return pts
  }, [])

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.25
  })

  return (
    <group ref={groupRef}>
      {spiralPoints.map((pt, i) => (
        <group key={i}>
          <mesh position={pt.a}>
            <sphereGeometry args={[pt.size, 7, 7]} />
            <meshBasicMaterial color="#2ecc71" transparent opacity={0.9} />
          </mesh>
          <mesh position={pt.b}>
            <sphereGeometry args={[pt.size, 7, 7]} />
            <meshBasicMaterial color="#16a085" transparent opacity={0.9} />
          </mesh>
          {/* Cross-link every 4th */}
          {i % 4 === 0 && (
            <CrossLink from={pt.a} to={pt.b} />
          )}
        </group>
      ))}
    </group>
  )
}

function CrossLink({ from, to }) {
  const mid = [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2, (from[2] + to[2]) / 2]
  const dir = new THREE.Vector3(to[0] - from[0], to[1] - from[1], to[2] - from[2])
  const len = dir.length()
  const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize())
  return (
    <mesh position={mid} quaternion={quat}>
      <cylinderGeometry args={[0.012, 0.012, len, 5]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.25} />
    </mesh>
  )
}
