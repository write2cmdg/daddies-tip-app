import React from 'react'

//components
import ShiftItem from './ShiftItem.jsx'

//rrd
import Link from 'react-router-dom'


const Table = ({ shifts }) => {
  return (
    <div className='table'>
        <table>
            <thead>
                <tr>
                    {
                        [ "Date", "Day", "Shift", "Status" ].map((i, index) => (
                            <th key={index}>{i}</th>
                        ))
                    }

                </tr>
            </thead>
            <tbody>
                {
                    shifts.map((shift) => (
                        <tr>
                            <ShiftItem shift={shift} />
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default Table
