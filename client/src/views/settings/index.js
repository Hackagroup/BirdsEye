import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import PersonIcon from '@material-ui/icons/Person'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import API from '../../api'
import './settings.css'

function Settings() {
  const toggleStyles = makeStyles((theme) => ({
    toggleContainer: {
      margin: theme.spacing(2, 0),
    },
  }))

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }))

  const classes = useStyles()
  const toggle_classes = toggleStyles()

  const user = useSelector((state) => state.user)
  const { userCredentials } = user
  const { screen_name } = userCredentials

  const [userInfo, setUserInfo] = useState({})
  const [formats, setFormats] = useState(() => ['phone'])
  const [state, setState] = useState({
    age: '',
    name: 'hai',
  })

  async function getUserInfo() {
    const response = await API.user.get('', {
      Name: screen_name,
      screen_name: screen_name,
      user_id: user.userCredentials.user_id,
    })
    if (response.message == null) {
      const { users } = response
      setUserInfo(users)
    }
  }

  const handleFormat = (event, newFormats) => {
    if (newFormats.length > 0) {
      setFormats(newFormats)
    }
  }

  const handleChange = (event) => {
    const name = event.target.name
    setState({
      ...state,
      [name]: event.target.value,
    })
  }

  useEffect(() => {
    getUserInfo()
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Helmet>
        <title>#BirdsEye - Settings</title>
      </Helmet>
      <section id="settings-page-content">
        <div id="settings-panel">
          <div className="title-wrapper">
            <h2 className="setting-title">User Information</h2>
          </div>
          <hr id="settings-hr"></hr>

          <img className="profilePic" alt="profilePic" src={userInfo.profile_image_url_https} />

          <div className="text-wrapper">
            <p>
              <strong>Username:</strong> <br></br>
              {screen_name}
            </p>
            <p>
              <strong>Name:</strong> <br></br>
              {userInfo.name}
            </p>
            <p>
              <strong>Bio:</strong> <br></br>
              {userInfo.description}
            </p>
            <p>
              <strong>Location:</strong> <br></br>
              {userInfo.location}{' '}
            </p>
          </div>

          <br></br>
          <div className="title-wrapper">
            <h2 className="setting-title">Display Settings</h2>
          </div>

          <hr id="settings-hr"></hr>

          {/* Drop down for filtering - may want to change to Material UI*/}
          <div className="text-wrapper">
            <div className="toggle_comps">
              <strong>Filter By:</strong>
              {/* <Grid container spacing={2}> */}

              <div className={toggle_classes.toggleContainer}>
                <ToggleButtonGroup value={formats} onChange={handleFormat} aria-label="device">
                  <Tooltip title="Mixed" TransitionComponent={Zoom} placement="top">
                    <ToggleButton value="laptop" aria-label="laptop">
                      <SupervisorAccountIcon />
                    </ToggleButton>
                  </Tooltip>
                  <Tooltip title="Popular" TransitionComponent={Zoom} placement="top">
                    <ToggleButton value="laptop" aria-label="laptop">
                      <VerifiedUserIcon />
                    </ToggleButton>
                  </Tooltip>
                  <Tooltip title="Regular" TransitionComponent={Zoom} placement="top">
                    <ToggleButton value="laptop" aria-label="laptop">
                      <PersonIcon />
                    </ToggleButton>
                  </Tooltip>
                </ToggleButtonGroup>
              </div>
            </div>
            <br />
            <br />
            {/* Drop down for # Tweets - may want to change to Material UI*/}
            <div>
              <strong>Tweets: </strong>
              <FormControl variant="outlined" id="tweet_form" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Tweets</InputLabel>
                <Select
                  native
                  value={state.age}
                  onChange={handleChange}
                  label="Tweets"
                  inputProps={{
                    name: 'age',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Settings
