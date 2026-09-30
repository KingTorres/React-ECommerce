import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../stores/productStore'

const Cart = () => {
    const productsItems = useSelector((state: RootState) => state.productCart.productItems) 
    
    
    const totalPrice = productsItems?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0
    const totalItem = productsItems?.reduce((acc, item) => acc + item.quantity, 0) || 0
  return (
    <div className='p-3 gap-2 h-full flex flex-col items-center align-center'>
        <div className='pt-3 pb-15 flex flex-col gap-5'>
            {!productsItems ? <div>No Items</div> :
            <>
            {productsItems?.map((item) => (
                <div className='py-2 px-3 bg-[#ffffff] drop-shadow-md rounded-xl flex gap-3 items-center' key={item.id}>
                    <div className='w-[25%] max-w-[25%] min-w-[25%]'><img className='w-full aspect-square' src={item.thumbnail} alt={item.name} /></div>
                    <div className='py-3 gap-1 h-full min-w-[50%] flex flex-col items-start'>
                        <div className='w-full text-lg text-nowrap overflow-hidden text-ellipsis text-left'>{item.name}</div>
                        <div className='text-lg font-semibold'>${item.price}</div>
                    </div>
                    <div className='w-[25%] flex items-center'>
                        <div className='w-full flex flex-col gap-2 items-center'>
                            <div className='w-[70%]'><button className='w-full py-0 rounded-lg w-full bg-[#dfdfdf]'>+</button></div>
                            <div className='text-lg'>x{item.quantity}</div>
                            <div className='w-[70%]'><button className='rounded-lg w-full bg-[#dfdfdf]'>-</button></div>
                        </div>
                    </div>
                </div>
            ))}
            </>        
            }
        </div>
        <div className='w-full flex justify-between pb-2 px-5 text-xl absolute bottom-0 border-t border-grey-600'>
            <div className='font-bold'>ITEMS: <span className='text-2xl text-[#000000]'>{totalItem}</span></div>
            <div className='font-bold'>TOTAL: <span className='text-2xl text-[#000000]'>${totalPrice}</span></div>
        </div>
      
    </div>
  )
}

export default Cart
