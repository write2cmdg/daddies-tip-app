import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PencilIcon } from '@heroicons/react/24/solid'
import { getAllMatchingItems } from '../helpers'

const ShiftItem = ({ shift, dueTips, tipsStatus, onDueTipsChange, onTipsStatusToggle }) => {
  const thisShift = getAllMatchingItems({
    category: "shifts",
    key: "id",
    value: shift.id
  })[0];

  const [rawInput, setRawInput] = useState(
    dueTips ? String(Math.round(dueTips * 100)) : ""
  );

  const handleChange = (e) => {
    const input = e.target.value.replace(/\D/g, ''); // only digits
    setRawInput(input);

    const floatValue = parseFloat((parseInt(input || "0", 10) / 100).toFixed(2));
    onDueTipsChange(shift.id, floatValue);
  };

  const displayValue = rawInput
    ? (parseInt(rawInput, 10) / 100).toFixed(2)
    : "";

  return (
    <>
      <td>{shift.date}</td>
      <td>{shift.day}</td>
      <td>{shift.shift}</td>

      {/* Due Tips Input - smaller */}
      <td>
        <input
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          className="input input--dueTips"
          style={{
            width: '4rem',          // smaller width for 999.99
            fontSize: '0.9rem',     // slightly smaller font
            textAlign: 'right',
            fontVariantNumeric: 'tabular-nums',
            MozAppearance: 'textfield' // Firefox - remove spinner
          }}
        />
      </td>

      {/* Toggle Button - smaller */}
      <td>
        <button
          onClick={() => onTipsStatusToggle(shift.id)}
          style={{
            backgroundColor: tipsStatus === 'due' ? '#f87171' : '#34d399',
            color: 'white',
            fontWeight: 'bold',
            padding: '0.15rem 0.5rem', // reduced padding
            fontSize: '0.85rem',       // smaller font
            borderRadius: '0.3rem',
            minWidth: '3.5rem',
            textAlign: 'center',
          }}
        >
          {tipsStatus === 'due' ? 'DUE' : 'Paid'}
        </button>
      </td>

      <td>
        <Link to={`/ShiftPage/${shift.id}`} className='btn btn--home'>
          <PencilIcon height={20} />
        </Link>
      </td>
    </>
  )
}

export default ShiftItem
