import React from 'react'
import { Link, useFetcher } from 'react-router-dom'
import { TrashIcon, UserMinusIcon } from '@heroicons/react/24/outline'

const TransactionItem = ({ transaction }) => {
  const rawPayment = transaction.payment
  const checkFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(transaction.check);
  const tipsFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(transaction.tips);
  const fetcher = useFetcher()


  return (
    <>
      <td>{checkFormatted}</td>
      <td>{tipsFormatted}</td>
      <td>{rawPayment.includes('Card') ? rawPayment.replace('Card', ' Card') : rawPayment}</td>
      <td>
      <fetcher.Form 
        method="post"
        className='grid-small'
        onSubmit={(event) => {
            if (!confirm("Delete Transaction?")) {
              event.preventDefault()
            } 
          }}>
           
             <div className="expense-inputs">
                <div className="grid-xs">
                  <input type="hidden" name='_action' value="deleteTransaction" />
                  <input type="hidden" name='transactionId' id='transactionId' value={transaction.id} />
                  <button type='submit' className='btn btn--trash'>
            {
              <>
                <TrashIcon width={20} />
              </>
            }
          </button>


                </div>
            </div>
      </fetcher.Form>
  
      </td>
    </>
  )
}

export default TransactionItem