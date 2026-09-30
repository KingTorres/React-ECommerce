import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../stores/productStore'

const Cart = () => {
    const productsItems = useSelector((state: RootState) => state.productCart.productItems) 
  return (
    <div>
        {
            productsItems.map((item) => (
                <div key={item.id}>
                    {item.name}
                    {item.price}
                    {item.quantity}
                </div>
            ))
        }
      
    </div>
  )
}

export default Cart
