import React from 'react'

import { Form, useFetcher } from 'react-router-dom'

import { UserPlusIcon } from '@heroicons/react/24/outline'
import splashImg from '../assets/margherita.jpeg'

const Intro = () => {
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === "submitting"

  return (
    <div className='intro'>
      <div>

        <div className='container'>
            <img src={splashImg} alt=""/>
        </div>

        <p className='h3'>Welcome to Daddies' family!</p>
        <fetcher.Form method="post">
            <input 
                type="text" 
                name="userName" 
                required placeholder='Enter your name' 
                aria-label='Your name' 
                autoComplete='given-name'
                />
                <input type="hidden" name='_action' value="newUser" />
                <button type='submit' className='btn btn--dark' disabled={isSubmitting}>
            {(isSubmitting) ? (
              <p>Processing...</p>
            ) : (
              <>
                <span>Join Us!</span>
                < UserPlusIcon width={20} />
              </>
            )}
           </button>
        </fetcher.Form>
      </div>
    </div>
  )
}

export default Intro
