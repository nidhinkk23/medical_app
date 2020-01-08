import React, { useState } from 'react'
import Axios from 'axios'
import CustomizedSnackbars from './SnackBar'
export default function AddProduct(props) {

    let addPdtState = {
        productName: "",
        brand: "",
        price: "",
        quantity: "",
        image: ""

    }
    let valPrdctData = {
        valN: false,
        errorN: ""
    }
    let valBrandData = {
        valB: false,
        errorB: ""
    }
    let valPriceData = {
        valP: false,
        errorP: ""
    }
    let valImageData = {
        valI: false,
        errorI: ""
    }
    let valQtyData = {
        valQ: false,
        errorQ: ""
    }


    //state
  const [open, setOpen] = React.useState(false);

    const [state, setstate] = useState(addPdtState)

    const [valPrdct, setValPrdct] = useState(valPrdctData)
    const [valBrand, setvalBrand] = useState(valBrandData)
    const [valPrice, setValPrice] = useState(valPriceData)
    const [valQuantity, setValQuantity] = useState(valQtyData)
    const [valImage, setValImage] = useState(valImageData)

    //call at onChange evet
    let handleChange = (event) => {
        const value = event.target.value
        console.log(value);
        setstate({
            ...state,
            [event.target.name]: value

        })
        console.log("state: ", state);
    }
    const { productName, brand, price, quantity, image } = state
    //onKeyUp Validation
    let keyUpVal = (event) => {
        if (event.target.name === 'productName') {
            if (!productName.trim().match(/^[a-z A-Z]+$/)) {

                setValPrdct(
                    {
                        ...valPrdct,
                        valN: true,
                        errorN: "product name should not be  number "
                    })
            } else if (productName.trim().length > 20) {

                setValPrdct(
                    {
                        ...valPrdct,
                        valN: true,
                        errorN: "product name should less than 20 "
                    })
            } else {
                setValPrdct({
                    ...valPrdct,
                    valN: false
                })
            }
        }
        if (event.target.name === 'brand') {
            if (!brand.trim().match(/^[a-zA-Z]+$/)) {
                setvalBrand({
                    valB: true,
                    errorB: "brand name should not be number  "
                })
            }
            else if (brand.trim().length > 20) {
                setvalBrand({
                    valB: true,
                    errorB: "brand name should less than 20 "
                })
            } else {
                setvalBrand({
                    ...valBrand,
                    valB: false
                })
            }
        }
        if (event.target.name === 'price') {
            if (!price.trim().match(/^[0-9]+$/)) {
                setValPrice({
                    valP: true,
                    errorP: "price should be number "
                })
            } else {
                setValPrice({
                    ...valPrice,
                    valP: false
                })
            }
        }
        if (event.target.name === 'quantity') {
            if (!quantity.trim().match(/^[0-9]+$/)) {
                setValQuantity({
                    valQ: true,
                    errorQ: "Quantity should be number"
                })
            }
            else {
                setValQuantity({
                    ...valQuantity,
                    valQ: false
                })
            }
        }
        if (event.target.name === 'image') {
            if (image.trim().length > 30) {
                setValImage({

                    valI: false,
                    errorI: "not more than 30 character "
                })
            } else {
                setValImage({
                    ...valImage,
                    valI: false
                })
            }
        }


    }




    //validation
    let validation = (event) => {
        event.preventDefault()
        
        if (productName.trim().length < 2 || !productName.trim().match(/^[a-zA-Z]+$/) || brand.trim().length === 0 || price.trim().length === 0 || quantity.trim().length === 0 || image.trim().length < 3) {
            console.log("validation failed");
            if (!productName.trim().match(/^[a-z A-Z]+$/) || productName.trim().length < 2) {

                if (!productName.trim().match(/^[a-z A-Z]+$/)) {

                    setValPrdct(
                        {
                            ...valPrdct,
                            valN: true,
                            errorN: "product name should not be  number "
                        })
                }
                else if (productName.trim().length < 2 || productName.trim().length > 20) {
                    console.log();

                    setValPrdct({
                        ...valPrdct,
                        valN: true,
                        errorN: "product name should grater than 1 and less than 20"
                    })

                } else {
                    setValPrdct({
                        ...valPrdct,
                        valN: false
                    })
                }
            }
            if (brand.trim().length === 0 || !brand.trim().match(/^[a-zA-Z]+$/) || brand.trim().length > 20) {
                if (brand.trim().length === 0 || brand.trim().length > 20) {
                    setvalBrand({
                        valB: true,
                        errorB: "brand name should not be empty and less than 20 "
                    })
                }
                else if (!brand.trim().match(/^[a-zA-Z]+$/)) {
                    setvalBrand({
                        valB: true,
                        errorB: "brand name should not be number "
                    })
                }
            } else {
                setvalBrand({
                    ...valBrand,
                    valB: false
                })
            }
            if (price.trim().length === 0 || price.trim().match(/^[a-zA-Z]+$/) || price.trim().length > 20) {
                if (price.trim().length === 0 || price.trim().length > 20) {
                    setValPrice({
                        valP: true,
                        errorP: "price should not be empty"
                    })
                }
                else if (price.trim().match(/^[a-zA-Z]+$/)) {
                    setValPrice({
                        valP: true,
                        errorP: "price should be number "
                    })
                }
            }
            else {
                setValPrice({
                    ...valPrice,
                    valP: false
                })
            }
            if (quantity.trim().length === 0 || quantity.trim().match(/^[a-zA-Z]+$/) || quantity.trim().length < 4) {
                if (quantity.trim().length === 0) {
                    setValQuantity({
                        valQ: true,
                        errorQ: "Quantity should not be empty"
                    })
                } else if (quantity.trim().match(/^[a-zA-Z]+$/)) {
                    setValQuantity({
                        valQ: true,
                        errorQ: "Quantity should be number"
                    })
                }
            }
            else {
                setValQuantity({
                    ...valQuantity,
                    valQ: false
                })
            }
            if (image.trim().length === 0) {
                setValImage({
                    valI: true,
                    errorI: "Please add image url"
                })

            } else {
                setValImage({
                    ...valImage,
                    valI: false
                })
            }




        } else {
            setOpen(true)
            saveData()
        }
    }






    //call in validation if validated
    let saveData = (event) => {

        const formData = state
        console.log("formData: ", formData);
        // const url = "http://localhost:8080/shoppingcart/addproduct"
        const url = "https://react-shopping-cart-fa82c.firebaseio.com/addproduct.json"

        let axiosAddProduct = async () => {
            try {
                let response = await Axios.post(url, formData)
                console.log("response ", response);
                const status = response.status
                console.log("status :", status);
                if (status === 200) {
                    
                    console.log("Successfully Added");
                    
                    props.history.push("/showproduct")

                } else {
                    console.log("Failed to Add");

                }
            } catch (error) {
                console.log(error);

            }


        }
        axiosAddProduct()




    }


    const style = {
        color: 'red',
        fontSize: '15px'
    }

    return (
        <>
            <form onSubmit={validation} className="card mt-4 container col-md-6 colsm-4">
                <div className="form-group mt-3">
                    <h1>Add Product</h1>
                    <label for="">Product Name:</label>
                    <input type="text"
                        onKeyUp={keyUpVal}
                        value={state.productName}
                        onChange={handleChange}
                        className="form-control" name="productName" id="" aria-describedby="helpId" placeholder="" />
                    {valPrdct.valN ? <small style={style} id="helpId" className="form-text">{valPrdct.errorN}</small> : null}
                </div>
                <div className="form-group">
                    <label for="">Brand:</label>
                    <input type="text"
                        onKeyUp={keyUpVal}
                        value={state.brand}
                        onChange={handleChange}
                        className="form-control" name="brand" id="" aria-describedby="helpId" placeholder="" />
                    {valBrand.valB ? <small id="helpId" style={style} className="form-text">{valBrand.errorB}</small> : null}

                </div>
                <div class="form-group">
                    <label for="">Price:</label>
                    <input type="text"
                        onKeyUp={keyUpVal}
                        value={state.price}
                        onChange={handleChange}
                        className="form-control" name="price" id="" aria-describedby="helpId" placeholder="" />
                    {valPrice.valP ? <small id="helpId" style={style} className="form-text">{valPrice.errorP}</small> : null}
                </div>
                <div class="form-group">
                    <label for="">Quantity:</label>
                    <input type="text"
                        onKeyUp={keyUpVal}
                        value={state.quantity}
                        onChange={handleChange}
                        className="form-control" name="quantity" id="" aria-describedby="helpId" placeholder="" />
                    {valQuantity.valQ ? <small id="helpId" style={style} className="form-text ">{valQuantity.errorQ}</small> : null}
                </div>
                <div className="form-group">
                    <label for="">Image url:</label>
                    <input type="text"
                        onKeyUp={keyUpVal}
                        value={state.image}
                        onChange={handleChange}
                        className="form-control" name="image" id="" aria-describedby="helpId" placeholder="" />
                    {valImage.valI ? <small id="helpId" style={style} className="form-text">{valImage.errorI}</small> : null}

                    <button name="" id="" className="btn btn-primary mt-1"  >AddProduct</button>

                </div>

            </form>
            <CustomizedSnackbars open = {open}/>

        </>
    )
}
