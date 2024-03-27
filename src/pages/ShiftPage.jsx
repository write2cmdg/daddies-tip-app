import React from 'react'
import { createTransaction, fetchData, waait } from '../helpers'
import AddTransactionForm from '../components/AddTransactionForm'
import { useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import TransactionsTable from '../components/TransactionsTable'


//loader
export function shiftPageLoader() {
    const userName = fetchData("userName")
    const shifts = fetchData("shifts")
    const transactions = fetchData("transactions")
    return { userName, shifts, transactions }
}

//action
export async function shiftPageAction({ request }){
    await waait()
    const data = await request.formData()
    const {_action, ...values} = Object.fromEntries(data)
    

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
}

const ShiftPage = () => {
    const { userName, shifts, transactions } = useLoaderData()

    
    return (
        <>
            <AddTransactionForm />
            <div className="grid-md">
            {
                transactions && transactions.length > 0 && (
                    <div className="grid-md">
                        <h2>Shift History</h2>
                        <TransactionsTable transactions={transactions.sort((a, b) => b.createdAt - a.createdAt) } />
                    </div>
                )
            }
            </div>



            {/* <ul>
            {
                transactions.map((transaction) => (
                    <li key={transaction.id}>
                        {`Check Total: ${transaction.check}, TIPS: ${transaction.tips}, Payment: ${transaction.payment}`}
                    </li>
                ))
            }
            </ul> */}
        </>
  )
}



export default ShiftPage