/* import React, { useEffect, useRef, useState } from "react";
import { useFetcher, useParams } from "react-router-dom";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

const AddDueTipsForm = () => {
  const fetcher = useFetcher();
  const formRef = useRef();
  const focusRef = useRef();
  const [selected, setSelected] = useState("CreditCard");
  const [checkTotal, setCheckTotal] = useState("");
  const [checkTips, setCheckTips] = useState("");
  const [dueTips, setDueTips] = useState("");
  const [tipsStatus, setTipsStatus] = useState("");
  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
      setSelected("CreditCard");
      setCheckTotal("");
      setDueTips("");
      setTipsStatus("");
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
            <label htmlFor="newDueTips">your cut tonight:</label>
            <input
              type="tel"
              inputMode="decimal"
              name="newDueTips"
              id="newDueTips"
              placeholder="Enter your tips"
              value={dueTips}
              onChange={(e) => formatCurrencyInput(e.target.value, setDueTips)}
              ref={focusRef}
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

export default AddDueTipsForm; */
import React, { useEffect, useRef, useState } from "react";
import { useFetcher, useParams } from "react-router-dom";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

const AddDueTipsForm = () => {
  const fetcher = useFetcher();
  const formRef = useRef();
  const focusRef = useRef();
  const [selected, setSelected] = useState("CreditCard");
  const [dueTips, setDueTips] = useState("");
  const [tipsStatus, setTipsStatus] = useState("due"); // default
  const isSubmitting = fetcher.state === "submitting";

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
      setDueTips("");
      setTipsStatus("");
    }
  }, [isSubmitting]);

  let { id } = useParams();
  const shiftId = id;

  const formatCurrencyInput = (value, setter) => {
    let inputValue = value.replace(/\D/g, "");
    if (!inputValue) return setter("");
    setter((parseInt(inputValue, 10) / 100).toFixed(2));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dueTipsObject = {
      newDueTips: dueTips,
      shiftId,
      tipsStatus,
    };

    console.log("Submitting Due Tips:", dueTipsObject);

    // Removed formRef.current.submit() to prevent navigation/404
    // Add local saving logic here if needed
  };

  return (
    <div className="form-wrapper">
      <fetcher.Form
        method="post"
        className="grid-small"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newDueTips">your cut tonight:</label>
            <input
              type="tel"
              inputMode="decimal"
              name="newDueTips"
              id="newDueTips"
              placeholder="Enter your tips"
              value={dueTips}
              onChange={(e) => formatCurrencyInput(e.target.value, setDueTips)}
              ref={focusRef}
            />
          </div>

          <div className="grid-xs">
            <label
              htmlFor="tipsStatusToggle"
              style={{ display: "block", marginBottom: 4 }}
            >
              Status: <strong>{tipsStatus === "paid" ? "Paid" : "Due"}</strong>
            </label>
            <button
              type="button"
              id="tipsStatusToggle"
              onClick={() =>
                setTipsStatus(tipsStatus === "paid" ? "due" : "paid")
              }
              style={{
                padding: "8px 16px",
                backgroundColor: tipsStatus === "paid" ? "#22c55e" : "#ef4444", // green/red
                color: "white",
                border: "none",
                borderRadius: 9999,
                cursor: "pointer",
                userSelect: "none",
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              {tipsStatus === "paid" ? "Paid" : "Due"}
            </button>
            <input type="hidden" name="tipsStatus" value={tipsStatus} />
          </div>

          <div className="grid-xs">
            <input type="hidden" name="_action" value="createTransaction" />
            <input type="hidden" name="shiftId" id="shiftId" value={shiftId} />


            <button
              type="submit"
              className="btn btn--dark btn--width"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <p>Processing...</p>
              ) : (
                <>
                  <span>Add Tips</span>
                  <CurrencyDollarIcon width={20} />
                </>
              )}
            </button>
          </div>
        </div>
      </fetcher.Form>
    </div>
  );
};

export default AddDueTipsForm;
