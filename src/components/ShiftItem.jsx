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
  // stored format is "MM-DD-YY" -> display "MM/DD/YY"
  const s = String(dateString || "");
  const parts = s.split("-");
  if (parts.length === 3) {
    const [mm, dd, yy] = parts;
    if (mm && dd && yy) return `${mm}/${dd}/${yy}`;
  }
  return s;
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
    fontSize: '0.65rem',
    padding: '0.1rem 0.1rem',
    lineHeight: '1',
    whiteSpace: 'nowrap',
    fontWeight: 'bold'
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
            width: '4.25rem',
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
            fontWeight: 'bolder',
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