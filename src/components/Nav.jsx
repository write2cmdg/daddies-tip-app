import React from 'react'

//assets
import logomark from "../assets/logomark.svg"

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
        <img src={logomark} alt="" height={30} />
        <span>Daddies App</span>
        </NavLink>
        {
            userName && (
                <Form
                    method="post"
                    action="/logout"
                    onSubmit={(event) => {
                        if (!confirm("Delete user and all data?")) {
                            event.preventDefault()
                        }
                    }}
                >
                    <button type="submit" className='btn btn--warning'>
                        <span>Delete user</span>
                        <TrashIcon width={20} />
                    </button>

                </Form>
            )
        }
    </nav>
  )
}

export default Nav
