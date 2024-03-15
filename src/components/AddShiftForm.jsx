import { ClockIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { Form } from 'react-router-dom'

const AddShiftForm = () => {
  return (
    <div className='form-wrapper'>
      <h2>Start Shift</h2>
      <Form method='post' className='grid-sm'>
        <div className="grid-xs">
          <label htmlFor="newShift">Select One:</label>
           {/*<input type="text" name='newShift' id='newShift' required placeholder='Choose Shift' /> */}
           <select>
              <option value="default">Select Shift</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Brunch</option>
              <option>Delivery</option>
           </select>
           <input type="hidden" name='_action' value="newShift" />
           <button type='submit' className='btn btn--dark'>
            <span>Start Shift</span>
            <ClockIcon width={20} />
           </button>
        </div>
      </Form>
    </div>
  )
}

export default AddShiftForm
