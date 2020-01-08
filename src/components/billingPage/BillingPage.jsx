import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../context/context';
import Axios from 'axios';

export default function BillingPage(props) {
  let idUser = localStorage.getItem("idUser")

  // const context = useContext(UserContext)
  let price = localStorage.getItem("total")
  const context = useContext(UserContext)

  let stateShow = {
    accounts: [],

  }
  const [state, setState] = useState(stateShow)

  console.log("props in Cart items ", props)
  //call in the useEffect method
  let getAllAccount = () => {
    const url = `https://react-shopping-cart-fa82c.firebaseio.com/addcart/${idUser}.json`

    let axiosGetProduct = async () => {
      try {
        let response = await Axios.get(url)
        console.log("response Data", response.data);
        let arr = []
        //iterating through the object
        for (let key in response.data) {
          const account = response.data[key]

          arr.push({

            ...account,
            id: key
          })
        }
        console.log("arr ", arr);

        setState({
          accounts: arr
        })




      } catch (error) {
        console.log("error ", error);

      }
    }
    axiosGetProduct()
  }


  //call after mounted(comp. did mount)
  useEffect(() => {
    getAllAccount()

  }, [])

  let uploadMyOrder = () => {
    console.log("uploadMyOrder");
    console.log("state.accounts",state.accounts);
    
    let formData = state.accounts

    formData.map(async (value) => {
      console.log(value);
      try {
        const url = `https://react-shopping-cart-fa82c.firebaseio.com/myorder/${idUser}.json`

        let response = await Axios.post(url,value)

        const status = response.status
        console.log("status :", status);
        if (status === 200) {

          console.log("Successfully Added to myorder")


        } else {
          console.log("Failed to create");

        }


      } catch (error) {
        console.log(error);

      }

    })


  }

  let deleteCart = async () => {
    uploadMyOrder()
    const url = `https://react-shopping-cart-fa82c.firebaseio.com/addcart/${idUser}/.json`

    try {
      const response = await Axios.delete(url)
      console.log("response of delete ", response);

      if (response.status === 200) {
        props.history.push('/checkout')

        console.log("Successfully deleted")


      } else {
        console.log("Failed to create");

      }


    } catch (error) {
      console.log(error);

    }



  }




  console.log("BillingPage ", props);
  return (
    <div className="row">

      <div className='col-md-4 col-sm-4 card  offset-md-4 offset-sm-2 mt-5' >
        <div className="card-body">
          <div className="mt-5 mb-5 "> Total Amount: {price}</div>
          <button className="btn btn-primary" onClick={deleteCart}>BuyeItems</button>
        </div>
      </div>
    </div>
  )
}
