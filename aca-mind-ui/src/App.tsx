import { Router, Route } from 'wouter'
import Dashboard from './pages/Dashboard'
import UploadPage from './pages/UploadPage'
import RevisionPage from './pages/RevisionPage'
import TheoryPage from './pages/TheoryPage'
import { Navigation } from './components/Navigation'
import { Toaster } from './components/ui/toaster'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto py-8 px-4">
          <Route path="/" component={Dashboard} />
          <Route path="/upload" component={UploadPage} />
          <Route path="/revision" component={RevisionPage} />
          <Route path="/theory" component={TheoryPage} />
        </div>
        <Toaster />
      </div>
    </Router>
  )
}

export default App