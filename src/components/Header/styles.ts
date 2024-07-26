import styled from 'styled-components'

export const HeaderContainer = styled.header`
  .store-notice {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 2rem;
    background-color: ${(props) => props.theme['yellow-light']};
    position: relative;
    z-index: 1;

    &.hidden {
      display: none;
    }

    .close {
      position: absolute;
      right: 1rem;
      top: 1rem;
      cursor: pointer;
      border: none;
      background-color: transparent;
      color: ${(props) => props.theme['yellow-dark']};
      font-weight: bold;
      font-size: 120%;
    }
  }
  .wrapper {
    max-width: 70rem;
    margin: 0 auto;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .user-items {
      nav {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
      }

      .location {
        background-color: ${(props) => props.theme['purple-light']};
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.5rem;
        border-radius: 5px;
        height: 40px;
      }

      .cart {
        background-color: ${(props) => props.theme['yellow-light']};
        display: inline-block;
        padding: 0.5rem;
        border-radius: 5px;
        height: 40px;
        position: relative;

        span {
          position: absolute;
          right: -7px;
          top: -7px;
          height: 19px;
          width: 19px;
          background-color: ${(props) => props.theme['yellow-dark']};
          border-radius: 50%;
          color: ${(props) => props.theme.white};
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        svg {
          fill: ${(props) => props.theme['yellow-dark']};
        }
      }
    }
  }
`
