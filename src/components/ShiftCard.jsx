import React from 'react'
import { shiftPageLoader } from '../pages/ShiftPage'
import { useParams } from 'react-router-dom'


const ShiftCard = ({shift}) => {
  const { id } = useParams()

  const { transactions } = shiftPageLoader()

  const formatCurrency = (amount) => {
    return amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
};

 if (transactions) {

   const creditCardTotalsThisShift = transactions.reduce((acc, transaction) => {
     if (transaction.shiftId === id && transaction.payment === "CreditCard") {
       return acc + +transaction.check;
      } else {
        return acc;
    }
}, 0);

  const creditCardTipsThisShift = transactions.reduce((acc, transaction) => {
    if (transaction.shiftId === id && transaction.payment === "CreditCard") {
        return acc + +transaction.tips;
    } else {
        return acc;
    }
}, 0);

  const cashTotalsThisShift = transactions.reduce((acc, transaction) => {
    if (transaction.shiftId === id && transaction.payment === "Cash") {
        return acc + +transaction.check;
    } else {
        return acc;
    }
}, 0);

const cashTipsThisShift = transactions.reduce((acc, transaction) => {
  if (transaction.shiftId === id && transaction.payment === "Cash") {
    return acc + +transaction.tips;
  } else {
    return acc;
  }
}, 0);

const giftTotalsThisShift = transactions.reduce((acc, transaction) => {
  if (transaction.shiftId === id && transaction.payment === "GiftCard") {
    return acc + +transaction.check;
  } else {
    return acc;
  }
}, 0);

const giftTipsThisShift = transactions.reduce((acc, transaction) => {
  if (transaction.shiftId === id && transaction.payment === "GiftCard") {
    return acc + +transaction.tips;
  } else {
        return acc;
    }
}, 0);

return ( 
  <div className='form-wrapper container2'>
      <h2>
        <span className='accent'>{shift.shift} </span> <small>{shift.day} {shift.date}</small> 
        <p><small>Credit: <span className='accent'>{formatCurrency(creditCardTotalsThisShift)}</span>, Tips: <span className="accent">{formatCurrency(creditCardTipsThisShift)}</span></small></p>
        <p><small>Cash: <span className="accent">{formatCurrency(cashTotalsThisShift)}</span>, Tips: <span className="accent">{formatCurrency(cashTipsThisShift)}</span> </small></p>
        <p><small>Gift Card: <span className="accent">{formatCurrency(giftTotalsThisShift)}</span>, Tips: <span className="accent">{formatCurrency(giftTipsThisShift)}</span> </small></p>
        <p><small>Grand Total: <span className="accent">{formatCurrency(creditCardTotalsThisShift + cashTotalsThisShift + giftTotalsThisShift)}</span>, All Tips: <span className="accent">{formatCurrency(creditCardTipsThisShift + cashTipsThisShift + giftTipsThisShift)}</span></small></p>
      </h2>
    </div>
  )
} else {
  return(
    <>
    <div className="form-wrapper">
      <h2><span className='accent'>{shift.shift} </span> <small>{shift.day} {shift.date}</small></h2>
      <h3><small>Add a transactions to view totals...</small></h3> 
    </div>
    <br/>
    </>
  )
}
}

export default ShiftCard
