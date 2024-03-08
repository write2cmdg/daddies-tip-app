import React from 'react'

import { Form } from 'react-router-dom'

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import splashImg from '../assets/margherita.jpeg'

const Intro = () => {
  return (
    <div className='intro'>
      <div>
        <img src={splashImg} alt="" width={400}/>

        <p>Enter your name to start shift.</p>
        <Form method="post">
            <input 
                type="text" 
                name="userName" 
                required placeholder='Enter your name' 
                aria-label='Your name' 
                autoComplete='given-name'
            />
            <button type='submit' className='btn btn--dark'>
                <span>Start Shift</span>
                <ArrowTopRightOnSquareIcon width={20}/>  
            </button>
        </Form>
      </div>
    </div>
  )
}

export default Intro
