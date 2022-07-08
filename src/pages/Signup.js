import React, { useState } from "react";
import { userSignup } from "../Api/auth";
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, MenuItem, Box } from "@material-ui/core"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function Signup({ handleChange }) {

  //styles
  const paperStyle = { padding: "34px 20px", width: 339, margin: "0 auto" }
  const avatarStyle = { backgroundColor: "#3F51B5" }
  const marginBtw = { margin: "5px auto" }
  const linkStyle = { color: "#3F51B5" }
  const selectStyle={margin:"10px"}

  //sign-up states

  const [showSignup, setShowSignup] = useState(false); //togglesignup
  const [message, setMessage] = useState("");

  const [userId, setUserId] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userType, setUserType] = useState("CUSTOMER")
  const [error, setError] = useState(false)


  //signUp
  const signupFn = (e) => {
    const data = {
      name: userName,
      userId: userId,
      email: userEmail,
      userType: userType,
      password: userPassword
    };


    console.log("DATA", data);

    e.preventDefault();


    userSignup(data).then(function (response) {
      if (response.status === 201) {
        // setShowSignup(false)
        clearState()
        setError(false)
        setMessage("User Signed Up Successfully...")
      }
    })
      .catch(function (error) {
        if (error.response.status === 400) {
          setError(true)
          setMessage(error.response.data.message);

        }
        else
          console.log(error);
      });
  };



  //update singup data
  const updateSignupData = (e) => {
    setMessage("")
    if (e.target.id === "userId")
      setUserId(e.target.value)
    else if (e.target.id === "password")
      setUserPassword(e.target.value)
    else if (e.target.id === "password")
      setUserPassword(e.target.value)
    else if (e.target.id === "username")
      setUserName(e.target.value)
    else
      setUserEmail(e.target.value)
  };


  //toggle-signup-signin
  // const toggleSignup = () => {
  //   clearState();
  //   setShowSignup(!showSignup);

  // }


  const handleSelect = (e) => {
    setUserType(e.target.value)

  }

  const clearState = () => {
    setMessage("")
    setError(false)
    setUserId("")
    setUserPassword("")
    setUserName("")
    setUserEmail("")


  }





  //render
  return (
    <Grid>
      <Paper style={paperStyle} >
        <Grid align="center">
          <Avatar style={avatarStyle} ><AddCircleIcon /></Avatar>
          <h2 >Sign Up</h2>

        </Grid>
        <form onSubmit={signupFn} >
          <TextField id="username" value={userName} onChange={updateSignupData} variant="filled" label='Name' placeholder='Enter Name' style={marginBtw} fullWidth required />

          <TextField id="userId" value={userId} onChange={updateSignupData} variant="filled" label='UserId' placeholder='Enter UserId' style={marginBtw} fullWidth required />

          <TextField id="email" value={userEmail} onChange={updateSignupData} variant="filled" label='Email' placeholder='Enter Email' style={marginBtw} fullWidth required />

          <TextField id="password" value={userPassword} onChange={updateSignupData} variant="filled" label='Password' placeholder='Enter Password' style={marginBtw} type='password' fullWidth required />

          {/* new select field */}

          <Box 
          // sx={{ minWidth: 120 }}
          >
            <FormControl fullWidth>
              <InputLabel style={selectStyle} id="demo-simple-select-label">User Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userType}
                label="User Type"
                onChange={handleSelect}
                variant="filled"
                // style={selectStyle}
              >
                
                  <MenuItem
                    key={userType}
                    value={"CUSTOMER"}
                  >
                  CUSTOMER
                  </MenuItem>

                  <MenuItem
                    key={userType}
                    value={"ENGINEER"}
                  >
                  ENGINEER
                  </MenuItem>

              </Select>
            </FormControl>
          </Box>


          <Button type='submit' variant='contained' onClick={()=>toast(message)}  style={{ margin: "5px auto" }} fullWidth color="primary">
            Sign Up
          </Button>

          <Typography style={marginBtw} > Already a member?
            <Link href="#" style={linkStyle} onClick={() => handleChange("event", 0)} >
              Sign In
            </Link>
          </Typography>
        </form>

      </Paper>
      <ToastContainer/>
    </Grid>
  )
}

export default Signup