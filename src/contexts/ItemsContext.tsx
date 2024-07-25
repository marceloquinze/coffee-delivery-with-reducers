import {
  FormEvent,
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { ItemsReducer } from '../reducers/ItemsReducer'
import { ActionTypes } from '../reducers/ActionTypes'

export interface Coffees {
  id: string
  title: string
  description: string
  price: number
  tags: []
  image: string
  qty: number
  onCart: boolean
}

interface ItemContextType {
  items: Coffees[]
  itemsInCart: Coffees[]
  incrementItems: (id: string) => void
  decrementItems: (id: string) => void
  changeQuantity: (id: string, newQty: number) => void
  sendItemsToCart: (e: FormEvent<HTMLFormElement>) => void
  removeItemsInCart: (e: FormEvent<HTMLFormElement>) => void
  clearCart: () => void
  deliveryPrice: number
}

export const ItemsContext = createContext({} as ItemContextType)

interface ItemsContextProviderProps {
  children: ReactNode
}

export function ItemsContextProvider({ children }: ItemsContextProviderProps) {
  // ------ SINGLE STATES ------
  const [deliveryPrice, setDeliveryPrice] = useState<number>(0)

  // ------ INITIAL STATE ------
  const initialItems = localStorage.getItem('@coffee-delivery:items-1.0.0')
  const savedCartItems = localStorage.getItem(
    '@coffee-delivery:itemsInCart-1.0.0',
  )
  const initialState = {
    items: initialItems ? JSON.parse(initialItems) : [],
    cartItems: savedCartItems ? JSON.parse(savedCartItems) : [],
  }
  // ------ REDUCERS ------
  const [state, dispatch] = useReducer(ItemsReducer, initialState)

  // ------ EFFECTS ------
  // 1. get items from api
  useEffect(() => {
    // Check if there are items in state
    if (state.items.length === 0) {
      const url = 'coffee.json'
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Data not found')
          }
          return response.json()
        })
        .then((data) => {
          // Modify state with items from api creating an items array
          dispatch({ type: ActionTypes.SET_ITEMS, payload: data })
        })
    }
  }, [state.items.length])

  // get shop config values
  useEffect(() => {
    const url = 'shop-config.json'
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Data not found')
        }
        return response.json()
      })
      .then((data) => {
        if (data.length > 0 && data[0].delivery_price !== undefined) {
          setDeliveryPrice(data[0].delivery_price)
        }
      })
  }, [])

  // 2. set items in cart (actually create the cart)
  useEffect(() => {
    const updatedCartItems = state.items.filter(
      (item: Coffees) => item.onCart && item.qty > 0,
    )
    // Modify state with items in cart
    dispatch({ type: ActionTypes.SET_ITEMS_IN_CART, payload: updatedCartItems })
  }, [state.items])

  // 3. save items in local storage (when state changes)
  useEffect(() => {
    localStorage.setItem(
      '@coffee-delivery:itensInCart-1.0.0',
      JSON.stringify(state.cartItems),
    )
    localStorage.setItem(
      '@coffee-delivery:items-1.0.0',
      JSON.stringify(state.items),
    )
  }, [state])

  // // ------ HELPER FUNCTIONS ------

  // 1. increment and decrement
  function incrementItems(idToIncrement: string) {
    dispatch({ type: ActionTypes.INCREMENT_ITEMS, payload: idToIncrement })
  }
  function decrementItems(idToDecrement: string) {
    dispatch({ type: ActionTypes.DECREMENT_ITEMS, payload: idToDecrement })
  }

  // // 2. change quantity
  function changeQuantity(id: string, newQty: number) {
    dispatch({ type: ActionTypes.CHANGE_QTY, payload: { id, newQty } })
  }

  // 3. send items to cart
  function sendItemsToCart(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const id = formData.get('id') as string

    dispatch({ type: ActionTypes.SEND_ITEMS_TO_CART, payload: id })
  }

  // 4. remove items from cart
  function removeItemsInCart(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const id = formData.get('id') as string

    dispatch({ type: ActionTypes.REMOVE_ITEMS_IN_CART, payload: id })
  }

  // 5. clear cart
  function clearCart() {
    dispatch({ type: ActionTypes.CLEAR_CART })
  }

  // useEffect(() => {
  //   console.log(config)
  // }, [config])
  // ------ RETURN ------
  return (
    <ItemsContext.Provider
      value={{
        items: state.items,
        itemsInCart: state.cartItems,
        decrementItems,
        incrementItems,
        changeQuantity,
        sendItemsToCart,
        removeItemsInCart,
        clearCart,
        deliveryPrice,
      }}
    >
      {children}
    </ItemsContext.Provider>
  )
}
