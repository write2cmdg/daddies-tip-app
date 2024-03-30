import React from 'react'
//assets
import wave from '../assets/wave.svg'

//helper functions
import { fetchData } from '../helpers'
import { Link, Outlet, useLoaderData, useNavigate } from 'react-router-dom'

//components
import Nav from '../components/Nav'
import { ArrowUturnLeftIcon, HomeIcon } from '@heroicons/react/24/outline'

//loader
export function mainLoader() {
    const userName = fetchData("userName")
    return { userName }
}

const Main = () => {
    const { userName } = useLoaderData()
  return (
      <div>
        <Nav userName={userName} />
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default Main
