import { useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

interface BirdCanvasRef {
  loadBird: (url: string) => void
  birdGroupRef: { current: THREE.Group | null }
}

// Exported utilities for external bird injection
export const birdCanvasRef: BirdCanvasRef = {
  loadBird: () => {},
  birdGroupRef: { current: null },
}

export default function BirdCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const birdGroupRef = useRef<THREE.Group>(new THREE.Group())
  const rafRef = useRef<number>(0)

  const loadBird = useCallback((url: string) => {
    if (!sceneRef.current) return
    const loader = new GLTFLoader()
    loader.load(url, (gltf) => {
      birdGroupRef.current.clear()
      birdGroupRef.current.add(gltf.scene)
      sceneRef.current!.add(birdGroupRef.current)
    })
  }, [])

  useEffect(() => {
    birdCanvasRef.loadBird = loadBird
    birdCanvasRef.birdGroupRef = birdGroupRef
  }, [loadBird])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 0, 10)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    rendererRef.current = renderer

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambient)
    const directional = new THREE.DirectionalLight(0x0071e3, 0.6)
    directional.position.set(5, 5, 5)
    scene.add(directional)

    // Bird group (mount anchor)
    const birdGroup = birdGroupRef.current
    birdGroup.name = 'birdGroup'
    scene.add(birdGroup)

    // Animation loop
    const animate = () => {
      if (document.hidden) {
        rafRef.current = requestAnimationFrame(animate)
        return
      }
      // Gentle float animation for when bird is loaded
      if (birdGroup.children.length > 0) {
        birdGroup.position.y = Math.sin(Date.now() * 0.001) * 0.3
        birdGroup.rotation.y += 0.003
      }
      renderer.render(scene, camera)
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    // Resize handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="bird-mount"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        width: '100vw',
        height: '100vh',
      }}
    />
  )
}
