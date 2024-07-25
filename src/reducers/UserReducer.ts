import { Order, UserDetails } from '../contexts/UserContext'
import { ActionTypes } from './ActionTypes'

interface State {
  payment: string
  userDetails: UserDetails
  order: Order
  orderHistory: Order[]
}

type Action =
  | { type: 'TOGGLE_PAYMENT'; payload: string }
  | { type: 'SET_USER_DETAILS'; payload: { name: string; value: string } }
  | { type: 'CREATE_ORDER'; payload: Order }
  | { type: 'SET_ORDER_HISTORY'; payload: Order }

export function UserReducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.TOGGLE_PAYMENT:
      return {
        ...state,
        payment: action.payload,
      }
    case ActionTypes.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          [action.payload.name]: action.payload.value,
        },
      }
    case ActionTypes.CREATE_ORDER:
      return {
        ...state,
        order: action.payload,
      }
    case ActionTypes.SET_ORDER_HISTORY:
      return {
        ...state,
        orderHistory: [...state.orderHistory, action.payload],
      }
    default:
      return state
  }
}
