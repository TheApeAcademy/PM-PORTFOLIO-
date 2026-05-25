import { useRef, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, AdaptiveDpr } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Vector2 } from 'three'
import * as THREE from 'three'
import Blob from './Blob'

const ABERRATION_OFFSET = new Vector2(0.0006, 0.0006)

function DynamicMouseLight() {
  const lightRef = useRef<THREE.PointLight>(null)
  useThree()
  const mousePos = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  useFrame(() => {
    if (!lightRef.current) return
    current.current.x += (mousePos.current.x - current.current.x) * 0.08
    current.current.y += (mousePos.current.y - current.current.y) * 0.08
    lightRef.current.position.x = current.current.x
    lightRef.current.position.y = current.current.y
  })

  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', (e: MouseEvent) => {
      mousePos.current.x = ((e.clientX / window.innerWidth) * 2 - 1) * 4
      mousePos.current.y = (-(e.clientY / window.innerHeight) * 2 + 1) * 3
    }, { passive: true })
  }

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, 4]}
      intensity={2.5}
      color="#88aaff"
      distance={12}
    />
  )
}

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
          <ambientLight intensity={0.18} color="#ddeeff" />
          <pointLight position={[5, 5, 5]} intensity={1.2} color="#1155ff" />
          <pointLight position={[-5, -2, 4]} intensity={1.8} color="#3377ff" />
          <pointLight position={[2, -4, 3]} intensity={0.9} color="#0033cc" />
          <DynamicMouseLight />
          <Environment preset="city" />
          <Blob />
        </Suspense>
        <EffectComposer>
          <Bloom
            mipmapBlur
            luminanceThreshold={0.7}
            intensity={0.9}
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
