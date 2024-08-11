import { BrowserRouter as Main, Routes, Route } from "react-router-dom"
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import Admin from "./Pages/Admin"

function App() {

  return (
    <>
      <div className="bg-second">

       <Main >
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/admin/login" element={<Login/>}/>
          <Route path="/admin" element={<Admin/>}/>
         
        </Routes>
       </Main>
      </div>
    </>
  )
}

export default App