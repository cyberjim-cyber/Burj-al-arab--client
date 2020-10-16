import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,

  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import Bookings from '../Bookings/Bookings';


const Book = () => {


    const [loggedInUser, setLoggedInUser]=useContext(UserContext)
    const {bedType} = useParams();
    const [selectedDate, setSelectedDate] = useState({
        checkIn:new Date(),
        checkOut:new Date()
    });

    const handlecheckIn = (date) => {
        const newdate={...selectedDate}
        newdate.checkIn=date;
      setSelectedDate(newdate);
    };
    const handlechekout = (date) => {
        const newdate={...selectedDate}
        newdate.checkOut=date;
      setSelectedDate(newdate);
    };
const handlebooking=()=>{

const another={...loggedInUser,...selectedDate}

fetch('http://localhost:4000/addBooking',{

method: 'POST',
headers:{'content-Type': 'application/json'},
body: JSON.stringify(another)



})
.then(res=>res.json())
.then(data=>{
    console.log(data)
})

}

  

    return (
        <div style={{textAlign: 'center'}}>
            <h1>  Hello {loggedInUser.name} Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate.checkIn}
          onChange={handlecheckIn}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedDate.checkOut}
          onChange={handlechekout}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        /> 
        
      </Grid>
    </MuiPickersUtilsProvider>
    <Button onClick={handlebooking} variant="contained" color="primary">confirm</Button>

    <Bookings></Bookings>
        </div>
    );
};

export default Book;