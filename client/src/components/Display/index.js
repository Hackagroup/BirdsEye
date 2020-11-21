import React from 'react';
import './display.css'



// temp1.props.entities.hashtags[0].text
// "ATYCLB"

function Display(props){
  let entities = props.props.entities
  let hashtags_n = entities.hashtags.length

  let tweet = props.props
  let hashtags = entities.hashtags
  let links_n = entities.urls.length
  let images_n = props.props.quoted_status


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
  let links =  ""
  if (links_n == 0){
    links = "No Links"
  } else{
    links = props.props.entities.urls.map((link)=>{
      return (link.expanded_url)
    })
  }

  let images =  ""
  if (typeof images_n === "undefined" || images_n ==undefined || images_n === void(0)){
    images = ""
  } else{
    if(images_n.extended_entities != null ||
        typeof images_n.extended_entities !== "undefined" ||
        images_n.extended_entities !== void(0)){
      images =  images_n.extended_entities.media.map((image)=>{
        return (image.media_url_https)
      })
    }
  }
  
  return(
    <>
    <div id="box">
      <div className="display_block">
          <div>Tweet Text: {tweet.full_text}</div>
          <div className="display_block_date"><b>{parseDate(tweet.created_at)}</b></div>
          <div>
            {hashtags.length > 0 ? hashtags.map((x) => ('#'+x.text)).join(' ') : ''}
          </div>
          <a target="_blank" href={links}>{links}</a>
          <img class="images" src={images}/>
        </div>
      </div> 
    </> 
  )
}

export default Display
