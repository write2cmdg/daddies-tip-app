import React from 'react'
import { shiftPageLoader } from '../pages/ShiftPage'
import { useParams } from 'react-router-dom'
import { TrashIcon } from '@heroicons/react/24/outline'


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
  <div className='form-wrapper'>
        <div className="container3">
          <h2 className='accent mb0'>{shift.shift}</h2>
          <h6><small>{shift.day} {shift.date}</small></h6>
          {/* <form action="submit"> */}
            <button className='btn btn--card'>
              <TrashIcon width={20} />
            </button>
          {/* </form> */}
        </div>
        <div className="grid-container">

          <div className='two-fr'>
            <h6>
              <small>Credit Card:</small>
            </h6>
          </div>
          <div>
            <h6>
              <small><span className='accent'>{formatCurrency(creditCardTotalsThisShift)}</span></small>
            </h6>
          </div>

          <div>
            <h6>
              <small>Tips: </small>
            </h6>
          </div>
          <div>
            <h6>
              <small><span className="accent">{formatCurrency(creditCardTipsThisShift)}</span></small>
            </h6>
          </div>

          <div className='two-fr'>
            <h6>
              <small>Cash: </small>
            </h6>
          </div>
          <div>
            <h6>
              <small><span className="accent">{formatCurrency(cashTotalsThisShift)}</span></small>
            </h6>
          </div>

          <div>
            <h6>
              <small>Tips: </small>
            </h6>
          </div>
          <div>
            <h6>
              <small><span className="accent">{formatCurrency(cashTipsThisShift)}</span> </small>
            </h6>
          </div>

          <div className='two-fr'>
            <h6>
              <small>Gift Card: </small>
            </h6>
          </div>
          <div>
            <h6>
              <small><span className="accent">{formatCurrency(giftTotalsThisShift)}</span></small>
            </h6>
          </div>

          <div>
            <h6>
            <small>Tips: </small>
            </h6>
          </div>  
          <div>
            <h6>
            <small><span className="accent">{formatCurrency(giftTipsThisShift)}</span> </small>
            </h6>
          </div>  

        <div className='two-fr'>
          <h6>
            <small>Grand Total:</small>
          </h6>
        </div>
        <div>
          <h6>
            <small><span className="accent">{formatCurrency(creditCardTotalsThisShift + cashTotalsThisShift + giftTotalsThisShift)}</span></small>
          </h6>
        </div>

        <div>
          <h6>
            <small> All Tips: </small>
          </h6>
        </div>
        <div>
          <h6>
            <small><span className="accent">{formatCurrency(creditCardTipsThisShift + cashTipsThisShift + giftTipsThisShift)}</span></small>
          </h6>
        </div>
        </div>
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