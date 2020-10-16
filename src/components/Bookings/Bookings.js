import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings,setbookings]= useState([])
    const [loggedInUser, setLoggedInUser]=useContext(UserContext)


    useEffect(()=>{
    fetch('http://localhost:4000/bookings?email='+loggedInUser.email,{

    method: 'GET',
    headers: {'Content-Type': 'application/json',
    authorization:`Bearer ${sessionStorage.getItem('token')}`

   }
    })
    .then(response=>response.json())

    .then(data=>setbookings(data))



    },[])
    console.log(bookings)
    return (
        <div>
            <h2>this is booking{bookings.length}</h2>

            {
                bookings.map(book=><li>{book.name}</li>)
            }
        </div>
    );
};

export default Bookings;