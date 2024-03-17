import React from 'react'

//helper functions
import { createShift, fetchData, waait } from '../helpers'
import { useLoaderData } from 'react-router-dom'
import Intro from '../components/Intro'
import { toast } from 'react-toastify'
import AddShiftForm from '../components/AddShiftForm'

//loader
export function dashboardLoader() {
    const userName = fetchData("userName")
    const shifts = fetchData("shifts")
    return { userName, shifts }
}

//action
export async function dashboardAction({ request }){
    await waait()
    const data = await request.formData()
    const {_action, ...values} = Object.fromEntries(data)

    //new user submission
    if (_action === "newUser") {
        try {
            localStorage.setItem("userName", JSON.stringify(values.userName))
            return toast.success(`Welcome, ${values.userName}!`)
        } catch (e) {
            throw new Error("There was a problem. Try again")
        }
    }
    //new shift
    if (_action === "newShift") {
        try {
            createShift({
                shift: values.newShift,
            })
            return toast.success('Shift started')
        } catch (e) {
            throw new Error("There was a problem starting your shift")
        }
    }
}

const Dashboard = () => {
    const { userName } = useLoaderData()

  return (
    <>
       {userName ? (
        <div className="dashboard">
            <h1>Welcome back, <span className='accent'>{userName}</span></h1>
            <div className="grid-sm">
                {/* Shifts ? () : () */}
                <div className="grid-lg">
                    <div className="flex-lg">
                        <AddShiftForm />
                    </div>
                </div>
            </div>
        </div>
        ) : <Intro />}     
    </>
  )
}

export default Dashboard
