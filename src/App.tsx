import { createContext, useContext } from 'react'
import { useDarkMode } from './hooks/useDarkMode'
import DynamicIsland from './components/DynamicIsland'
import BirdCanvas from './components/BirdCanvas'
import Hero from './components/Hero'
import About from './components/About'
import StackMarquee from './components/StackMarquee'
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
          <Hero />
          <About />
          <StackMarquee />
          <IPhoneSection />
        </main>
        <Footer />
      </div>
    </DarkModeContext.Provider>
  )
}

export default App
