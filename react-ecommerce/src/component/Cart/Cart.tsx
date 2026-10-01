import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../store'
import { addProductItem } from '../../features/cartSlice'
import { decreaseQuantity } from '../../features/cartSlice'
import { removeProductItem } from '../../features/cartSlice'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const ItemCart = useSelector((state: RootState) => state.productCart.productItems)
    const totalPrice = ItemCart?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0
    const totalItem = ItemCart?.reduce((acc, item) => acc + item.quantity, 0) || 0
    const dispatch = useDispatch()
    const navigate = useNavigate()

  return (
    <div className='p-3 px-5 gap-2 h-full flex flex-col items-center align-center'>
        <div className='pt-3 pb-15 flex flex-col gap-5'>
            {ItemCart.length > 0 && 
            <>
            {ItemCart?.map((item) => (
                <div className='py-2 px-5 bg-[#ffffff] drop-shadow-md rounded-xl flex gap-3 items-center overflow-hidden' key={item.id}>
                    <div className='w-[25%] max-w-[25%] min-w-[25%]'><img className='w-full aspect-square' src={item.thumbnail} alt={item.title} /></div>
                    <div className='py-3 gap-1 h-full min-w-[50%] flex flex-col items-start'>
                        <div className='text-black w-full text-lg text-nowrap overflow-hidden text-ellipsis text-left'>{item.title}</div>
                        <div className='text-lg font-semibold'>${item.price}</div>
                    </div>
                    <div className='w-[25%] flex items-center'>
                        <div className='w-full flex flex-col gap-2 items-center'>
                            <div className='text-white font-bold w-[70%]'><button className='w-full py-0 rounded-lg w-full bg-[#2f5999]' onClick={() => dispatch(addProductItem(item))}>+</button></div>
                            <div className='text-lg'>x{item.quantity}</div>
                            <div className='text-white font-bold w-[70%]'><button className='rounded-lg w-full bg-[#2f5999]' onClick={() => dispatch(decreaseQuantity(item.id))}>-</button></div>
                        </div>
                    </div>
                    <button className='rounded-br-xl bg-[#ff0000] text-l font-bold text-[#ffffff] h-7 w-7 absolute top-0 left-0' onClick={() => dispatch(removeProductItem(item.id))}>X</button>
                </div>
            ))}
            </>}
            {ItemCart.length <= 0 &&                
                <>
                    <div className='text-2xl'>No Item</div>
                    <button className='text-[#ffffff] bg-blue-600 py-1 px-2 rounded-lg' onClick={() => navigate('/')}>Go Back</button>
                </>
            }
        </div>
        <div className='w-full flex justify-between pb-2 px-5 text-xl absolute bottom-0 border-t border-grey-600'>
            <div className='font-bold'>ITEMS: <span className='text-2xl text-[#000000]'>{totalItem}</span></div>
            <div className='font-bold'>TOTAL: <span className='text-2xl text-[#000000]'>${Number(totalPrice).toFixed(2)}</span></div>
        </div>
      
    </div>
  )
}

export default Cart
