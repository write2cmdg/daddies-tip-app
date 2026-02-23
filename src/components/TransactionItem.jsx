import React, { useEffect, useState } from 'react'
import { useFetcher } from 'react-router-dom'
import { BanknotesIcon, CreditCardIcon, GiftIcon, TrashIcon } from '@heroicons/react/24/outline'

const TransactionItem = ({ transaction }) => {
  const rawPayment = transaction.payment
  const fetcher = useFetcher()

  const [checkEdit, setCheckEdit] = useState(String(transaction.check ?? "0.00"));
  const [tipsEdit, setTipsEdit] = useState(String(transaction.tips ?? "0.00"));

  useEffect(() => {
    setCheckEdit(String(transaction.check ?? "0.00"));
  }, [transaction.check]);

  useEffect(() => {
    setTipsEdit(String(transaction.tips ?? "0.00"));
  }, [transaction.tips]);

  const formatCurrencyInput = (value, setter) => {
    let inputValue = value.replace(/\D/g, "");
    if (!inputValue) return setter("");
    setter((parseInt(inputValue, 10) / 100).toFixed(2));
  };

  const isSaving =
    fetcher.state === "submitting" &&
    fetcher.formData?.get("_action") === "updateTransaction";

  return (
    <>
      <td>
        <input
          type="tel"
          inputMode="decimal"
          value={checkEdit}
          onChange={(e) => formatCurrencyInput(e.target.value, setCheckEdit)}
          placeholder="0.00"
          style={{ maxWidth: "7rem" }}
        />
      </td>

      <td>
        <div style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
          <input
            type="tel"
            inputMode="decimal"
            value={tipsEdit}
            onChange={(e) => formatCurrencyInput(e.target.value, setTipsEdit)}
            placeholder="0.00"
            style={{ maxWidth: "7rem" }}
          />

          <fetcher.Form method="post" className="grid-small">
            <input type="hidden" name="_action" value="updateTransaction" />
            <input type="hidden" name="transactionId" value={transaction.id} />
            <input type="hidden" name="newCheck" value={checkEdit ? checkEdit : "0.00"} />
            <input type="hidden" name="newTips" value={tipsEdit ? tipsEdit : "0.00"} />
            <button type="submit" className="btn btn--card" disabled={isSaving}>
              {isSaving ? "..." : "Save"}
            </button>
          </fetcher.Form>
        </div>
      </td>

      <td>
        {rawPayment === "GiftCard" && <GiftIcon width={20} />}
        {rawPayment === "Cash" && <BanknotesIcon width={20} />}
        {rawPayment === "CreditCard" && <CreditCardIcon width={20} />}
      </td>

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
                <TrashIcon width={20} />
              </button>
            </div>
          </div>
        </fetcher.Form>
      </td>
    </>
  )
}

export default TransactionItem