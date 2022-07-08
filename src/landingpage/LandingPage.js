import React from 'react'
import img from "../assets/landing.svg"
import { Button } from '@material-ui/core'
import "./landing.css"



const linkTo = () => {
    window.location.href = "/singin"
}


function LandingPage() {

    return (
        <div className='i'>
            <div className='i-left'>
                <img src={img} alt="" />
            </div>
            <div className='i-right'>
                <h1 className='heading'>
                    Customer Relationship Management
                </h1>
                <p>
                    Connect your different departments,
                    from marketing to sales to customer service, and organizes their notes, activities,
                    and metrics into one cohesive system.
                </p>

                <Button variant="outlined" color="primary" onClick={linkTo} >
                    GET STARTED
                </Button>




            </div>

        </div>
    )
}

export default LandingPage