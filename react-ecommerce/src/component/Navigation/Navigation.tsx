import React from 'react'

const Navigation = () => {
  return (
    <div className='drop-shadow-sm sticky top-0 z-2 py-2 px-3 bg-[#ffffff] text-xl flex justify-between items-center h-fit'>
      <div>Online Store</div>
      <div className='flex gap-3'>
        <div className='flex text-[#000000] px-4 py-0.5 rounded-xl bg-[#dfdfdf]'>
          <div>$</div>
          <div>1000</div>
        </div>
        <button>Cart</button>
      </div>
    </div>
  )
}

export default Navigation