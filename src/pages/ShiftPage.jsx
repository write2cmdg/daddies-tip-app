import React from 'react'
import { createTransaction, deleteItem, fetchData, waait, updateTransaction, updateShiftDate } from '../helpers'
import AddTransactionForm from '../components/AddTransactionForm'
import { Link, redirect, useLoaderData, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import TransactionsTable from '../components/TransactionsTable'
import ShiftCard from '../components/ShiftCard'
import { HomeIcon } from '@heroicons/react/24/outline'

//loader
export function shiftPageLoader() {
    const userName = fetchData("userName")
    const shifts = fetchData("shifts")
    const transactions = fetchData("transactions")
    return { userName, shifts, transactions }
}

//action
export async function shiftPageAction({ request, transactions }) {
    await waait()
    const data = await request.formData()
    const { _action, ...values } = Object.fromEntries(data)
    
    //new Transaction
    if (_action === "createTransaction") {
        try {
            createTransaction({
                check: values.newCheckTotal,
                tips: values.newCheckTips,
                payment: values.newPaymentType,
                shiftId: values.shiftId
            })
            const updatedTransactions = fetchData("transactions") || []
            localStorage.setItem("transactions", JSON.stringify(updatedTransactions))
            return toast.success('Check succesfully added')
        } catch (error) {
            console.error("Error deleting shift:", error);
            throw new Error("There was a problem adding this check")
        }
    }

    //update Transaction (check + tips)
    if (_action === "updateTransaction") {
        try {
            updateTransaction({
                transactionId: values.transactionId,
                check: values.newCheck,
                tips: values.newTips,
            });
            return toast.success('Transaction updated')
        } catch (e) {
            throw new Error("There was a problem updating the transaction")
        }
    }

    //update Shift date
    if (_action === "updateShiftDate") {
        try {
            updateShiftDate({
                shiftId: values.shiftId,
                isoDate: values.newShiftDate,
            });
            return null
        } catch (e) {
            throw new Error("There was a problem updating the shift date")
        }
    }

    //Delete Transaction
    if (_action === "deleteTransaction") {
        try {
            deleteItem({
                key: "transactions",
                id: values.transactionId,
            });
            console.log('transactionId: ', values.shiftId)
            return toast.success('Transaction deleted')
        } catch (e) {
            throw new Error("There was a problem deleting the transaction")
        }   
    }

    if (_action === "deleteShift") {
        try {
            deleteItem({
                key: "shifts",
                id: values.shiftId,
            }).then(() => {
                toast.success('Shift deleted')
                console.log(values.shiftId)
                return redirect("/")
            }).catch((error) => {
                console.error("Error deleting shift:", error);
                toast.error("There was a problem deleting the shift");
                return null
            });
        } catch (e) {
            console.error("Error deleting shift:", e);
            toast.error("There was a problem deleting the shift");
        }
    }

    return redirect("/")
}

const ShiftPage = () => {
    const { userName, shifts, transactions } = useLoaderData();
    const { id } = useParams();
    
    // Find the shift with the same id as the parameter id
    const selectedShift = shifts && shifts.find(shift => shift.id === id);

    // Filter transactions based on the shiftId
    const filteredTransactions = transactions ? transactions.filter(transaction => transaction.shiftId === id) : [];
    return (
        <>
            <div className='budgets'>
            <AddTransactionForm />
                {/* Render the selected shift if found */}
                {selectedShift && <ShiftCard key={selectedShift.id} shift={selectedShift} />}
            </div>
            <div className="grid-md">
                {filteredTransactions.length > 0 && (
                    <div className="grid-md">
                        <h3 className='h2'>Transactions:</h3>
                        <TransactionsTable transactions={filteredTransactions.sort((a, b) => b.createdAt - a.createdAt)} />
                    </div>
                )}
                <div className="error">
                    <div className='flex-md'>
                        <Link to="/" className='btn btn--home'>
                            <HomeIcon width={30} />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShiftPage