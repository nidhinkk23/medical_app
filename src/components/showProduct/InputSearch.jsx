import React from 'react'

export default function InputSearch(props) {
    return (
        <>

            <input className="col-md-12  " onChange={e => {
                props.dataFn(e.target.value)
            }} type='text' placeholder='Search Product'></input>



        </>
    )
}
