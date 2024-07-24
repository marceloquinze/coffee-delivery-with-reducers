import { Coffees } from '../contexts/ItemsContext'
import { ActionTypes } from './ActionTypes'

// ------ DEFINITIONS ------
interface State {
  items: Coffees[]
  cartItems: Coffees[]
}

type Action =
  | { type: 'SET_ITEMS'; payload: Coffees[] }
  | { type: 'SET_ITEMS_IN_CART'; payload: Coffees[] }
  | { type: 'INCREMENT_ITEMS'; payload: string }
  | { type: 'DECREMENT_ITEMS'; payload: string }
  | { type: 'CHANGE_QTY'; payload: { id: string; newQty: number } }
  | { type: 'SEND_ITEMS_TO_CART'; payload: string }
  | { type: 'REMOVE_ITEMS_IN_CART'; payload: string }
  | { type: 'CLEAR_CART' }

// ------ REDUCERS ------
export function ItemsReducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionTypes.SET_ITEMS:
      // Populate state with items
      return { ...state, items: action.payload }
    case ActionTypes.SET_ITEMS_IN_CART:
      // Actually create the cart
      return { ...state, cartItems: action.payload }
    case ActionTypes.INCREMENT_ITEMS:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, qty: item.qty + 1 } : item,
        ),
      }
    case ActionTypes.DECREMENT_ITEMS:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload && item.qty !== 0
            ? { ...item, qty: item.qty - 1 }
            : item,
        ),
      }
    case ActionTypes.CHANGE_QTY:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: action.payload.newQty }
            : item,
        ),
      }
    case ActionTypes.SEND_ITEMS_TO_CART:
      // this will only modify the onCart property
      // it will not create the cart directly
      return {
        ...state,
        items: state.items.map((item) =>
          String(item.id) === action.payload ? { ...item, onCart: true } : item,
        ),
      }
    case ActionTypes.REMOVE_ITEMS_IN_CART:
      return {
        ...state,
        items: state.items.map((item) =>
          String(item.id) === String(action.payload)
            ? { ...item, onCart: false, qty: 0 }
            : item,
        ),
      }
    case ActionTypes.CLEAR_CART:
      return {
        ...state,
        items: state.items.map((item) => ({
          ...item,
          onCart: false,
          qty: 0,
        })),
      }
    default:
      return state
  }
}
