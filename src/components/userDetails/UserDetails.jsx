import React, { useEffect, useState } from 'react'
import Axios from 'axios'

export default function UserDetails() {


    let stateShow = {
        accounts: [],

    }
    const [state, setState] = useState(stateShow)

    let getAllAccount = async () => {
        const url = `https://react-shopping-cart-fa82c.firebaseio.com/account.json`
        let response = await Axios.get(url)
        console.log("response Data from id", response.data);
        let arr = [];
        for (const key in response.data) {

            arr.push({...response.data[key],
                id:key}
                )
           
        }
        setState({
            accounts: arr
        })
        console.log("Array ", arr);


    }
    let deleteUser = async(accToDelete)=>{
       console.log(accToDelete);
       console.log("Account to  be delete ", accToDelete);
       const id = accToDelete.id
       console.log("id ", id);

       const url = `https://react-shopping-cart-fa82c.firebaseio.com/account/` + id + `/.json`


       try {
           const response = await Axios.delete(url)
           console.log("response of delete ", response);

           const myAccounts = [...state.accounts]
           const index = myAccounts.indexOf(accToDelete)
           myAccounts.splice(index, 1)
           console.log("myAccounts ", myAccounts);

           setState({
               ...state,
               accounts: myAccounts
           })
       } catch (error) {
           console.log("error", error);

       }
       
    }



    useEffect(() => {
        getAllAccount()


    }, [])


    return (
        <>
           
                <table className="table">
                   
                        <tr>
                            <th>FirstName</th>
                            <th >LastName</th>
                            <th >Gender  </th>
                            <th >email   </th>
                        </tr>
                   

                   
                   {state.accounts.map((value)=>{
                         return   <tr>
                        <td>{value.firstName}</td>
                        <td >{value.lastName}</td>
                        <td >{value.gender}  </td>
                        <td >{value.email}   </td>
                        <button className="btn btn-primary"
                        onClick={() => {
                            deleteUser(value)
                        }

                        }
                        >Delete</button>
                         </tr>
                   })}
                   

                </table>
           
        </>
    )
}
