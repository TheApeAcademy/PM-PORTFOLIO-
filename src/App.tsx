import { createContext, useContext, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useDarkMode } from './hooks/useDarkMode'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import DynamicIsland from './components/DynamicIsland'
import Scene from './components/canvas/Scene'
import Hero from './components/Hero'
import ProfileSection from './components/ProfileSection'
import About from './components/About'
import Journey from './components/Journey'
import StackMarquee from './components/StackMarquee'
import { BuildingWidget, PitchWidget } from './components/WidgetRow'
import IPhoneSection from './components/IPhoneSection'
import FloatingIPhoneButton from './components/FloatingIPhoneButton'
import ProductLab from './components/ProductLab'
import HowIWork from './components/HowIWork'
import Footer from './components/Footer'
import MagneticCursor from './components/MagneticCursor'
import Preloader from './components/Preloader'

interface DarkModeCtx {
  isDark: boolean
  toggle: () => void
}
export const DarkModeContext = createContext<DarkModeCtx>({ isDark: true, toggle: () => {} })
export const useDarkModeContext = () => useContext(DarkModeContext)

function App() {
  const { isDark, toggle } = useDarkMode()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 280, damping: 30, restDelta: 0.001 })
  const [preloaderDone, setPreloaderDone] = useState(false)
  useSmoothScroll()

  return (
    <DarkModeContext.Provider value={{ isDark, toggle }}>
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}
      <MagneticCursor />

      {/* Scroll progress bar */}
      <motion.div
        className="scroll-progress-bar"
        style={{ scaleX }}
      />

      {/* Film grain overlay */}
      <div className="grain-overlay" aria-hidden />

      <div style={{ background: 'var(--color-black)', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
        <Scene />
        <DynamicIsland />
        <main>
          <Hero />
          <ProfileSection />

          <div className="bridge-dark-to-theme" />

          <About />
          <Journey />
          <StackMarquee />

          <div className="widget-scatter-center">
            <BuildingWidget inView={true} />
          </div>

          <div className="widget-scatter-center" style={{ padding: '40px 24px 80px' }}>
            <PitchWidget inView={true} />
          </div>

          <ProductLab />
          <HowIWork />

          <div className="bridge-theme-to-dark" />

          <IPhoneSection />
        </main>
        <Footer />
        <FloatingIPhoneButton />
      </div>
    </DarkModeContext.Provider>
  )
}

export default App
