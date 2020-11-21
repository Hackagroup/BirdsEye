import React from 'react';
import './display.css'



// temp1.props.entities.hashtags[0].text
// "ATYCLB"

function Display(props){
  console.log(props)
  let entities = props.props.entities
  let hashtags_n = entities.hashtags.length

  function parseTags(hashtags){
    let s = "";
    console.log(hashtags)
    for(const tag in hashtags){
      s+=("#"+hashtags[tag].text)
      s+="  "
    }
    return s
  }

  let x = <div></div>
  if (hashtags_n == 0){
    x = "No Hashtags"
  } else{
    x = parseTags(props.props.entities.hashtags)
  }
  return(
    <>
     <div className="display_block">
        <div class="display_text">
          {props.props.full_text} {x}
        </div>
     </div>
    </> 
  )
}

export default Display