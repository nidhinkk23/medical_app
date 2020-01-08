import React, { useContext } from 'react'
import UserContext from '../context/context'

export default function Profile() {

    const context = useContext(UserContext)
    console.log("profile ", context.details);
    // let details = context.details
    let details=JSON.parse(localStorage.getItem("details"))
    console.log("details from localS ",details);
    
    const role = localStorage.getItem('role')
    return (
        <div>
            <div className="card col-md-5 offset-md-4 offset-sm-2 mt-5 col-sm-4" >
            {details!==null? <div className="card-body offset-md-2 offset-sm-1">
                {details.gender==='male'?<img src="https://cdn.pixabay.com/photo/2013/07/13/10/00/face-156456__340.png" alt='img'></img>:
                    <img src="https://cdn.pixabay.com/photo/2013/07/13/10/00/face-156459__340.png" alt='img'></img>     }
                   
                    <h5 className="card-title">{details.firstName}</h5>
                    <p className="card-text">email: {details.email}</p>
                    <p className="card-text">Gender: {details.gender}</p>
                    <p className="card-text">Role: {role}</p>
                </div>:null}
               
            </div>
        </div>
    );
}
