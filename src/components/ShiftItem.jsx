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

      {/* Due Tips Input */}
      <td>
        <input
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          className="input input--dueTips"
          style={{
            width: '4rem',       // adjusted width here
            textAlign: 'right',
            fontVariantNumeric: 'tabular-nums',
            MozAppearance: 'textfield' // Firefox spinner removal
          }}
        />
      </td>

      {/* Toggle Button */}
      <td>
        <button
          onClick={() => onTipsStatusToggle(shift.id)}
          style={{
            backgroundColor: tipsStatus === 'due' ? '#f87171' : '#34d399',
            color: 'white',
            fontWeight: 'bold',
            padding: '0.25rem 0.75rem',
            borderRadius: '0.375rem',
          }}
        >
          {tipsStatus === 'due' ? 'DUE' : 'Paid'}
        </button>
      </td>

      {/* Edit Link */}
      <td>
        <Link to={`/ShiftPage/${shift.id}`} className='btn btn--home'>
          <PencilIcon height={20} />
        </Link>
      </td>
    </>
  )
}

export default ShiftItem
