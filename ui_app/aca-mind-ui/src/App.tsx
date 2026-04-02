import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header className="cortexa-header">
        <div className="header-content">
          <div className="logo-section">
            <h1 className="app-title">cortexa</h1>
            <p className="app-subtitle">v1.0.2</p>
          </div>
        </div>
      </header>

      <section id="center">
        <div className="hero-content">
          <div>
            <h2>Welcome to cortexa</h2>
            <p>
              A modern React + TypeScript application built with Vite
            </p>
          </div>
        </div>
        <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <footer className="cortexa-footer">
        <div className="footer-content">
          <p>&copy; 2026 cortexa. All rights reserved.</p>
          <div className="tech-stack">
            <p>Built with React + TypeScript + Vite</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
