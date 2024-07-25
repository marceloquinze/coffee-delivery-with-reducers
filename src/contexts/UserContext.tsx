import {
  ChangeEvent,
  MouseEvent,
  ReactNode,
  createContext,
  useEffect,
  useState,
  useContext,
  useReducer,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { ItemsContext, Coffees } from './ItemsContext'
import { UserReducer } from '../reducers/UserReducer'
import { ActionTypes } from '../reducers/ActionTypes'
import { validateOrder } from '../helpers/validateUserForm'

export interface UserDetails {
  cep: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  uf: string
}

interface UserDetailsProps {
  street: string
  number: string
  neighborhood: string
  city: string
  uf: string
}
export interface Order {
  id: string
  userAddress: UserDetailsProps
  payment: string
  itemsInCart: Coffees[]
  total: number
  date: Date
}

interface UserContextType {
  payment: string
  userDetails: UserDetails
  validationMsg: string[]
  invalidFields: { [key: string]: boolean }
  order: Order
  orderHistory: Order[]
  togglePayment: (e: MouseEvent<HTMLButtonElement>, paymentType: string) => void
  getUserDetails: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) => void
  createOrder: (e: MouseEvent<HTMLButtonElement>) => void
}

export const UserContext = createContext({} as UserContextType)

interface UserContextProviderProps {
  children: ReactNode
}

export function UserContextProvider({ children }: UserContextProviderProps) {
  // ------ INITIAL STATES ------
  const savedPayment = localStorage.getItem('@coffee-delivery:payment-1.0.0')
  const savedUserDetails = localStorage.getItem(
    '@coffee-delivery:userDetails-1.0.0',
  )
  const savedOrder = localStorage.getItem('@coffee-delivery:order-1.0.0')
  const savedOrderHistory = localStorage.getItem(
    '@coffee-delivery:orderHistory-1.0.0',
  )

  const initialUserState = {
    payment: savedPayment ? JSON.parse(savedPayment) : '',
    userDetails: savedUserDetails ? JSON.parse(savedUserDetails) : {},
    order: savedOrder ? JSON.parse(savedOrder) : {},
    orderHistory: savedOrderHistory ? JSON.parse(savedOrderHistory) : [],
  }

  // ------ REDUCERS ------
  const [state, dispatch] = useReducer(UserReducer, initialUserState)

  // ------ CONTEXTS ------

  const { itemsInCart, clearCart, deliveryPrice } = useContext(ItemsContext)
  const navigate = useNavigate()

  // 3. validation
  const [validationMsg, setValidationMsg] = useState<string[]>([])
  const [invalidFields, setInvalidFields] = useState<{
    [key: string]: boolean
  }>({})

  // ------ EFFECTS ------

  useEffect(() => {
    localStorage.setItem(
      '@coffee-delivery:payment-1.0.0',
      JSON.stringify(state.payment),
    )
    localStorage.setItem(
      '@coffee-delivery:userDetails-1.0.0',
      JSON.stringify(state.userDetails),
    )
    localStorage.setItem(
      '@coffee-delivery:order-1.0.0',
      JSON.stringify(state.order),
    )
    localStorage.setItem(
      '@coffee-delivery:orderHistory-1.0.0',
      JSON.stringify(state.orderHistory),
    )
  }, [state])

  // ------ HELPER FUNCTIONS ------

  // 1. toggle payment
  function togglePayment(
    e: React.MouseEvent<HTMLButtonElement>,
    paymentType: string,
  ) {
    e.preventDefault()
    dispatch({ type: ActionTypes.TOGGLE_PAYMENT, payload: paymentType })
  }

  // 2. get user details
  function getUserDetails(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) {
    dispatch({
      type: ActionTypes.SET_USER_DETAILS,
      payload: {
        name: e.target.name,
        value: e.target.value,
      },
    })
  }

  // 4. create order
  function createOrder(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    const validation = validateOrder(
      state.userDetails,
      state.payment,
      itemsInCart,
    )
    if (!validation.valid) {
      setValidationMsg(validation.msgs)
      setInvalidFields(validation.fields)
    } else {
      setValidationMsg([])
      setInvalidFields({})

      const { street, number, neighborhood, city, uf } = state.userDetails

      // create new order
      const newOrder: Order = {
        id: uuidv4().toString().substring(0, 8),
        userAddress: { street, number, neighborhood, city, uf },
        payment: state.payment,
        itemsInCart,
        total:
          itemsInCart.reduce((acc, item) => {
            return acc + item.price * item.qty
          }, 0) + deliveryPrice,
        date: new Date(),
      }

      // update order state
      dispatch({ type: ActionTypes.CREATE_ORDER, payload: newOrder })

      // update order history state
      dispatch({ type: ActionTypes.SET_ORDER_HISTORY, payload: newOrder })

      // clear cart
      clearCart()

      // redirect
      navigate('/success')
    }
  }

  // ------ RETURN ------
  return (
    <UserContext.Provider
      // this goes around every element that needs values coming from this context
      // you'll find it on App.tsx
      value={{
        togglePayment,
        payment: state.payment,
        getUserDetails,
        userDetails: state.userDetails,
        createOrder,
        validationMsg,
        invalidFields,
        order: state.order,
        orderHistory: state.orderHistory,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
