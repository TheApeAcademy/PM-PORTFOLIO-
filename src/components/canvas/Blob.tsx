import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lerpVal = (a: number, b: number, t: number) => a + (b - a) * t

export default function Blob() {
  const groupRef = useRef<THREE.Group>(null)
  const matRef = useRef<any>(null)
  const proxy = useRef({ posX: 0, posY: 0, scale: 1.0, distort: 0.4 })
  const mouseTarget = useRef({ x: 0, y: 0 })
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseTarget.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
        },
      })
      // Phase 1 (0–40% of scroll): blob grows and drifts left into mid-page
      tl.to(proxy.current, {
        posX: -1.8,
        posY: 0.4,
        scale: 1.6,
        distort: 0.55,
        ease: 'none',
        duration: 0.4,
      })
      // Phase 2 (40–100% of scroll): blob shrinks and drifts right toward footer
      tl.to(proxy.current, {
        posX: 1.4,
        posY: -0.4,
        scale: 0.75,
        distort: 0.28,
        ease: 'none',
        duration: 0.6,
      })
    })

    return () => {
      window.removeEventListener('mousemove', onMouse)
      ctx.revert()
    }
  }, [])

  useFrame((_state, delta) => {
    if (!groupRef.current || !matRef.current) return

    const tPos = Math.min(delta * 2.5, 1)
    const tMouse = Math.min(delta * 4, 1)
    const tDistort = Math.min(delta * 1.5, 1)

    mouse.current.x = lerpVal(mouse.current.x, mouseTarget.current.x, tMouse)
    mouse.current.y = lerpVal(mouse.current.y, mouseTarget.current.y, tMouse)

    groupRef.current.position.x = lerpVal(
      groupRef.current.position.x,
      proxy.current.posX + mouse.current.x * 0.25,
      tPos
    )
    groupRef.current.position.y = lerpVal(
      groupRef.current.position.y,
      proxy.current.posY + mouse.current.y * 0.25,
      tPos
    )

    const s = lerpVal(groupRef.current.scale.x, proxy.current.scale, tPos)
    groupRef.current.scale.setScalar(s)

    matRef.current.distort = lerpVal(matRef.current.distort, proxy.current.distort, tDistort)
  })

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.25} floatIntensity={0.5}>
        <mesh>
          <sphereGeometry args={[1.2, 128, 128]} />
          <MeshDistortMaterial
            ref={matRef}
            color="#0a2040"
            emissive="#0066ff"
            emissiveIntensity={1.2}
            distort={0.4}
            speed={1.5}
            roughness={0.2}
            metalness={0.8}
            envMapIntensity={2}
          />
        </mesh>
      </Float>
    </group>
  )
}
