import React, { useState } from "react";
import { userSignin } from "../Api/auth";
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from "@material-ui/core"
import LockIcon from '@mui/icons-material/Lock';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({handleChange}) {

    // styles 
    const paperStyle = { padding: "21px 20px", height: '91.1vh', margin: "0 auto" }
    const avatarStyle = { backgroundColor: "#3F51B5" }
    const marginBtw={margin:"5px auto"}


    // sign-in states
    // const [showSignup, setShowSignup] = useState(false); //togglesignup
    const [message, setMessage] = useState("");
  
    const [userId, setUserId] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userType, setUserType] = useState("CUSTOMER")
    const [error, setError] = useState(false)


    const history = useNavigate();

    //sign-in functions

  // Login 
  const loginFn = (e) => {

    const data = {
      userId: userId,
      password: userPassword,
    };
    console.log("DATA", data);
    e.preventDefault();

    userSignin(data)
      .then(function (response) {
        console.log(response);

        //userId, email, userType, userStatis, token
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("userTypes", response.data.userTypes);
        localStorage.setItem("userStatus", response.data.userStatus);
        localStorage.setItem("token", response.data.accessToken);

        if (response.data.userTypes === "CUSTOMER") {
          history("/customer");
        } else if (response.data.userTypes === "ENGINEER") {
          history("/engineer");
        } else {
          history("/admin");
        }

        if (response.status === 200) {
        
          setMessage("User Signed Up Successfully...")
        }

      })
      .catch(function (error) {
        if (error.response.status === 400) {
          setMessage(error.response.data.message);
        } else {
          console.log(error);
          setMessage(error.resonse.data.message);

        }
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


  // const handleSelect = (e) => {
  //   setUserType(e)

  // }

//   const clearState = () => {
//     setMessage("")
//     setError(false)
//     setUserId("")
//     setUserPassword("")
//     setUserName("")
//     setUserEmail("")


//   }

// console.log(message)
 



    return (
        <Grid>
            <Paper  style={paperStyle} >
                <Grid align="center">
                    <Avatar style={avatarStyle} ><LockIcon /></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                {/* outlined-basic */}
                <form onSubmit={loginFn} >
                <TextField id="userId" variant="filled" value={userId} onChange={updateSignupData} label='UserId' placeholder='Enter UserId' style={marginBtw} fullWidth required />
              
                <TextField id="password" variant="filled" value={userPassword}  onChange={updateSignupData} label='Password' placeholder='Enter Password' style={marginBtw} type='password' fullWidth required />
         
                <Button type='submit' variant='contained' onClick={()=>toast(message)} style={marginBtw}  fullWidth color='primary'>
                    Sign In
                </Button>
               
               {/* toggle to sing-up */}
                <Typography style={marginBtw} > Not a member?
                    <Link href="#" onClick={()=>handleChange("event",1)} >
                        Sign up
                    </Link>
                </Typography>
                </form>
            </Paper>
            <ToastContainer/>
        </Grid>
    )
}

export default Login