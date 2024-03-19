import React from 'react'

const ShiftItem = ({ shift }) => {
  return (
    <>
      <td>{shift.date}</td>
      <td>{shift.day}</td>
      <td>{shift.shift}</td>
    </>
  )
}

export default ShiftItem
