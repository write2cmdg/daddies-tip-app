import React from 'react'
import TransactionItem from './TransactionItem'
import { useLoaderData } from 'react-router-dom'

const TransactionsTable = ({ transactions }) => {
    return (
        <div className='table'>
           
            <table>
                <thead>
                    <tr>
                        {
                            [ "Total", "Tip", "Payment", "" ].map((i, index) => (
                                <th key={index}>{i}</th>
                            ))
                        }
    
                    </tr>
                </thead>
                <tbody>
                    {
                        transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <TransactionItem transaction={transaction} />
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
      )
}

export default TransactionsTable
