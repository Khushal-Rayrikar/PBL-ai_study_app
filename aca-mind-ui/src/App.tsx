import { Router, Route } from 'wouter'
import Dashboard from './pages/Dashboard'
import UploadPage from './pages/UploadPage'
import { Toaster } from './components/ui/toaster'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <Route path="/" component={Dashboard} />
          <Route path="/upload" component={UploadPage} />
        </div>
        <Toaster />
      </div>
    </Router>
  )
}

export default App