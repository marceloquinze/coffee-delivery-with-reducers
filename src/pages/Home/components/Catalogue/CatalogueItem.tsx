import { ShoppingCart } from 'phosphor-react'
import { CatalogueItemContainer } from './styles'
import { ChangeEvent, FormEvent } from 'react'
interface CatalogueItemProps {
  id: string
  title: string
  description: string
  price: number
  tags: []
  image: string
  qty: number
  onIncrement: (id: string) => void
  onDecrement: (id: string) => void
  onQtyChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSendToCart: (e: FormEvent<HTMLFormElement>) => void
}

export function CatalogueItem({
  id,
  title,
  description,
  price,
  tags,
  image,
  qty,
  onIncrement,
  onDecrement,
  onQtyChange,
  onSendToCart,
}: CatalogueItemProps) {
  return (
    <CatalogueItemContainer className="catalogue-item">
      <img src={`src/assets/${image}`} alt={title} />
      <div className="tags">
        {tags.map((item, index) => {
          return (
            <span className="coffeeType" key={index}>
              {item}
            </span>
          )
        })}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <form className="controls" onSubmit={onSendToCart}>
        <span className="price">
          $ <b>{price}</b>
        </span>
        <div className="counter">
          <a className="decrement" onClick={() => onDecrement(id)}>
            -
          </a>
          <input
            className="qty"
            min={0}
            name="qty"
            value={qty}
            onChange={onQtyChange}
          />
          <a className="increment" onClick={() => onIncrement(id)}>
            +
          </a>
        </div>
        <input type="hidden" name="id" value={id} />
        <button type="submit" className="cart">
          <ShoppingCart weight="fill" size={24} />
        </button>
      </form>
    </CatalogueItemContainer>
  )
}
