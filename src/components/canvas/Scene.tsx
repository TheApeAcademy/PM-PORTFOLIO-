import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, AdaptiveDpr } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Vector2 } from 'three'
import Blob from './Blob'

const ABERRATION_OFFSET = new Vector2(0.0006, 0.0006)

export default function Scene() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <pointLight position={[4, 4, 4]} intensity={4} color="#0071E3" />
          <pointLight position={[-4, -4, 3]} intensity={2} color="#40a0ff" />
          <pointLight position={[0, 0, 3]} intensity={2} color="#ffffff" />
          <Environment preset="city" />
          <Blob />
        </Suspense>
        <EffectComposer>
          <Bloom
            mipmapBlur
            luminanceThreshold={0.05}
            luminanceSmoothing={0.9}
            intensity={1.5}
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={ABERRATION_OFFSET}
          />
        </EffectComposer>
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  )
}
