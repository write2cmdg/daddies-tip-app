import React from 'react'

const ShiftCard = ({shift}) => {
  return (
    <div>
      <h2>
        <span className='accent'>{shift.shift} </span> <small>{shift.day} {shift.date}</small> 
      </h2>
    </div>
  )
}

export default ShiftCard
