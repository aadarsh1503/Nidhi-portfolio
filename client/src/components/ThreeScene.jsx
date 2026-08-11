import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Stars, Float } from '@react-three/drei'
import { DNAHelix, Particles, NeuralNetwork, Galaxy, GlowingOrb } from './3DObjects'

function Scene({ section, mobile }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      {!mobile && <pointLight position={[-10, -10, -10]} intensity={0.3} color="#2ecc71" />}

      {section === 0 && (
        <>
          <DNAHelix mobile={mobile} />
          <Particles count={mobile ? 80 : 300} />
        </>
      )}

      {section === 1 && (
        <>
          <GlowingOrb mobile={mobile} />
          <Particles count={mobile ? 60 : 200} />
        </>
      )}

      {section === 2 && (
        <>
          <GlowingOrb mobile={mobile} />
          <Stars radius={50} depth={50} count={mobile ? 800 : 3000} factor={4} fade speed={1} />
        </>
      )}

      {section === 3 && <Galaxy mobile={mobile} />}

      {section === 4 && (
        <>
          <NeuralNetwork mobile={mobile} />
          <Particles count={mobile ? 100 : 400} />
        </>
      )}

      {section === 5 && (
        <>
          <Float speed={1.5} rotationIntensity={0.5}>
            <mesh>
              <torusGeometry args={[2, 0.5, mobile ? 8 : 16, mobile ? 40 : 100]} />
              <meshStandardMaterial color="#2ecc71" wireframe />
            </mesh>
          </Float>
          <Particles count={mobile ? 80 : 300} />
        </>
      )}

      <Environment preset="night" />
    </>
  )
}

export default function ThreeScene({ currentSection, isMobile }) {
  return (
    <div className="three-bg">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        // Mobile: lower DPR = fewer pixels to render, no AA = faster
        dpr={isMobile ? [0.75, 1] : [1, 2]}
        performance={{ min: isMobile ? 0.3 : 0.5, max: isMobile ? 0.5 : 1 }}
        gl={{ antialias: !isMobile, powerPreference: 'low-power' }}
      >
        <Suspense fallback={null}>
          <Scene section={currentSection} mobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  )
}
