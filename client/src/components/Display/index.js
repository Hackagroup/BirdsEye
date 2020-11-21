import React from 'react';
import './display.css'


// temp1.props.entities.hashtags[0].text
// "ATYCLB"

function Display(props){
  // console.log(props)
  let entities = props.props.entities
  let hashtags_n = entities.hashtags.length
  let links_n = entities.urls.length
  let images_n = props.props.quoted_status
  console.log(images_n)

  function parseTags(hashtags){
    let s = "";
    console.log(hashtags)
    for(const tag in hashtags){
      s+=("#"+hashtags[tag].text)
      s+="  "
    }
    return s
  }

  let x = ""
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
    console.log( "asdasd"+images_n.extended_entities);
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
        <div class="display_text">
          {props.props.full_text} {x} 
          <a target="_blank" href={links}>{links}</a>
          <img class="images" src={images}/>
        </div>
     </div>
     </div>
    </> 
  )
}

export default Display