import { Routes, Route } from 'react-router-dom'
import Landing from './components/Landing'
import Play from './components/Play/Play' // you'll create this next

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/play" element={<Play />} />
    </Routes>
  )
}

export default App
