import { BrowserRouter as Main, Routes, Route } from "react-router-dom"
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import Admin from "./Pages/Admin"

function App() {

  return (
    <>
      <div className="">
      <div className="relative h-full w-full bg-white"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

       <Main >
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/admin/login" element={<Login/>}/>
          <Route path="/admin" element={<Admin/>}/>
         
        </Routes>
       </Main>
      </div>
      </div>
    </>
  )
}

export default App