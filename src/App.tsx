import { createContext, useContext } from 'react'
import { useDarkMode } from './hooks/useDarkMode'
import DynamicIsland from './components/DynamicIsland'
import BirdCanvas from './components/BirdCanvas'
import Hero from './components/Hero'
import ProfileSection from './components/ProfileSection'
import About from './components/About'
import Journey from './components/Journey'
import StackMarquee from './components/StackMarquee'
import { BuildingWidget, PitchWidget } from './components/WidgetRow'
import IPhoneSection from './components/IPhoneSection'
import Footer from './components/Footer'

interface DarkModeCtx {
  isDark: boolean
  toggle: () => void
}
export const DarkModeContext = createContext<DarkModeCtx>({ isDark: true, toggle: () => {} })
export const useDarkModeContext = () => useContext(DarkModeContext)

function App() {
  const { isDark, toggle } = useDarkMode()

  return (
    <DarkModeContext.Provider value={{ isDark, toggle }}>
      <div style={{ background: 'var(--color-black)', minHeight: '100vh', position: 'relative' }}>
        <BirdCanvas />
        <DynamicIsland />
        <main>
          {/* ── Always dark ── */}
          <Hero />
          <ProfileSection />

          {/* ProfileSection (#000) → adaptive sections: fade #000 → var(--color-black) */}
          {/* dark mode: #000→#000 = invisible | light mode: #000→#fff = cinematic */}
          <div className="bridge-dark-to-theme" />

          {/* ── Theme-adaptive sections ── */}
          <About />
          <Journey />
          <StackMarquee />

          <div className="widget-scatter-center">
            <BuildingWidget inView={true} />
          </div>

          <div className="widget-scatter-center" style={{ padding: '40px 24px 80px' }}>
            <PitchWidget inView={true} />
          </div>

          {/* Adaptive sections → iPhone (#000): fade var(--color-black) → #000 */}
          {/* dark mode: #000→#000 = invisible | light mode: #fff→#000 = cinematic */}
          <div className="bridge-theme-to-dark" />

          {/* ── Always dark ── */}
          <IPhoneSection />
        </main>
        <Footer />
      </div>
    </DarkModeContext.Provider>
  )
}

export default App
