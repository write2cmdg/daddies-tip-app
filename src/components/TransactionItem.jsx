import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline'


const TransactionItem = ({ transaction }) => {
  const rawPayment = transaction.payment
  const checkFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(transaction.check);
  const tipsFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(transaction.tips);



  return (
    <>
      <td>{checkFormatted}</td>
      <td>{tipsFormatted}</td>
      <td>{rawPayment.includes('Card') ? rawPayment.replace('Card', ' Card') : rawPayment}</td>
      <td> <Link to='/' className='btn'><ArrowsPointingOutIcon height={20} /></Link> </td>
    </>
  )
}

export default TransactionItem