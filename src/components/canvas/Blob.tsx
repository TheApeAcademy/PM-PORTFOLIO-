import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lerpVal = (a: number, b: number, t: number) => a + (b - a) * t

function CameraRig() {
  const { camera } = useThree()
  const proxy = useRef({ cameraZ: 5 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
        },
      })
      tl.to(proxy.current, { cameraZ: 6.5, ease: 'none', duration: 0.4 })
      tl.to(proxy.current, { cameraZ: 5.5, ease: 'none', duration: 0.6 })
    })
    return () => ctx.revert()
  }, [])

  useFrame((_state, delta) => {
    const t = Math.min(delta * 2, 1)
    const cam = camera as THREE.PerspectiveCamera
    cam.position.z = lerpVal(cam.position.z, proxy.current.cameraZ, t)
  })

  return null
}

export default function Blob() {
  const groupRef = useRef<THREE.Group>(null)
  const matRef = useRef<any>(null)
  const proxy = useRef({ posX: 0, posY: 0, scale: 1.0, distort: 0.45 })
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
      tl.to(proxy.current, {
        posX: -1.8,
        posY: 0.4,
        scale: 1.6,
        distort: 0.55,
        ease: 'none',
        duration: 0.4,
      })
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
    <>
      <CameraRig />
      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={0.25} floatIntensity={0.5}>
          <mesh>
            <sphereGeometry args={[1.4, 128, 128]} />
            <MeshDistortMaterial
              ref={matRef}
              color="#040e28"
              emissive="#0044ee"
              emissiveIntensity={1.15}
              distort={0.45}
              speed={1.8}
              roughness={0.18}
              metalness={0.55}
              envMapIntensity={1.2}
            />
          </mesh>
        </Float>
      </group>
    </>
  )
}
