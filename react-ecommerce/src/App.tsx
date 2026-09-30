import './App.css'
import Home from './component/Home/Home'
import NotFound from './component/NotFound/NotFound'
import Navigation from './component/Navigation/Navigation'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
function App() {

  return (
    <>
    <BrowserRouter>
      <div className='flex flex-col h-dvh'>
        <div className='h-fit'>
          <Navigation></Navigation>
        </div>
        <div className='grow overflow-x-auto'>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App
