import Navbar from "./components/navbar/navbar.jsx"
import Homepage from "./pages/homepage/homepage.jsx"
import './layout/layout.scss'

function App() {
  return (
    <div className="layout">
     
      <div className="navbar">
      <Navbar/>
      </div>

      <div className="content">
        <Homepage/>
      </div>
      
    </div>
  )
}

export default App