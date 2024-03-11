import React from 'react'

//assets
import logomark from "../assets/logomark.svg"
import daddiesLogo from '../assets/daddies-logo-blk-transp.png'

//rrd
import { Form, NavLink } from 'react-router-dom'

//library imports
import { TrashIcon } from "@heroicons/react/24/solid"

const Nav = ({userName}) => {
  return (
    <nav>
        <NavLink
        to="/"
        aria-label='Go to Home'
        >
            <div className='container'>
             <img src={daddiesLogo} alt="" /> 

            </div>
        </NavLink>
        {
            userName && (
                <Form
                    method="post"
                    action="/logout"
                    onSubmit={(event) => {
                        if (!confirm("Ready to close out?")) {
                           } else {
                            if (!confirm("Any payouts, comps/voids, gift cards, etc?")) {
                                event.preventDefault()
                            }
                        }
                    }}
                >
                    <button type="submit" className='btn btn--warning'>
                        <span>Closeout</span>
                        <TrashIcon width={20} />
                    </button>

                </Form>
            )
        }
    </nav>
  )
}

export default Nav
