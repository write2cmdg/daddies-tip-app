import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline'
import { getAllMatchingItems } from '../helpers'
import { PencilIcon } from '@heroicons/react/24/solid'

const ShiftItem = ({ shift }) => {
  const thisShift = getAllMatchingItems({
    category: "shifts",
    key: "id",
    value: shift.id
  })[0];
  return (
    <>
      <td>{shift.date}</td>
      <td>{shift.day}</td>
      <td>{shift.shift}</td>
      <td>Pending</td>
      <td> <Link to={`/ShiftPage/${shift.id}`} className='btn btn--home'><PencilIcon height={20} /></Link> </td>
    </>
  )
}

export default ShiftItem
