import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PencilIcon } from '@heroicons/react/24/solid'
import { getAllMatchingItems } from '../helpers'

const shiftAbbreviations = {
  Dinner: 'D',
  Lunch: 'L',
  Brunch: 'B',
  Delivery: 'GO',
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  if (isNaN(date)) return dateString
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${mm}/${dd}`
}

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
    const input = e.target.value.replace(/\D/g, '');
    setRawInput(input);
    const floatValue = parseFloat((parseInt(input || "0", 10) / 100).toFixed(2));
    onDueTipsChange(shift.id, floatValue);
  };

  const displayValue = rawInput
    ? (parseInt(rawInput, 10) / 100).toFixed(2)
    : "";

  const cellStyle = {
    fontSize: '0.65rem',     // Smaller text
    padding: '0.15rem 0.2rem',
    lineHeight: '1.1',
    whiteSpace: 'nowrap'
  };

  return (
    <>
      <td style={cellStyle}>{formatDate(shift.date)}</td>
      <td style={cellStyle}>{shift.day}</td>
      <td style={cellStyle}>{shiftAbbreviations[shift.shift] || shift.shift}</td>

      <td style={cellStyle}>
        <input
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          className="input input--dueTips"
          style={{
            width: '4.25rem',              // wider for 999.99
            fontSize: '0.65rem',
            textAlign: 'left',
            fontVariantNumeric: 'tabular-nums',
            MozAppearance: 'textfield'
          }}
        />
      </td>

      <td style={cellStyle}>
        <button
          onClick={() => onTipsStatusToggle(shift.id)}
          style={{
            backgroundColor: tipsStatus === 'due' ? '#f87171' : '#34d399',
            color: 'white',
            fontWeight: 'bold',
            padding: '0.10rem 0.4rem',
            fontSize: '0.65rem',
            borderRadius: '0.15rem',
            minWidth: '2rem',
            textAlign: 'center',
            whiteSpace: 'nowrap'
          }}
        >
          {tipsStatus === 'due' ? 'DUE' : 'Paid'}
        </button>
      </td>

      <td style={cellStyle}>
        <Link to={`/ShiftPage/${shift.id}`} className='btn btn--home'>
          <PencilIcon height={12} />
        </Link>
      </td>
    </>
  )
}

export default ShiftItem
