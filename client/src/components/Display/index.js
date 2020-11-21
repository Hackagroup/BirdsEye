import React from 'react';
import './display.css'



// temp1.props.entities.hashtags[0].text
// "ATYCLB"

function Display(props){
  console.log(props)
  let entities = props.props.entities
  let hashtags_n = entities.hashtags.length

  let tweet = props.props
  let hashtags = entities.hashtags
  let links = entities.links
  let images = entities.images



  function parseTags(hashtags){
    let s = "";
    for(const tag in hashtags){
      s+=("#"+hashtags[tag].text)
      s+="  "
    }
    return s
  }

  function parseDate(date){
    let __ = date.substring(4,8)
    let _ = date.substring(8,11)
    return __ + " " + _
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
     
        <div>{tweet.full_text}</div>
        <div className="display_block_date"><b>{parseDate(tweet.created_at)}</b></div>
        <div>
          {hashtags.length > 0 ? hashtags.map((x) => ('#'+x.text)).join(' ') : 'None'}
        </div>
        {/* <div>  
          Tweet Links:{' '}
          {links.length > 0 ? links.map((x) =>{
            return (
              <a target="_blank" href={x.expanded_url}>{x.expanded_url}</a>
            )
          }): 'None'}
        </div> */}
        {/* <div>
          Images :{' '}
          {images.length > 0 ? images.map((x) =>{
            console.log(x.media_url_https)
            return (
              <img width="500px" src={x.media_url_https}/>
            )
          }): 'None'}
        </div> */}
      </div> 
    </> 
  )
}

export default Display
