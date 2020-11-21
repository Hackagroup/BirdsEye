import React from 'react';
import './display.css'

function Display(props){
  console.log(props)
  return(
    <>
     <div className="display_block">
        <div class="display_text">
          {props.props.full_text}
        </div>
     </div>
    </>
  )
}

export default Display