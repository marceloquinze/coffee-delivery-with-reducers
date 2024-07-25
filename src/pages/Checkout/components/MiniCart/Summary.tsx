import { Coffees } from '../../../../contexts/ItemsContext'

interface SummaryProps {
  itemsInCart: Coffees[]
  deliveryPrice: number
}
export function Summary({ itemsInCart, deliveryPrice }: SummaryProps) {
  const total = itemsInCart.reduce(
    (acc, item) => acc + item.qty * item.price,
    0,
  )
  return (
    <div className="summary">
      <div className="total">
        <p>
          Itens Total: <span>$ {total.toFixed(2)}</span>
        </p>
      </div>
      <div className="delivery">
        <p>
          Delivery: <span>$ {deliveryPrice.toFixed(2)}</span>
        </p>
      </div>
      <div className="grandTotal">
        <p>
          Total: <span>$ {(total + deliveryPrice).toFixed(2)}</span>
        </p>
      </div>
    </div>
  )
}
