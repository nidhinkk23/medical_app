import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/context'
import Axios from 'axios'

export default function MyOrder() {
    const [state, setstate] = useState([])
    const context = useContext(UserContext)
    let idUser = localStorage.getItem("idUser")
    let getAllAccount = async () => {
        const url = `https://react-shopping-cart-fa82c.firebaseio.com/myorder/${idUser}.json`
        try {
            let response = await Axios.get(url)
            console.log("response Data", response.data);
            let arr = []
            for (let key in response.data) {
                const account = response.data[key]

                arr.push({

                    ...account,
                    id: key,

                })
            }
            console.log("***//", arr);

            setstate({
                ...state,
                state: arr
            })

        } catch (error) {
            console.log(error);

        }



    }


    useEffect(() => {
        getAllAccount()

    }, [])

    let style = {
        height: "150px",
        width: "150px"
    }
    return (
        <div className=''>{state.state !== undefined ? state.state.map((value) => {
            return <div >
                <div className='card col-md-6 float-left'>

                    <div className='card-body'>

                        <div className='col-md-4 float-left'>


                            <img style={style} src={value.image}></img>


                        </div>
                        <div className='col-md-4 float-left'>
                            <div><h4 className='text-primary'> {value.productName}</h4></div>
                            <div> {value.price}</div>
                            <div> {value.brand}</div>
                        </div>

                    </div>

                </div>
            </div>

        }) : null}



        </div>
    )
}
