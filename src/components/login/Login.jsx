import React, { useContext, useState, useEffect } from 'react'
import UserContext, { UserProvider } from '../context/context'
import { TextField } from '@material-ui/core'
import Axios from 'axios'
import NavBar from '../navbar/NavBar'

export default function Login(props) {
    const context = useContext(UserContext)
    let states = {
        email: "",
        password: "",
        accounts: [],

    }
    const [state, setState] = useState(states)
    const [valEmail, setvalEmail] = useState({ vale: false, errore: "" })
    const [valPass, setvalPass] = useState({ valp: false, errorp: "" })


    let handleChange = (event) => {
        const value = event.target.value
        setState({
            ...state,
            [event.target.name]: value
        })

    }
    const { email, password } = state
    let getAllAccounts = async () => {
        const url = `https://react-shopping-cart-fa82c.firebaseio.com/account.json`
        let response = await Axios.get(url)
        console.log("response", response);
        let arr = []
        for (let key in response.data) {
            console.log("Key ", key);
            //Our data present inside data obj 
            const account = response.data[key]
            console.log("acccount", account);
            //Copying the data
            arr.push(
                {
                    ...account,
                    id: key
                }

            )

        }
        console.log("array ", arr);
        setState({
            ...state,
            accounts: arr
        })

    }
    let onKeyUpValidation = (event) => {
        if (event.target.name === "email") {
            if (email.trim().length === 0 || password.trim().length === 0 || !(/^\w+([/.-]?\w+)@\w+([/.-]?\w+)(\.\w{2,3})+$/.test(email.trim()))) {


                if (email.trim().length === 0) {
                    setvalEmail({
                        vale: true,
                        errore: "email should not be empty"
                    })
                } else if (!(/^\w+([/.-]?\w+)@\w+([/.-]?\w+)(\.\w{2,3})+$/.test(email.trim()))) {
                    setvalEmail({
                        vale: true,
                        errore: "email is invalid"
                    })
                }
                else {
                    setvalEmail({
                        ...valEmail,
                        vale: false,

                    })
                }
            }
        }

        if (event.target.name === "password") {
            if (password.trim().length === 0 || password.trim().match(/[a-z]/g) === null || password.trim().match(/[A-Z]/g) === null || password.trim().match(/[0-9]/g) === null || password.trim().match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) === null) {
                setvalPass({
                    valp: true,
                    errorp: "value should contain one lower case upper case special char and no."
                })

            } else {
                setvalPass({
                    ...valPass,
                    valp: false,

                })
            }

        }

    }
    let validation = (event) => {

        event.preventDefault()

        if (email.trim().length === 0 || password.trim().length === 0 || !(/^\w+([/.-]?\w+)@\w+([/.-]?\w+)(\.\w{2,3})+$/.test(email.trim()))) {


            if (email.trim().length === 0) {
                setvalEmail({
                    vale: true,
                    errore: "email should not be empty"
                })
            } else if (!(/^\w+([/.-]?\w+)@\w+([/.-]?\w+)(\.\w{2,3})+$/.test(email.trim()))) {
                setvalEmail({
                    vale: true,
                    errore: "email is invalid"
                })
            }
            else {
                setvalEmail({
                    ...valEmail,
                    vale: false,

                })
            }
            if (password.trim().length === 0 || password.trim().match(/[a-z]/g) === null || password.trim().match(/[A-Z]/g) === null || password.trim().match(/[0-9]/g) === null || password.trim().match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) === null) {
                setvalPass({
                    valp: true,
                    errorp: "value should contain one lower case upper case special char and no."
                })

            } else {
                setvalPass({
                    ...valPass,
                    valp: true,

                })
            }

        } else {
            handleSubmit()
        }

    }
    let handleSubmit = (event) => {

        // console.log("state.accounts ", state.accounts);
        state.accounts.map((value, index) => {
            // console.log("value ",value);
            
            // console.log(value.email);
            // console.log(value.password);
            if (value.email === state.email && value.password === state.password) {
                localStorage.setItem("details",JSON.stringify(value))
                if(value.email==="nidhinkk8@gmail.com"&& value.password==='Ss@2'){
                    localStorage.setItem("role","Admin")
                }else{
                    localStorage.setItem("role","User")
                }
                console.log("success id", value.id);
                localStorage.setItem("id",value.id)
                context.setRole(value.role)
                
                // localStorage.setItem("value",value)

                context.getDetails(value)
                context.setId(value.id)
                localStorage.setItem("idUser",value.id)
                props.history.push('/showproduct')
                context.setLogin(true)
                localStorage.setItem("login",true)

            } else {

                console.log("fail");
                setvalPass({
                    valp: true,
                    errorp: "invalid password or username"
                })
            }


        })










    }
    useEffect(() => {

        getAllAccounts()


    }, [])

    const style = {
        color: 'red',
        fontSize: '15px'
    }
    return (
        <div>
            {/* <TextField id="standard-basic" label="Standard" /> */}
            <div>
                <form onSubmit={validation}>
                    <div className="form-group col-md-4 col-sm-4 mt-5 mb-5 card   offset-md-4">
                        <h1 className="offset-3" >Login</h1>
                        <TextField className="form-control mb-3"
                            placeholder='Email'
                            name='email'
                            onKeyUp={onKeyUpValidation}
                            value={state.email}
                            onChange={handleChange}
                            type="text"></TextField>
                        {valEmail.vale ?
                            <p style={style}>{valEmail.errore}</p> : null}

                        <TextField className="form-control mb-3"
                            placeholder='password'
                            name='password'
                            onKeyUp={onKeyUpValidation}
                            value={state.password}
                            onChange={handleChange}
                            type="text"></TextField>
                        {valPass.valp ?
                            <p style={style}>{valPass.errorp}</p> : null}

                        <div>

                            <button className="btn btn-outline-info col-md-4 mb-3 mt-3 offset-3 " id="login"
                                type="submit">login</button>

                        </div>
                       


                    </div>


                </form>
            </div>


        </div>
    )
}
