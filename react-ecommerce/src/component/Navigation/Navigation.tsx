import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navigation = () => {
  const navigate = useNavigate()
  return (
    <div className='drop-shadow-sm sticky top-0 z-2 py-2 px-3 bg-[#ffffff] text-xl flex justify-between items-center h-fit'>
      <div onClick={() => navigate('/')}>Online Store</div>
      <div className='flex gap-3'>
        <div className='flex text-[#000000] px-4 py-0.5 rounded-xl bg-[#dfdfdf]'>
          <div>$</div>
          <div>1000</div>
        </div>
        <button onClick={() => navigate('/cart')}><img className='w-9' src="https://cdn-icons-png.flaticon.com/128/3514/3514491.png" alt="cart" /></button>
      </div>
    </div>
  )
}

export default Navigation