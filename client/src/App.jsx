import Navbar from "./components/navbar/navbar.jsx"
import HomePage from "./pages/homePage.jsx"
import './layout/layout.scss'

function App() {
  return (
    <div className="layout">
     
      <div className="navbar">
      <Navbar/>
      </div>

      <div className="content">
        <HomePage/>
      </div>
      
    </div>
  )
}

export default App