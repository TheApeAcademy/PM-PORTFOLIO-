import { createContext, useContext } from 'react'
import { useDarkMode } from './hooks/useDarkMode'
import DynamicIsland from './components/DynamicIsland'
import BirdCanvas from './components/BirdCanvas'
import Hero from './components/Hero'
import About from './components/About'
import Journey from './components/Journey'
import StackMarquee from './components/StackMarquee'
import WidgetRow from './components/WidgetRow'
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
          <Journey />
          <StackMarquee />
          <WidgetRow />
          <IPhoneSection />
        </main>
        <Footer />
      </div>
    </DarkModeContext.Provider>
  )
}

export default App
