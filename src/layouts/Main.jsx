import React from 'react'
//assets
import footerImg from '../assets/footer-img.png'
import headerImg from '../assets/header-img.png'

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
        <div className="header-img">
          <img src={headerImg} alt="" />
        </div>
        <Nav userName={userName} />

        <main>
            <Outlet />
        </main>
        <div className="footer">
          <img src={footerImg} alt="" />
        </div>
    </div>
  )
}

export default Main
