import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../../stores/productStore'

const Navigation = () => {
  const ItemCart = useSelector((state: RootState) => state.productCart.productItems)
  const totalItem = ItemCart?.reduce((acc, item) => acc + item.quantity, 0) || 0
  const navigate = useNavigate()
  return (
    <div className='drop-shadow-sm sticky top-0 z-2 py-2 px-3 bg-[#ffffff] text-xl flex justify-between items-center h-fit'>
      <div className='rounded-lg px-2 text-white bg-[#8fdbff]' onClick={() => navigate('/')}>
        &lt; Online Store
      </div>
      <div className='flex gap-3'>
        <div className='flex text-[#000000] px-4 py-0.5 rounded-xl bg-[#dfdfdf]'>
          <div>$</div>
          <div>1000</div>
        </div>
        <button onClick={() => navigate('/cart')}>
          <img className='w-9' src="https://cdn-icons-png.flaticon.com/128/3514/3514491.png" alt="cart" />
          {totalItem > 0 &&
            <div className='top-0 right-0 flex items-center justify-center rounded-2xl text-sm absolute bg-red-600 text-white h-[1.8em] w-[1.8em]'>{totalItem}</div>
          }
        </button>
      </div>
    </div>
  )
}

export default Navigation