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
    <nav className='container2'>
        <NavLink
        to="/"
        aria-label='Go to Home'
        >
            <div>
                 <img src={daddiesLogo} alt="" width={300} /> 
            </div>
        </NavLink>
        {
            userName && (
                <Form className='container3'
                    method="post"
                    action="/logout"
                    onSubmit={(event) => {
                        if (!confirm("This will delete user and all shifts. Continue?")) {
                            event.preventDefault()
                        } else {
                            if (!confirm('This action is permanent. Continue?')) {
                                event.preventDefault()
                            }
                        }
                    }}
                >
                    <div className='container-logout'>
                        <button type="submit" className='btn btn--warning'>
                            <span>Delete User</span>
                            <TrashIcon width={20} />
                        </button>
                    </div>

                </Form>
            )
        }
    </nav>
  )
}

export default Nav
