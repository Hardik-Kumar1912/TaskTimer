import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Alltasks from './components/Alltasks'
import Viewtask from './components/Viewtask'

const router=createBrowserRouter(
  [
    {
      path: "/",
      element:
        <div>
          <Navbar/>
          <Home/>
        </div>
    },
    {
      path: "/alltasks",
      element:
        <div>
          <Navbar/>
          <Alltasks/>
        </div>
    },
    {
      path: "/alltasks/:id",
      element:
        <div>
          <Navbar/>
          <Viewtask/>
        </div>
    },
  ]
)

function App() {

  return (
    <div className='bg-white h-[100vh] w-[100vw]'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
