import React, { useContext, useState } from 'react'
import UserContext from '../context/context';

export default function PriceCalculation(props) {

    console.log(props);
    let sum = 0
    props.data.map((value) => {
        console.log("price ", value.price);
        let price = parseFloat(value.price)

        sum = sum + price*value.count
    })
  
    localStorage.setItem("total",sum)
    return (
        <>
            <div className='mt-5'>
                <h5 className='offset-md-2 mt-5'>Total : {sum}</h5>
            </div>

        </>
    )
}
