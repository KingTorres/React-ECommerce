// productStore.ts
import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../features/cartSlice'

const loadCartState = () => {
  try {
    const savedCart = localStorage.getItem('cart_items')
    return savedCart ? JSON.parse(savedCart) : undefined
  } catch(e) {
    return undefined
  }
}
export const store = configureStore({
  reducer: {
    productCart: productReducer,
  },
  preloadedState: {
    productCart: loadCartState(),
  }
})

store.subscribe(() => {
  try {
    localStorage.setItem('cart_items', JSON.stringify(store.getState().productCart))
  } catch(e) {
    console.error("Could not save cart state", e)
  }
})

export type RootState = ReturnType<typeof store.getState>