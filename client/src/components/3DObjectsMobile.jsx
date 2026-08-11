import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

const GREEN = '#2ecc71'
const TEAL = '#16a085'
const WHITE = '#ffffff'

// ─── Shared glowing material helper
function GlowMesh({ geometry, color = GREEN, emissiveIntensity = 0.8, opacity = 1, metalness = 0.4, roughness = 0.1, ...props }) {
  return (
    <mesh {...props}>
      {geometry}
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={emissiveIntensity}
        metalness={metalness}
        roughness={roughness}
        transparent={opacity < 1}
        opacity={opacity}
      />
    </mesh>
  )
}

// ─── Section 0 — Hero: Glowing distorted orb with two luminous orbital rings + orbiting spheres
export function MobileHero() {
  const orbRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const dot1Ref = useRef()
  const dot2Ref = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    orbRef.current.rotation.y = t * 0.2
    orbRef.current.rotation.x = t * 0.1
    ring1Ref.current.rotation.z = t * 0.6
    ring2Ref.current.rotation.x = t * 0.45

    // orbit dot 1 on ring1 plane
    dot1Ref.current.position.set(
      Math.cos(t * 1.1) * 2.0,
      Math.sin(t * 1.1) * 2.0 * Math.sin(Math.PI / 3),
      Math.sin(t * 1.1) * 2.0 * Math.cos(Math.PI / 3)
    )
    // orbit dot 2 on ring2 plane
    dot2Ref.current.position.set(
      Math.cos(-t * 0.75 + 1) * 2.7,
      Math.sin(-t * 0.75 + 1) * 2.7 * 0.5,
      Math.sin(-t * 0.75 + 1) * 2.7 * 0.866
    )
  })

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 3]} intensity={3} color={GREEN} distance={10} />
      <pointLight position={[3, 2, -2]} intensity={1.5} color={TEAL} distance={10} />

      {/* Glowing distorted core */}
      <Float speed={1.5} floatIntensity={0.4} rotationIntensity={0.2}>
        <mesh ref={orbRef}>
          <sphereGeometry args={[1.1, 32, 32]} />
          <MeshDistortMaterial
            color={GREEN}
            emissive={GREEN}
            emissiveIntensity={0.6}
            distort={0.35}
            speed={1.8}
            metalness={0.5}
            roughness={0.05}
            transparent
            opacity={0.92}
          />
        </mesh>
        {/* Inner glow layer */}
        <mesh>
          <sphereGeometry args={[0.75, 16, 16]} />
          <meshStandardMaterial color={WHITE} emissive={GREEN} emissiveIntensity={1.2} transparent opacity={0.18} />
        </mesh>
      </Float>

      {/* Ring 1 */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.0, 0.022, 16, 100]} />
        <meshStandardMaterial color={GREEN} emissive={GREEN} emissiveIntensity={1.0} />
      </mesh>

      {/* Ring 2 */}
      <mesh ref={ring2Ref} rotation={[0.3, Math.PI / 5, Math.PI / 3]}>
        <torusGeometry args={[2.7, 0.016, 16, 100]} />
        <meshStandardMaterial color={TEAL} emissive={TEAL} emissiveIntensity={0.8} transparent opacity={0.7} />
      </mesh>

      {/* Orbiting glow spheres */}
      <mesh ref={dot1Ref}>
        <sphereGeometry args={[0.14, 12, 12]} />
        <meshStandardMaterial color={WHITE} emissive={GREEN} emissiveIntensity={2} />
      </mesh>
      <mesh ref={dot2Ref}>
        <sphereGeometry args={[0.10, 10, 10]} />
        <meshStandardMaterial color={WHITE} emissive={TEAL} emissiveIntensity={2} />
      </mesh>
    </>
  )
}

// ─── Section 1 — About: Floating glowing crystal cluster
export function MobileAbout() {
  const groupRef = useRef()
  const matsRef = useRef([])

  const crystals = useMemo(() => [
    { pos: [0, 0, 0], scale: 0.55, color: GREEN },
    { pos: [1.3, 0.4, 0.2], scale: 0.38, color: TEAL },
    { pos: [-1.1, 0.7, -0.3], scale: 0.42, color: GREEN },
    { pos: [0.2, -1.2, 0.4], scale: 0.35, color: TEAL },
    { pos: [-0.4, 1.4, 0.6], scale: 0.30, color: WHITE },
    { pos: [0.9, -0.7, -0.9], scale: 0.32, color: GREEN },
  ], [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.18
    groupRef.current.rotation.z = Math.sin(t * 0.12) * 0.12
    // pulse emissive
    matsRef.current.forEach((m, i) => {
      if (m) m.emissiveIntensity = 0.6 + Math.sin(t * 1.5 + i * 1.2) * 0.4
    })
  })

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 2, 2]} intensity={2.5} color={GREEN} distance={10} />
      <pointLight position={[-2, -1, 1]} intensity={1.5} color={TEAL} distance={8} />

      <group ref={groupRef}>
        {crystals.map((c, i) => (
          <group key={i} position={c.pos}>
            <mesh>
              <octahedronGeometry args={[c.scale, 0]} />
              <meshStandardMaterial
                ref={el => matsRef.current[i] = el}
                color={c.color}
                emissive={c.color}
                emissiveIntensity={0.7}
                metalness={0.6}
                roughness={0.05}
                transparent
                opacity={0.9}
              />
            </mesh>
            {/* outer glow shell */}
            <mesh>
              <octahedronGeometry args={[c.scale * 1.3, 0]} />
              <meshStandardMaterial color={c.color} emissive={c.color} emissiveIntensity={0.2} transparent opacity={0.12} />
            </mesh>
          </group>
        ))}
        <ConnectingLines positions={crystals.map(c => c.pos)} />
      </group>
    </>
  )
}

function ConnectingLines({ positions }) {
  const lines = useMemo(() => {
    const result = []
    const pairs = [[0,1],[0,2],[0,3],[1,4],[2,5],[3,5]]
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
          <cylinderGeometry args={[0.006, 0.006, l.dist, 5]} />
          <meshStandardMaterial color={GREEN} emissive={GREEN} emissiveIntensity={0.5} transparent opacity={0.4} />
        </mesh>
      ))}
    </>
  )
}

// ─── Section 2 — Education: Glowing torus knot
export function MobileEducation() {
  const knotRef = useRef()
  const matRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    knotRef.current.rotation.x = t * 0.22
    knotRef.current.rotation.y = t * 0.16
    if (matRef.current) {
      matRef.current.emissiveIntensity = 0.7 + Math.sin(t * 0.9) * 0.3
    }
  })

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 4]} intensity={3} color={GREEN} distance={12} />
      <pointLight position={[-3, 2, -1]} intensity={1.5} color={TEAL} distance={10} />

      <group ref={knotRef}>
        {/* Main glowing knot */}
        <mesh>
          <torusKnotGeometry args={[1.1, 0.28, 120, 18, 2, 3]} />
          <meshStandardMaterial
            ref={matRef}
            color={GREEN}
            emissive={GREEN}
            emissiveIntensity={0.8}
            metalness={0.3}
            roughness={0.05}
          />
        </mesh>
        {/* Outer transparent shell */}
        <mesh>
          <torusKnotGeometry args={[1.1, 0.38, 120, 18, 2, 3]} />
          <meshStandardMaterial color={TEAL} emissive={TEAL} emissiveIntensity={0.3} transparent opacity={0.12} metalness={0.1} roughness={0.2} />
        </mesh>
      </group>
    </>
  )
}

// ─── Section 3 — Achievements: Gem — layered glowing icosahedron
export function MobileAchievements() {
  const outerRef = useRef()
  const midRef = useRef()
  const innerRef = useRef()
  const lightRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    outerRef.current.rotation.y = t * 0.28
    outerRef.current.rotation.x = t * 0.12
    midRef.current.rotation.y = -t * 0.4
    midRef.current.rotation.z = t * 0.1
    innerRef.current.rotation.y = t * 0.6
    // pulsing light
    if (lightRef.current) {
      lightRef.current.intensity = 2.5 + Math.sin(t * 1.4) * 1.0
    }
  })

  // floating sparkle positions on a sphere
  const sparkles = useMemo(() => Array.from({ length: 10 }, (_, i) => {
    const phi = Math.acos(1 - 2 * (i + 0.5) / 10)
    const theta = Math.PI * (1 + Math.sqrt(5)) * i
    return [2.8 * Math.sin(phi) * Math.cos(theta), 2.8 * Math.cos(phi), 2.8 * Math.sin(phi) * Math.sin(theta)]
  }), [])

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight ref={lightRef} position={[0, 0, 0]} intensity={3} color={GREEN} distance={10} />
      <pointLight position={[3, 3, 2]} intensity={1.2} color={WHITE} distance={12} />

      {/* Outer cage */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshStandardMaterial color={GREEN} emissive={GREEN} emissiveIntensity={0.35} metalness={0.8} roughness={0.05} transparent opacity={0.18} />
      </mesh>

      {/* Mid gem */}
      <mesh ref={midRef}>
        <dodecahedronGeometry args={[1.1, 0]} />
        <meshStandardMaterial color={GREEN} emissive={GREEN} emissiveIntensity={0.7} metalness={0.9} roughness={0.02} transparent opacity={0.75} />
      </mesh>

      {/* Inner bright core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial color={WHITE} emissive={GREEN} emissiveIntensity={2.5} metalness={1} roughness={0} />
      </mesh>

      {/* Sparkle points */}
      {sparkles.map((pos, i) => (
        <SparklePoint key={i} position={pos} delay={i * 0.6} />
      ))}
    </>
  )
}

function SparklePoint({ position, delay }) {
  const ref = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime() + delay
    if (ref.current) ref.current.material.emissiveIntensity = 1.0 + Math.sin(t * 2.5) * 0.8
    ref.current.scale.setScalar(0.7 + Math.sin(t * 2.5) * 0.3)
  })
  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.07, 0]} />
      <meshStandardMaterial color={WHITE} emissive={GREEN} emissiveIntensity={1.5} />
    </mesh>
  )
}

// ─── Section 4 — Skills: Glowing plasma sphere with orbiting rings
export function MobileSkills() {
  const orbRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const ring3Ref = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (orbRef.current) {
      orbRef.current.rotation.y = t * 0.3
      orbRef.current.rotation.x = t * 0.15
    }
    ring1Ref.current.rotation.z = t * 0.7
    ring2Ref.current.rotation.x = t * 0.5
    ring3Ref.current.rotation.y = t * 0.4
    ring3Ref.current.rotation.z = t * 0.2
  })

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 3]} intensity={3} color={GREEN} distance={10} />
      <pointLight position={[-3, -2, 2]} intensity={1.5} color={TEAL} distance={10} />

      {/* Core plasma */}
      <Float speed={2} floatIntensity={0.3} rotationIntensity={0.1}>
        <mesh ref={orbRef}>
          <sphereGeometry args={[1.0, 32, 32]} />
          <MeshDistortMaterial
            color={TEAL}
            emissive={GREEN}
            emissiveIntensity={0.9}
            distort={0.45}
            speed={2.5}
            metalness={0.2}
            roughness={0.0}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Inner bright core */}
        <mesh>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshStandardMaterial color={WHITE} emissive={GREEN} emissiveIntensity={2.0} transparent opacity={0.4} />
        </mesh>
      </Float>

      {/* Three glowing rings at different angles */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.0, 0.025, 16, 100]} />
        <meshStandardMaterial color={GREEN} emissive={GREEN} emissiveIntensity={1.2} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.3, 0.018, 16, 100]} />
        <meshStandardMaterial color={TEAL} emissive={TEAL} emissiveIntensity={0.9} transparent opacity={0.75} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[Math.PI / 4, Math.PI / 3, 0]}>
        <torusGeometry args={[2.6, 0.014, 16, 100]} />
        <meshStandardMaterial color={WHITE} emissive={GREEN} emissiveIntensity={0.6} transparent opacity={0.45} />
      </mesh>
    </>
  )
}

// ─── Section 5 — Interests: Glowing double helix with real emissive spheres
export function MobileInterests() {
  const groupRef = useRef()
  const matsA = useRef([])
  const matsB = useRef([])

  const points = useMemo(() => {
    const pts = []
    const count = 20
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 4
      const y = (i / count) * 5.5 - 2.75
      pts.push({ t, y, size: 0.11 + Math.sin(t) * 0.03 })
    }
    return pts
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.22
    // wave pulse along helix
    matsA.current.forEach((m, i) => {
      if (m) m.emissiveIntensity = 0.7 + Math.sin(t * 2 - i * 0.5) * 0.5
    })
    matsB.current.forEach((m, i) => {
      if (m) m.emissiveIntensity = 0.7 + Math.sin(t * 2 - i * 0.5 + Math.PI) * 0.5
    })
  })

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 3, 3]} intensity={2.5} color={GREEN} distance={12} />
      <pointLight position={[0, -3, -2]} intensity={1.5} color={TEAL} distance={10} />

      <group ref={groupRef}>
        {points.map((p, i) => {
          const ax = Math.cos(p.t) * 1.3
          const az = Math.sin(p.t) * 1.3
          const bx = Math.cos(p.t + Math.PI) * 1.3
          const bz = Math.sin(p.t + Math.PI) * 1.3

          return (
            <group key={i}>
              <mesh position={[ax, p.y, az]}>
                <sphereGeometry args={[p.size, 12, 12]} />
                <meshStandardMaterial
                  ref={el => matsA.current[i] = el}
                  color={GREEN}
                  emissive={GREEN}
                  emissiveIntensity={0.8}
                  metalness={0.3}
                  roughness={0.1}
                />
              </mesh>
              <mesh position={[bx, p.y, bz]}>
                <sphereGeometry args={[p.size, 12, 12]} />
                <meshStandardMaterial
                  ref={el => matsB.current[i] = el}
                  color={TEAL}
                  emissive={TEAL}
                  emissiveIntensity={0.8}
                  metalness={0.3}
                  roughness={0.1}
                />
              </mesh>
              {/* Cross-link every 3rd */}
              {i % 3 === 0 && (
                <HelixLink from={[ax, p.y, az]} to={[bx, p.y, bz]} />
              )}
            </group>
          )
        })}
      </group>
    </>
  )
}

function HelixLink({ from, to }) {
  const mid = useMemo(() => [
    (from[0] + to[0]) / 2,
    (from[1] + to[1]) / 2,
    (from[2] + to[2]) / 2,
  ], [from, to])

  const { dist, quat } = useMemo(() => {
    const dir = new THREE.Vector3(to[0] - from[0], to[1] - from[1], to[2] - from[2])
    const d = dir.length()
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize())
    return { dist: d, quat: q }
  }, [from, to])

  return (
    <mesh position={mid} quaternion={quat}>
      <cylinderGeometry args={[0.015, 0.015, dist, 6]} />
      <meshStandardMaterial color={WHITE} emissive={GREEN} emissiveIntensity={0.5} transparent opacity={0.45} />
    </mesh>
  )
}
