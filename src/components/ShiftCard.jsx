import React, { useEffect, useRef, useState } from 'react'
import { shiftPageLoader, shiftPageAction } from '../pages/ShiftPage'
import { useFetcher, useParams } from 'react-router-dom'
import { TrashIcon } from '@heroicons/react/24/outline'

const ShiftCard = ({shift}) => {
  const { id } = useParams()
  const fetcher = useFetcher()
  const dateFetcher = useFetcher()

  const { transactions } = shiftPageLoader()

  const [isEditingDate, setIsEditingDate] = useState(false)
  const dateInputRef = useRef(null)

  // local display (so UI updates even if loader data doesn't revalidate)
  const [displayDay, setDisplayDay] = useState(shift.day)
  const [displayDate, setDisplayDate] = useState(shift.date)

  useEffect(() => {
    setDisplayDay(shift.day)
    setDisplayDate(shift.date)
  }, [shift.day, shift.date])

  const formatCurrency = (amount) => {
    return amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
  };

  const toIso = (mmddyy) => {
    // expects "MM-DD-YY"
    const parts = String(mmddyy || "").split("-");
    if (parts.length !== 3) return "";
    const [mm, dd, yy] = parts;
    const y = Number(yy);
    const fullYear = y >= 70 ? `19${yy}` : `20${yy}`;
    return `${fullYear}-${mm}-${dd}`;
  };

  const isoToDisplay = (iso) => {
    // iso: "YYYY-MM-DD"
    const dt = new Date(`${iso}T12:00:00`);
    if (isNaN(dt)) return { day: displayDay, date: displayDate };

    const mm = String(dt.getMonth() + 1).padStart(2, '0');
    const dd = String(dt.getDate()).padStart(2, '0');
    const yy = String(dt.getFullYear()).slice(-2);
    const nextDate = `${mm}-${dd}-${yy}`;

    const nextDay = dt.toLocaleDateString('en-US', { weekday: 'short' });
    return { day: nextDay, date: nextDate };
  };

  const [dateIso, setDateIso] = useState(toIso(shift.date))

  useEffect(() => {
    setDateIso(toIso(shift.date))
  }, [shift.date])

  useEffect(() => {
    if (isEditingDate) {
      setTimeout(() => dateInputRef.current?.focus(), 0)
    }
  }, [isEditingDate])

  const submitShiftDate = (nextIso) => {
    const fd = new FormData()
    fd.append("_action", "updateShiftDate")
    fd.append("shiftId", shift.id)
    fd.append("newShiftDate", nextIso)
    dateFetcher.submit(fd, { method: "post" })
  }

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
        const fee = transaction.fee != null ? +transaction.fee : 0;
        return acc + fee;
      }
      return acc;
    }, 0);

    const totalWithFee =
      creditCardTotalsThisShift +
      creditCardFeesThisShift;

    return ( 
      <div className='form-wrapper'>

        <div className="grid-container-card-title">
          <div className='three-fr'>
            <h2 className='accent mb0'>{shift.shift}</h2>
          </div>

          <div className='two-fr'>
            <h6>
              <small>
                {!isEditingDate ? (
                  <span
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={() => setIsEditingDate(true)}
                    title="Click to edit day/date"
                  >
                    {displayDay} {displayDate}
                  </span>
                ) : (
                  <input
                    ref={dateInputRef}
                    type="date"
                    value={dateIso}
                    onChange={(e) => {
                      const nextIso = e.target.value
                      setDateIso(nextIso)

                      // update UI immediately
                      const next = isoToDisplay(nextIso)
                      setDisplayDay(next.day)
                      setDisplayDate(next.date)

                      // persist
                      submitShiftDate(nextIso)

                      // close editor
                      setIsEditingDate(false)
                    }}
                    onBlur={() => setIsEditingDate(false)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === "Escape") {
                        e.currentTarget.blur()
                        setIsEditingDate(false)
                      }
                    }}
                    style={{
                      width: "9.5rem",
                      fontSize: ".85rem",
                      padding: ".15rem .35rem"
                    }}
                  />
                )}
              </small>
            </h6>
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
                    <TrashIcon width={20} />
                  </button>
                </div>
              </div>
            </fetcher.Form>
          </div>
        </div>

        <div className="grid-container">

          <div>
            <h6><small>Credit Card:</small></h6>
          </div>
          <div>
            <h6><small><span className='accent'>{formatCurrency(creditCardTotalsThisShift)}</span></small></h6>
          </div>

          <div>
            <h6><small>Tips: </small></h6>
          </div>
          <div>
            <h6><small><span className="accent">{formatCurrency(creditCardTipsThisShift)}</span></small></h6>
          </div>

          <div>
            <h6><small>CC Fee (3%):</small></h6>
          </div>
          <div>
            <h6><small><span className="accent">{formatCurrency(creditCardFeesThisShift)}</span></small></h6>
          </div>

          <div>
            <h6><small>Total + Fee:</small></h6>
          </div>
          <div>
            <h6><small><span className="accent">{formatCurrency(totalWithFee)}</span></small></h6>
          </div>

          <div>
            <h6><small>Cash: </small></h6>
          </div>
          <div>
            <h6><small><span className="accent">{formatCurrency(cashTotalsThisShift)}</span></small></h6>
          </div>

          <div>
            <h6><small>Tips: </small></h6>
          </div>
          <div>
            <h6><small><span className="accent">{formatCurrency(cashTipsThisShift)}</span></small></h6>
          </div>

          <div>
            <h6><small>Gift Card: </small></h6>
          </div>
          <div>
            <h6><small><span className="accent">{formatCurrency(giftTotalsThisShift)}</span></small></h6>
          </div>

          <div>
            <h6><small>Tips: </small></h6>
          </div>  
          <div>
            <h6><small><span className="accent">{formatCurrency(giftTipsThisShift)}</span></small></h6>
          </div>  

          <div>
            <h6><small>Grand Total:</small></h6>
          </div>
          <div>
            <h6><small><span className="accent">{formatCurrency(creditCardTotalsThisShift + cashTotalsThisShift + giftTotalsThisShift)}</span></small></h6>
          </div>

          <div>
            <h6><small> All Tips: </small></h6>
          </div>
          <div>
            <h6><small><span className="accent">{formatCurrency(creditCardTipsThisShift + cashTipsThisShift + giftTipsThisShift)}</span></small></h6>
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