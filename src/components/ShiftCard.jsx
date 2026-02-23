import React from 'react'
import { shiftPageLoader, shiftPageAction } from '../pages/ShiftPage'
import { useFetcher, useParams } from 'react-router-dom'
import { TrashIcon } from '@heroicons/react/24/outline'

const ShiftCard = ({shift}) => {
  const { id } = useParams()
  const fetcher = useFetcher()

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

const creditCardFeesThisShift = transactions.reduce((acc, transaction) => {
  if (transaction.shiftId === id && transaction.payment === "CreditCard") {
    const fee = transaction.fee != null ? +transaction.fee : (+transaction.check * 0.03);
    return acc + fee;
  }
  return acc;
}, 0);

return ( 
  <div className='form-wrapper'>

        <div className="grid-container-card-title">
          <div className='three-fr'>
            <h2 className='accent mb0'>{shift.shift}</h2>
          </div>
          <div className='two-fr'>
            <h6><small>{shift.day} {shift.date}</small></h6>
          </div>
          <div>
            <fetcher.Form 
        method="post"
        className='grid-small'
        onSubmit={(event) => {
            if (!confirm("Delete Shift?")) {
              event.preventDefault()
            } 
          }}>
           
             <div className="expense-inputs">
                <div className="grid-xs">
                  <input type="hidden" name='_action' value="deleteShift" />
                  <input type="hidden" name='shiftId' id='shiftId' value={shift.id} />
                  <button type='submit' className='btn btn--card'>
            {
              <>
                <TrashIcon width={20} />
              </>
            }
          </button>


                </div>
            </div>
      </fetcher.Form>
          </div>
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
              <small>CC Fee (3%):</small>
            </h6>
          </div>
          <div>
            <h6>
              <small><span className="accent">{formatCurrency(creditCardFeesThisShift)}</span></small>
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

        <div className='two-fr'>
          <h6>
            <small>Total + CC Fee:</small>
          </h6>
        </div>
        <div>
          <h6>
            <small><span className="accent">{formatCurrency(creditCardTotalsThisShift + cashTotalsThisShift + giftTotalsThisShift + creditCardFeesThisShift)}</span></small>
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