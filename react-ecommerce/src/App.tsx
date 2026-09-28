import './App.css'
import Home from './component/Home/Home'
import Navigation from './component/Navigation/Navigation'
function App() {

  return (
    <>
      <div className='flex flex-col h-dvh'>
        <div className='h-fit'>
          <Navigation></Navigation>
        </div>
        <div className='grow overflow-x-auto'>
          <Home></Home>
        </div>
      </div>
    </>
  )
}

export default App
