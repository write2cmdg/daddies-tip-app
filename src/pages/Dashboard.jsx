import React from 'react'

//helper functions
import { createShift, createTransaction, deleteItem, fetchData, waait } from '../helpers'
import { Link, redirect, useLoaderData } from 'react-router-dom'
import Intro from '../components/Intro'
import { toast } from 'react-toastify'
import AddShiftForm from '../components/AddShiftForm'
import Table from '../components/Table'

//loader
export function dashboardLoader() {
    const userName = fetchData("userName")
    const shifts = fetchData("shifts")
    const transactions = fetchData("transactions")
    return { userName, shifts, transactions }
}

//action
export async function dashboardAction({ request }) {
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
        // Call createShift and capture the returned ID
        const newShiftId = createShift({
            shift: values.newShift
        });

        // Show success toast
        toast.success('Shift started');
        return redirect(`ShiftPage/${newShiftId}`);

    } catch (e) {
        throw new Error("There was a problem starting your shift")
    }
    }
    //new Transaction
    if (_action === "createTransaction") {
        try {
            createTransaction({
                check: values.newCheckTotal,
                tips: values.newCheckTips,
                payment: values.newPaymentType,
            })
            const updatedTransactions = fetchData("transactions") || []
            localStorage.setItem("transactions", JSON.stringify(updatedTransactions))
            return toast.success('Check succesfully added')
        } catch (e) {
            throw new Error("There was a problem adding this check")
        }
    }
    //Delete Transaction
    if (_action === "deleteTransaction") {
        try {
            deleteItem({
                key: "transactions",
                id: values.transactionId,
            });
            return toast.success('Transaction deleted')
        } catch (e) {
            throw new Error("There was a problem deleting the transaction")
        }
    }
}

const Dashboard = () => {
    const { userName, shifts, transactions } = useLoaderData()

  return (
    <>
       {userName ? (
        <div className="dashboard">
            <h1>Hi, <Link to='UserPage' className='accent'>{userName}</Link></h1>
            <div className="grid-sm">
                {/* Shifts ? () : () */}
                <div className="grid-lg">
                    <div className="flex-lg">
                        <AddShiftForm />
                    </div>
                </div>
                        <div>
                            {
                                !shifts && (
                                    <div className="grid-md">
                                        <h2><small>Create a shift to begin.</small></h2>
                                    </div>
                                )
                                }
                                {
                                shifts && shifts.length > 0 && (
                                    <div className="grid-md">
                                        <h2>Shift History:</h2>
                                        <Table shifts={shifts.sort((a, b) => b.createdAt - a.createdAt) } />
                                    </div>
                                )
                            }
                        </div>
            </div>
        </div>
        ) : <Intro />}     
    </>
  )
}

export default Dashboard
