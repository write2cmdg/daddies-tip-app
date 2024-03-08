import React from 'react'

//helper functions
import { fetchData } from '../helpers'
import { useLoaderData } from 'react-router-dom'
import Intro from '../components/Intro'
import { toast } from 'react-toastify'

//loader
export function dashboardLoader() {
    const userName = fetchData("userName")
    return { userName }
}

//action
export async function dashboardAction({request}){
    const data = await request.formData()
    const formData = Object.fromEntries(data)
    try {
        localStorage.setItem("userName", JSON.stringify(formData.userName))
        return toast.success(`Welcome, ${formData.userName}`)
    } catch (e) {
        throw new Error("There was a problem. Try again")
    }
}

const Dashboard = () => {
    const { userName } = useLoaderData()

  return (
    <>
       {userName ? (<p>{userName}</p>) : <Intro />}     
    </>
  )
}

export default Dashboard
