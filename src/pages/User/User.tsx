import { UserDetailsComp } from '../Checkout/components/UserDetails/UserDetails'
import { UserContainer } from './styles'
import { UserContext } from '../../contexts/UserContext'
import { useContext, useState } from 'react'
import { Package } from 'phosphor-react'

export function User() {
  const { getUserDetails, userDetails, invalidFields, orderHistory } =
    useContext(UserContext)

  const sortedHistory = [...orderHistory].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Page indexes
  const indexOfLastItem = currentPage * itemsPerPage // 10
  const indexOfFirstItem = indexOfLastItem - itemsPerPage // 5
  const currentItems = sortedHistory.slice(indexOfFirstItem, indexOfLastItem)

  // Next and previous page
  function nextPage() {
    if (currentPage < Math.ceil(sortedHistory.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1)
    }
  }

  function previousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <UserContainer className="user-container">
      <div className="tabs">
        <input type="radio" name="tabs" id="address" defaultChecked />
        <label htmlFor="address">Address</label>
        <input type="radio" name="tabs" id="history" />
        <label htmlFor="history">Order History</label>

        <div className="content">
          <div className="content-tab" id="content1">
            <h1>Delivery Address</h1>
            <UserDetailsComp
              getUserDetails={getUserDetails}
              userDetails={userDetails}
              invalidFields={invalidFields}
            />
          </div>
          <div className="content-tab" id="content2">
            <h1>Order History</h1>
            {currentItems.length ? (
              currentItems.map((order) => (
                <div key={order.id} className="eachOrder">
                  <Package size={32} />
                  <div>
                    <p>
                      <strong>Order number:</strong> {order.id}
                    </p>
                    <p>
                      <strong>Date:</strong>{' '}
                      {new Date(order.date).toLocaleDateString() +
                        ' at ' +
                        new Date(order.date).toLocaleTimeString()}
                    </p>
                    <p>
                      <strong>Payment details:</strong> $
                      {order.total.toFixed(2)} payed in {order.payment}
                    </p>
                    <p>
                      <strong>Ordered items:</strong>
                    </p>
                    {order.itemsInCart.map((item) => (
                      <ul key={item.id}>
                        <li>
                          {item.qty}x {item.title}
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>You do not have any order yet</p>
            )}

            <div className="pagination">
              <button onClick={previousPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span>Page {currentPage}</span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(sortedHistory.length / itemsPerPage)
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </UserContainer>
  )
}
