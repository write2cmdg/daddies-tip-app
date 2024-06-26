import React from 'react'

//assets
import logomark from "../assets/logomark.svg"
import daddiesLogo from '../assets/daddies-logo-blk-transp.png'

//rrd
import { Form, Link, NavLink } from 'react-router-dom'

//library imports
import { HomeIcon, UserMinusIcon } from '@heroicons/react/24/outline'

const UserPage = () => {
    return (
        <>
        <div className='container-delete-user'>
            <div className="form-wrapper">
                <div className="flex-xs">
                    <div className="warning-container">
                        <p>Click the button to delete User, <br/>shifts and all transactions.
                        <br/>This action is permanent.</p>
                    </div>
                </div>
                <Form
                    method="post"
                    action="/logout"
                    onSubmit={(event) => {
                        if (!confirm("User, shift and transaction history will be deleted. Continue?")) {
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
                            <UserMinusIcon width={20} />
                        </button>
                    </div>

                </Form>
            </div>
        </div>
                <div className="error">
                    <div className='flex-md'>
                        <Link to="/" className='btn btn--home'>
                            <HomeIcon width={30} />
                        </Link>
                    </div>
                </div>
                </>
    )
}

export default UserPage
