import React from 'react'
import './display.css'

// temp1.props.entities.hashtags[0].text
// "ATYCLB"

function Display(props) {
  // console.log(props)
  let entities = props.props.entities
  let hashtags_n = entities.hashtags.length

  let tweet = props.props
  let hashtags = entities.hashtags
  let links_n = entities.urls.length
  let images_n = props.props.quoted_status
  let imagesV2 = props.props.extended_entities

  function parseTags(hashtags) {
    let s = ''
    for (const tag in hashtags) {
      s += '#' + hashtags[tag].text
      s += '  '
    }
    return s
  }

  function parseDate(date) {
    let __ = date.substring(4, 8)
    let _ = date.substring(8, 11)
    return __ + ' ' + _
  }

  let x = <div></div>
  if (hashtags_n === 0) {
    x = 'No Hashtags'
  } else {
    x = parseTags(props.props.entities.hashtags)
  }
  let links = ''
  if (links_n == 0) {
    links = ''
  } else {
    links = props.props.entities.urls.map((link) => {
      return link.expanded_url
    })
  }

  let images = ''
  if (typeof images_n === 'undefined' || images_n == undefined || images_n === void 0) {
    images = ''
  } else {
    if (
      images_n.extended_entities !== undefined ||
      typeof images_n.extended_entities !== 'undefined' ||
      images_n.extended_entities !== void 0
    ) {
      images = images_n.extended_entities.media.map((image) => {
        console.log(image)
        return image.media_url_https
      })
    }
  }

  if (imagesV2 != null) {
    images = imagesV2.media.map((image) => {
      return image.media_url_https
    })
  }
  return (
    <>
      <div id="box">
        <div className="display_block">
          <div class="header">
            <img class="profilePicture" src={tweet.user.profile_image_url} />
            <b> @{tweet.user.screen_name}</b>
            <b>{parseDate(tweet.created_at)}</b>
          </div>
          <div>tweeted: {tweet.full_text}</div>
          <div>{hashtags.length > 0 ? hashtags.map((x) => '#' + x.text).join(' ') : ''}</div>
          <a target="_blank" href={links}>
            {links}
          </a>
          <div class="pictures">
            {images.length > 0
              ? images.map((x) => {
                  return (
                    <div style={{ width: 100 / (images.length + 0.5) + '%' }}>
                      <a href={x} target="_blank">
                        <img href={x} target="_blank" class="images" src={x} />
                      </a>
                    </div>
                  )
                })
              : ''}
          </div>
        </div>
      </div>
    </>
  )
}

export default Display
