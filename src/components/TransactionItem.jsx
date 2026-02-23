import React, { useEffect, useRef, useState } from 'react'
import { useFetcher } from 'react-router-dom'
import { BanknotesIcon, CreditCardIcon, GiftIcon, TrashIcon } from '@heroicons/react/24/outline'

const TransactionItem = ({ transaction }) => {
  const rawPayment = transaction.payment

  const updateFetcher = useFetcher()
  const deleteFetcher = useFetcher()

  const [checkEdit, setCheckEdit] = useState(String(transaction.check ?? "0.00"));
  const [tipsEdit, setTipsEdit] = useState(String(transaction.tips ?? "0.00"));

  const timerRef = useRef(null);

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

  const submitUpdate = (nextCheck, nextTips) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      const fd = new FormData();
      fd.append("_action", "updateTransaction");
      fd.append("transactionId", transaction.id);
      fd.append("newCheck", nextCheck ? nextCheck : "0.00");
      fd.append("newTips", nextTips ? nextTips : "0.00");
      updateFetcher.submit(fd, { method: "post" });
    }, 350);
  };

  const inputStyle = {
    maxWidth: "6rem",
    fontSize: ".85rem",
    padding: ".25rem .4rem",
    textAlign: "right"
  };

  return (
    <>
      <td>
        <input
          type="tel"
          inputMode="decimal"
          value={checkEdit}
          onChange={(e) => {
            const raw = e.target.value;
            formatCurrencyInput(raw, (next) => {
              setCheckEdit(next);
              submitUpdate(next, tipsEdit);
            });
          }}
          placeholder="0.00"
          style={inputStyle}
        />
      </td>

      <td>
        <input
          type="tel"
          inputMode="decimal"
          value={tipsEdit}
          onChange={(e) => {
            const raw = e.target.value;
            formatCurrencyInput(raw, (next) => {
              setTipsEdit(next);
              submitUpdate(checkEdit, next);
            });
          }}
          placeholder="0.00"
          style={inputStyle}
        />
      </td>

      <td>
        {rawPayment === "GiftCard" && <GiftIcon width={20} />}
        {rawPayment === "Cash" && <BanknotesIcon width={20} />}
        {rawPayment === "CreditCard" && <CreditCardIcon width={20} />}
      </td>

      <td>
        <deleteFetcher.Form
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
              <input type="hidden" name='transactionId' value={transaction.id} />
              <button type='submit' className='btn btn--trash'>
                <TrashIcon width={20} />
              </button>
            </div>
          </div>
        </deleteFetcher.Form>
      </td>
    </>
  )
}

export default TransactionItem