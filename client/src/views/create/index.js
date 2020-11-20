import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import API from '../../api'


function Create(){
    return(
        <div>
        <div> Create a tweet </div>
        <br/>
         <input type="text" placeholder="Type a tweet"/>
        </div>
    )
}