//react
import React, { useEffect, useRef, useState } from 'react'

//rrd
import { useFetcher } from 'react-router-dom'

//library imports
import { CurrencyDollarIcon } from '@heroicons/react/24/outline'


const AddTransactionForm = () => {
    const fetcher = useFetcher()
    const formRef = useRef()
    const focusRef = useRef()
    const [selected, setSelected] = useState("CreditCard")
    const isSubmitting = fetcher.state === "submitting"

    useEffect(() => {
      if(!isSubmitting) {
        formRef.current.reset()
        focusRef.current.focus()
        setSelected("CreditCard")
      }
    }, [isSubmitting])

  return (
    <div className='form-wrapper'>
      <h2>Add new transaction</h2>
      <fetcher.Form 
        method='post' 
        className='grid-small' 
        ref={formRef}>
            <div className="expense-inputs">
                <div className="grid-xs">
                    <label htmlFor="newCheckTotal">Check amount:</label>
                    <input 
                        type="number"
                        step='0.01'
                        inputMode='decimal'
                        name='newCheckTotal'
                        id='newCheckTotal'
                        placeholder='Enter amount'
                        ref={focusRef}
                        required />
                </div>
                <div className="grid-xs">
                    <label htmlFor="newCheckTips">TIPS amount:</label>
                    <input 
                        type="number"
                        step='0.01'
                        inputMode='decimal'
                        name='newCheckTips'
                        id='newCheckTips'
                        placeholder='Enter amount'
                        required />
                </div>
                <div className="grid-xs">
                <label 
                htmlFor="newPaymentType" 
                >Payment Type:</label>
          <select
            value={selected}
            name='newPaymentType'
            id='newPaymentType'
            required
            onChange={e => setSelected(e.target.value)}>
                <option ref={focusRef} key="CreditCard" value="CreditCard">Credit Card</option>
                <option key="Cash" value="Cash">Cash</option>
                <option key="GiftCard" value="GiftCard">Gift Card</option>
          </select>
          <input type="hidden" name='_action' value="createTransaction" />
          <button type='submit' className='btn btn--dark' disabled={isSubmitting}>
            {(isSubmitting) ? (
              <p>Processing...</p>
            ) : (
              <>
                <span>Add Check</span>
                <CurrencyDollarIcon width={20} />
              </>
            )}
          </button>

                </div>
            </div>
      </fetcher.Form>
    </div>
  )
}

export default AddTransactionForm
