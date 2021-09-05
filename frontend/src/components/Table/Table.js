import React from 'react'
import './Table.css'
const Table = ({orderDetails}) => {
    const calculateAllTotals = () => {
        let totalCost = 0
        let totalQuantity = 0
        for (let i = 0; i < orderDetails.sneakers.length; i++) {
            totalCost += orderDetails.sneakers[i].amount_total
            totalQuantity += orderDetails.sneakers[i].quantity
        }
        
        return {totalCost: (totalCost / 100).toFixed(2), totalQuantity: totalQuantity}
    }

    return (
        <div>
            <table className = "order_table">
                    <thead>
                        <tr>
                            <th>Sneaker</th>
                            <th>Quantity</th>
                            <th>Cost</th>
                        </tr>
                    </thead>

                {
                    orderDetails.sneakers.map((sneaker) => {
                    return(
                        <tbody key = {sneaker.id}>
                            <tr>
                                <td>{sneaker.description}</td>
                                <td>{sneaker.quantity}</td>
                                <td>${(sneaker.amount_total / 100).toFixed(2)}</td>
                            </tr>
                        </tbody>
                    
                    )})
                }
                <tbody>
                    <tr>
                        <td>Total</td>
                        <td>{calculateAllTotals().totalQuantity}</td>
                        <td>${calculateAllTotals().totalCost}</td>
                    </tr>
                </tbody>
                </table>
            
        </div>
    )
}

export default Table
