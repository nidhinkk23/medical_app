import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { NativeSelect, Select, InputLabel } from '@material-ui/core';
import Axios from 'axios';



export default function CreateAccount(props) {
    let states = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confPassword: "",
        gender: "",
        mobile:""

    }
    let stateShow = {
        accounts: [],
    }
    const [valEmail, setvalEmail] = useState({ vale: false, errore: "" })
    const [valPass, setvalPass] = useState({ valp: false, errorp: "" })
    const [valFName, setvalFName] = useState({ valf: false, errorf: "" })
    const [valGender, setvalGender] = useState({ valg: false, errorg: "" })
    const [valConfPass, setvalConfPass] = useState({ valpc: false, errorpc: "" })
    const [valMobile, setvalMobile] = useState({ valm: false, errorm: "" })

    const [product, setproduct] = useState(stateShow)
    const [state, setState] = useState(states)
    let handleChange = (event) => {
        const value = event.target.value

        setState({
            ...state,
            [event.target.name]: value
        })

        console.log("state ", state);

    }
    let handleSubmit = (event) => {
        console.log(state);

        console.log("submitted");
        event.preventDefault();

        const { firstName } = state
        const { lastName } = state
        const { email } = state
        const { password } = state
        const { confPassword } = state
        const { gender } = state
        const { mobile } = state


        console.log(firstName);

        if (firstName.trim().length === 0 || mobile.trim().length===0 ||confPassword.trim().length !== password.trim().length || confPassword.trim().length === 0 || lastName.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0 || !(/^\w+([/.-]?\w+)@\w+([/.-]?\w+)(\.\w{2,3})+$/.test(email.trim()))) {
            console.log("failed");
            if(mobile.trim().length===0){
                console.log("if");
                
                setvalMobile({
                    valm:true,
                    errorm:"mobile number should not be zero"
                })
            }else if(mobile.trim().length!==10 ){
                console.log("mob");
                
                setvalMobile({
                    valm:true,
                    errorm:"mobile number is invalid"
                })
            }
            else{
                console.log("else");
                
                setvalMobile({
                    ...valMobile,
                    valm:false,
                    
                })
            }
            if (confPassword.trim().length !== password.trim().length) {
                setvalConfPass({
                    valpc: true,
                    errorpc: "password should be same"
                })
            } else {
                setvalConfPass({
                    ...valConfPass,
                    valpc: false,

                })
            }
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
            if (firstName.trim().length === 0) {
                setvalFName({
                    valf: true,
                    errorf: "first name should not be empty"
                })
            } else {
                setvalFName({
                    ...valFName,
                    valf: false,

                })
            }

            if (gender.trim().length === 0) {
                setvalGender({
                    valg: true,
                    errorg: "please select the gender"
                })
            } else {
                setvalGender({
                    ...valGender,
                    valg: false,

                })
            }


        } else {
            console.log("sucess");
            saveData()

        }
    }


    let saveData = async (events) => {

        const formData = {
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            password: state.password,
            role: state.role,
            gender: state.gender,
            product: product.accounts
            
        }
        console.log(formData);
        const url = `https://react-shopping-cart-fa82c.firebaseio.com/account.json`
        try {
            let response = await Axios.post(url, formData)
            console.log("response from server ", response);


            const status = response.status
            console.log("status :", status);
            if (status === 200) {

                console.log("Successfully Created")
                props.history.push('/login')


            } else {
                console.log("Failed to create");

            }
        } catch (error) {
            console.log(error);

        }


    }
    useEffect(() => {

        getAllProduct()
    }, [])

    let getAllProduct = async () => {

        const url = "https://react-shopping-cart-fa82c.firebaseio.com/addproduct.json"
        try {
            let response = await Axios.get(url)
            console.log("response Data", response.data);
            let arr = []
            for (let key in response.data) {
                const account = response.data[key]

                arr.push({

                    ...account,
                    id: key,
                    wis: false
                })
            }
            setproduct({
                ...product,
                accounts: arr
            })



        } catch (error) {
            console.log(error);

        }
    }









    const style = {
        color: 'red',
        fontSize: '15px'
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div >


                <Typography className='mb-3 mt-5' component="h1" variant="h5">
                    Sign up
        </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField autoComplete="fname"
                                name="firstName"
                                value={state.firstName}
                                onChange={handleChange}
                                variant="outlined"
                                required
                                fullWidth
                                placeholder="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                placeholder="Last Name"
                                name="lastName"
                                value={state.lastName}
                                onChange={handleChange}
                                autoComplete="lname"
                            />
                        </Grid>
                        {valFName.valf ?
                            <p className="offset-md-1 offset-sm-1" style={style}>{valFName.errorf}</p> : null}

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                value={state.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        {valEmail.vale ?
                            <p className="offset-md-1 offset-sm-1" style={style}>{valEmail.errore}</p> : null}
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="mobile"
                                value={state.mobile}
                                onChange={handleChange}
                                placeholder="Mobile Number"
                                name="mobile"
                                autoComplete="email"
                            />
                        </Grid>
                        {valMobile.valm ?
                                <p className=" mt-3 offset-md-1 offset-sm-1" style={style}>{valMobile.errorm}</p> : null}


                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Select className="offset-md-2 mt-2 mb-2"
                                    native
                                    value={state.gender}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: 'gender',

                                    }}
                                >
                                    <option value="">Gender</option> />
                                    <option value="male">Male</option>
                                    <option value="femalae">Female</option>
                                    <option value="others">Others</option>
                                </Select>
                            </Grid>
                            {valGender.valg ?
                                <p className=" mt-3 " style={style}>{valGender.errorg}</p> : null}

                        </Grid>
                        <Grid item xs={12}>
                            <TextField className="mb-3"
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                value={state.password}
                                onChange={handleChange}
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        {valPass.valp ?
                            <p className='offset-md-1 offset-sm-1' style={style}>{valPass.errorp}</p> : null}

                    </Grid>
                    <Grid item xs={12}>
                        <TextField className="mb-3"
                            variant="outlined"
                            required
                            fullWidth
                            name="confPassword"
                            value={state.confPassword}
                            onChange={handleChange}
                            label="ConfirmPassword"
                            type="password"
                            id="confPassword"
                            autoComplete="current-password"
                        />
                    </Grid>
                    {valConfPass.valpc ?
                        <p className='offset-md-1 offset-sm-1' style={style}>{valConfPass.errorpc}</p> : null}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"

                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
              </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>

        </Container>
    );
}