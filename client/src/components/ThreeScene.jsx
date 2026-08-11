import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Stars, Float } from '@react-three/drei'
import {
  DNAHelix, DNAHelixMobile,
  Particles, ParticlesMobile,
  NeuralNetwork, NeuralNetworkMobile,
  Galaxy, GalaxyMobile,
  GlowingOrb, GlowingOrbMobile
} from './3DObjects'

function MobileScene({ section }) {
  return (
    <>
      <ambientLight intensity={0.5} />

      {section === 0 && (
        <>
          <DNAHelixMobile />
          <ParticlesMobile count={50} />
        </>
      )}
      {section === 1 && <GlowingOrbMobile />}
      {section === 2 && (
        <>
          <GlowingOrbMobile />
          <Stars radius={40} depth={30} count={400} factor={3} fade speed={0.5} />
        </>
      )}
      {section === 3 && <GalaxyMobile />}
      {section === 4 && (
        <>
          <NeuralNetworkMobile />
          <ParticlesMobile count={50} />
        </>
      )}
      {section === 5 && (
        <mesh>
          <torusGeometry args={[2, 0.5, 6, 24]} />
          <meshBasicMaterial color="#2ecc71" wireframe />
        </mesh>
      )}
    </>
  )
}

function DesktopScene({ section }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#2ecc71" />

      {section === 0 && (
        <>
          <DNAHelix />
          <Particles count={300} />
        </>
      )}
      {section === 1 && (
        <>
          <GlowingOrb />
          <Particles count={200} />
        </>
      )}
      {section === 2 && (
        <>
          <GlowingOrb />
          <Stars radius={50} depth={50} count={3000} factor={4} fade speed={1} />
        </>
      )}
      {section === 3 && <Galaxy />}
      {section === 4 && (
        <>
          <NeuralNetwork />
          <Particles count={400} />
        </>
      )}
      {section === 5 && (
        <>
          <Float speed={1.5} rotationIntensity={0.5}>
            <mesh>
              <torusGeometry args={[2, 0.5, 16, 100]} />
              <meshStandardMaterial color="#2ecc71" wireframe />
            </mesh>
          </Float>
          <Particles count={300} />
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
        dpr={isMobile ? 0.75 : [1, 2]}
        gl={{
          antialias: false,
          powerPreference: isMobile ? 'low-power' : 'high-performance',
          depth: true,
          stencil: false,
          alpha: false
        }}
        performance={{ min: isMobile ? 0.2 : 0.5 }}
      >
        <Suspense fallback={null}>
          {isMobile
            ? <MobileScene section={currentSection} />
            : <DesktopScene section={currentSection} />
          }
        </Suspense>
      </Canvas>
    </div>
  )
}
