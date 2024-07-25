import { Coffees } from '../contexts/ItemsContext'
import { UserDetails } from '../contexts/UserContext'

interface Validation {
  valid: boolean
  msgs: string[]
  fields: { [key: string]: boolean }
}

export function validateOrder(
  userDetails: UserDetails,
  payment: string,
  itemsInCart: Coffees[],
): Validation {
  const messages: string[] = []
  const fields: { [key: string]: boolean } = {}

  if (!userDetails.cep) {
    messages.push('Please fill in the CEP field')
    fields.cep = true
  } else if (!userDetails.cep.match(/^[0-9]{5}-[0-9]{3}$/)) {
    messages.push('Invalid CEP')
    fields.cep = true
  }

  if (!userDetails.street) {
    messages.push('Please fill in the street field')
    fields.street = true
  }

  if (!userDetails.number) {
    messages.push('Please fill in the number field')
    fields.number = true
  } else if (!userDetails.number.match(/^[1-9]\d*$/)) {
    messages.push('Invalid number')
    fields.number = true
  }

  if (!userDetails.neighborhood) {
    messages.push('Please fill in the neighborhood field')
    fields.neighborhood = true
  }

  if (!userDetails.city) {
    messages.push('Please fill in the city field')
    fields.city = true
  }

  if (!userDetails.uf) {
    messages.push('Please fill in the UF field')
    fields.uf = true
  }

  if (!payment) {
    messages.push('Please select a payment method')
    fields.payment = true
  }

  if (!itemsInCart.length) {
    messages.push('Cart is empty')
  }

  return { valid: messages.length === 0, msgs: messages, fields }
}
