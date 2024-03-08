import React from 'react'
import { Link, useNavigate, useRouteError } from 'react-router-dom'
import { HomeIcon } from '@heroicons/react/24/outline'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid'


const Error = () => {
    const error = useRouteError()
    const navigate = useNavigate()

  return (
    <div className='error'>
      <h1>Uh oh! there was a problem!</h1>
      <p>{error.message || error.statusText}</p>
      <div className='flex-md'>
        <button 
            className='btn btn--dark'
            onClick={() => navigate(-1)}
            >
            <ArrowUturnLeftIcon width={20} />
            <span>Back</span>
        </button>
        <Link 
        to="/"
        className='btn btn--dark'
        >
        <HomeIcon width={20} />
        <span>Home</span>
        </Link>
      </div>
    </div>
  )
}

export default Error
