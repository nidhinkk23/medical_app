import React, { useState, useEffect, useContext } from 'react'
import Axios from 'axios'
import InputSearch from './InputSearch'
import CustomizedSnackbars from '../addProduct/SnackBar'
import Carousel from './Carousel'
import "./ShowProduct.css"
import { UserConsumer } from '../context/context'

export default function ShowProduct(props) {
    let stateShow = {
        accounts: [],
        show: false,



    }
    let openData = {
        open: false,
        data: ""
    }
    const [open, setOpen] = React.useState(openData);
    const [state, setState] = useState(stateShow)
    const [filterData, setFilterData] = useState({ accounts: [] })
    //This method call in useEffect
    let id = localStorage.getItem("id")
    let getAllAccount = () => {
        const url = `https://react-shopping-cart-fa82c.firebaseio.com/addproduct.json`

        let axiosGetProduct = async () => {
            try {

                let response = await Axios.get(url)
                console.log("response Data from id", response.data);
                let arr = [];
                for (const key in response.data) {

                    arr.push({
                        ...response.data[key],
                        id: key
                    }
                    )

                }
                setState({
                    accounts: arr
                })
                setFilterData({
                    accounts: arr
                })
            } catch (error) {
                console.log("error ", error);

            }
        }

        axiosGetProduct()



    }

    useEffect(() => {
        getAllAccount()

    }, [])


    let dataFn = (valueI) => {
        console.log("value from inputSearch ", valueI);
        if (valueI.length === 0) {
            setFilterData({
                ...state,
                accounts: state.accounts
            })

        }
        else {
            if (state.accounts !== null) {
                let filterdData = state.accounts.filter((value) => {
                    console.log(value);

                    return value.productName.includes(valueI)
                })
                console.log("value in filterdData ", filterdData);
                setFilterData({
                    accounts: filterdData
                })
            }


        }



    }

    let idUser = localStorage.getItem("idUser")
    //Adding the cart-data to database
    let buttonClick = (value) => {

        if (localStorage.getItem('login') !== 'true') {
            console.log("inside if")
            setOpen({
                variant: "error",
                open: true,
                data: "Please Login"
            })
            setTimeout(() => {
                setOpen({
                    ...open,
                    variant: "error",
                    open: false,

                })
            }, 2000);
        } else {
            setOpen({
                open: true,
                variant: "success",
                data: "Successfully Added"
            })
            setTimeout(() => {
                setOpen({
                    ...open,
                    open: false,
                    variant: "success",
                    
                })
            }, 2000);
            console.log("value by clicking the button ", value)

            const formData = {
                ...value,
                count: 1
            }
            console.log("formData: ", formData);
            const url = `https://react-shopping-cart-fa82c.firebaseio.com/addcart/${idUser}.json`

            let axiosAddCart = async () => {
                try {
                    let response = await Axios.post(url, formData)
                    console.log("response ", response);
                    const status = response.status
                    console.log("status :", status);
                    if (status === 200) {
                        
                        console.log("Successfully Added to the Cart");

                        // props.history.push("/cart")

                    } else {
                        console.log("Failed to Add");

                    }
                } catch (error) {
                    console.log(error);

                }


            }
            axiosAddCart()





        }


    }
    const data = useContext(UserConsumer)
    let Buye = (value) => {
        if (localStorage.getItem('login') !== 'true') {
            console.log("inside if");
            setOpen({
                open: true,
                variant: "error",
                data: "Please Login"
            })
            setTimeout(() => {
                setOpen({
                    ...open,
                    variant: "error",
                    open: false,

                })
            }, 2000);


        } else {
            console.log(data);
            data.buyeData(value)

            props.history.push('/checkout')
        }
    }
    const imgStyle = {
        width: '120px',
        height: '120px'
    }



    return (
        <>
            <div className="bg-primary ">
                <InputSearch dataFn={dataFn} />

            </div>
            <div>
                <Carousel />
            </div>
            <div className=" mt-5 mb-3 container-fluid">
                {filterData.accounts !== undefined || filterData.accounts !== null ? filterData.accounts.map((value, index) => {


                    return <div className=" col-md-3 col-sm-5  card float-left card-class">
                        <div className="card-body ">

                            <h6 className='text'>{value.productName}</h6>
                            <img src={value.image} className="mt-3 ml-2" style={imgStyle} alt="img"></img>
                            <div className='text-primary'>{value.brand}</div>
                            <div>price:{value.price}</div>

                            <div className='col-md-12 col-sm-12'>
                                <div className="col-md-6 col-sm-6 float-left">
                                    <button onClick={() => {
                                        buttonClick(value)
                                    }} className="mt-3 btn btn-primary">AddCart</button>

                                </div>
                                <div className="col-md-6 col-sm-6 float-left">
                                    <button onClick={() => {
                                        Buye(value)
                                    }} className="mt-3 btn btn-primary">Buy</button>

                                </div>
                            </div>

                        </div>

                    </div>






                }) : null}
            </div>
            <CustomizedSnackbars open={open} />
        </>
    )
}



