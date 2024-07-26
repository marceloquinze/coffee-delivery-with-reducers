import { NavLink } from 'react-router-dom'
import siteLogo from '../../assets/Logo.svg'
import { HeaderContainer } from './styles'
import { ShoppingCart, User } from 'phosphor-react'
import { useContext, useState } from 'react'
import { ItemsContext } from '../../contexts/ItemsContext'

export function Header() {
  const { itemsInCart } = useContext(ItemsContext)
  const totalItems = itemsInCart.reduce((acc, item) => acc + item.qty, 0)

  const [hasNotice, setHasNotice] = useState(() => {
    return !localStorage.getItem('hasNotice')
  })

  function closeNotice() {
    setHasNotice(false)
    localStorage.setItem('hasNotice', 'false')
  }

  return (
    <HeaderContainer className="header-container">
      <div className={`store-notice ${!hasNotice ? 'hidden' : ''}`}>
        <p>
          This is a demo store for testing purposes — no orders shall be
          fulfilled.
        </p>
        <button onClick={closeNotice} className="close">
          X
        </button>
      </div>
      <div className="wrapper">
        <nav>
          <NavLink to="/">
            <img src={siteLogo} alt="" />
          </NavLink>
        </nav>
        <div className="user-items">
          <nav>
            <NavLink to="/user" className="location">
              <User size={24} weight="fill" />
            </NavLink>
            <NavLink to="/checkout" className="cart">
              <ShoppingCart size={24} weight="fill" />
              {totalItems !== 0 && <span>{totalItems}</span>}
            </NavLink>
          </nav>
        </div>
      </div>
    </HeaderContainer>
  )
}
