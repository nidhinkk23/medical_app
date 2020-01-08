import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'//imrr
import { UserProvider } from './components/context/context'
import NavBar from './components/navbar/NavBar'
import "./App.css"
export default class App extends Component {
  state = {
    
    login: false,
    role:false,
    idUser:"",
    price:"",
    details:"",
    bData:"",
    getDetails:(data)=>{
      this.setState({
        details:data
      })
    },
    getPrice:(data)=>{
      this.setState({
        price:data
      })
    },
    setRole:(value)=>{
      console.log("role ",value)
      
      this.setState({
        role:value
      })
    },
    setLogin: (click) => {
      this.authtcn(click)
    },
    setId:(id)=>{
      this.setState({
        idUser:id
      })
    },
    buyeData:(data)=>{
      this.setState({
        bData:data
      })
    }
   
  }


 
  authtcn = (click) => {
    console.log(click);

    localStorage.setItem("login",click)
    this.setState({
      login: click

    })
  }
 

  render() {
    return (
      <Router>

        <UserProvider value={this.state}>
          <NavBar  />

        </UserProvider>

        
      </Router>
    )
  }
}
