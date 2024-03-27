import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline'

const ShiftItem = ({ shift }) => {
  return (
    <>
      <td>{shift.date}</td>
      <td>{shift.day}</td>
      <td>{shift.shift}</td>
      <td>Pending</td>
      <td> <Link to='/ShiftPage' className='btn'><ArrowsPointingOutIcon height={20} /></Link> </td>
    </>
  )
}

export default ShiftItem
