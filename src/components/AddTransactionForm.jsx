import React, { useEffect, useRef, useState } from "react";
import { useFetcher, useParams } from "react-router-dom";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

const AddTransactionForm = () => {
  const fetcher = useFetcher();
  const formRef = useRef();
  const focusRef = useRef();
  const [selected, setSelected] = useState("CreditCard");
  const [checkTotal, setCheckTotal] = useState("");
  const [checkTips, setCheckTips] = useState("");
  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
      setSelected("CreditCard");
      setCheckTotal("");
      setCheckTips("");
    }
  }, [isSubmitting]);

  let { id } = useParams();
  const shiftId = id;

  const formatCurrencyInput = (value, setter) => {
    let inputValue = value.replace(/\D/g, "");
    if (!inputValue) return setter("");
    setter((parseInt(inputValue, 10) / 100).toFixed(2));
  };

  return (
    <div className="form-wrapper">
      <fetcher.Form method="post" className="grid-small" ref={formRef}>
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newCheckTotal">Add a new check:</label>
            <input
              type="tel"
              inputMode="decimal"
              name="newCheckTotal"
              id="newCheckTotal"
              placeholder="Enter Check Total"
              value={checkTotal}
              onChange={(e) => formatCurrencyInput(e.target.value, setCheckTotal)}
              ref={focusRef}
              required
            />
        
            <label htmlFor="newCheckTips" hidden>
              Enter TIPS total:
            </label>
            <input
              style={{
                maxHeight: '4rem'
              }}
              type="tel"
              inputMode="decimal"
              name="newCheckTips"
              id="newCheckTips"
              placeholder="Enter TIPS total"
              value={checkTips}
              onChange={(e) => formatCurrencyInput(e.target.value, setCheckTips)}
              required
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newPaymentType">Select one:</label>
            <select
              value={selected}
              name="newPaymentType"
              id="newPaymentType"
              required
              onChange={(e) => setSelected(e.target.value)}
            >
              <option ref={focusRef} key="CreditCard" value="CreditCard">
                Credit Card
              </option>
              <option key="Cash" value="Cash">
                Cash
              </option>
              <option key="GiftCard" value="GiftCard">
                Gift Card
              </option>
            </select>
            <input type="hidden" name="_action" value="createTransaction" />
            <input type="hidden" name="shiftId" id="shiftId" value={shiftId} />
            <button type="submit" className="btn btn--dark btn--width" disabled={isSubmitting}>
              {isSubmitting ? <p>Processing...</p> : <>
                <span>Add Check</span>
                <CurrencyDollarIcon width={20} />
              </>}
            </button>
          </div>
        </div>
      </fetcher.Form>
    </div>
  );
};

export default AddTransactionForm;