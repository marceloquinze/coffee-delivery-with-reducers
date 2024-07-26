import { HeroContainer, HeroWrapperContainer } from './styles'
import CupImage from '../../../../assets/Coffe-Delivery-Cup.png'
import { Coffee, Package, ShoppingCart, Timer } from 'phosphor-react'
import { HighlightItem } from './HighlightItem'
import heroBackground from '../../../../assets/Header-Background.png'

export function Hero() {
  return (
    <HeroWrapperContainer className="hero-background">
      <HeroContainer className="hero-container">
        <div className="left">
          <h1>Find the perfect coffee for any time of day.</h1>
          <h2>
            With Coffee Delivery, you receive your coffee wherever you are,
            anytime.
          </h2>
          <div className="highlights">
            <HighlightItem
              color={'yellow-dark'}
              text="Order safely and fast"
              icon={<ShoppingCart size={16} weight="fill" />}
            />
            <HighlightItem
              color={'base-text'}
              text="Packaging keeps coffee intact"
              icon={<Package size={16} weight="fill" />}
            />
            <HighlightItem
              color={'yellow'}
              text="Fast, tracked delivery"
              icon={<Timer size={16} weight="fill" />}
            />
            <HighlightItem
              color={'purple'}
              text="Coffee arrives fresh to you"
              icon={<Coffee size={16} weight="fill" />}
            />
          </div>
        </div>
        <div className="right">
          <img
            src={CupImage}
            alt="A white cup of coffee with a black strip showing the Coffee Delivery logo"
          />
        </div>
      </HeroContainer>
      <img className="heroBg" src={heroBackground} alt="" />
    </HeroWrapperContainer>
  )
}
