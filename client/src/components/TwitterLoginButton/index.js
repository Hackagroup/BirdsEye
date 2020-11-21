import React from "react"
import "whatwg-fetch"
import "url-search-params-polyfill"
import { Button } from '@material-ui/core'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import { makeStyles } from '@material-ui/core/styles'
import './TwitterLoginButton.css'

function TwitterLoginButton (props) {

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  function onButtonClick(e) {
    e.preventDefault();
    if (props.onClickCallback) props.onClickCallback()
    return getRequestToken();
  }

  function getHeaders() {
    const headers = Object.assign({}, props.customHeaders);
    headers["Content-Type"] = "application/json";
    return headers;
  }

  function getRequestToken() {
    var popup = openPopup();

    return window
      .fetch(props.requestTokenUrl, {
        method: "POST",
        credentials: props.credentials,
        headers: getHeaders()
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        let authenticationUrl = `https://api.twitter.com/oauth/authenticate?oauth_token=${
          data.oauth_token
        }&force_login=${props.forceLogin}`;

        if (props.screenName) {
          authenticationUrl = `${authenticationUrl}&screen_name=${
            props.screenName
          }`;
        }

        popup.location = authenticationUrl;
        polling(popup);
      })
      .catch(error => {
        popup.close();
        return props.onFailure(error);
      });
  }

  function openPopup() {
    const w = props.dialogWidth;
    const h = props.dialogHeight;
    const left = window.screen.width / 2 - w / 2;
    const top = window.screen.height / 2 - h / 2;

    return window.open(
      "",
      "",
      "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" +
        w +
        ", height=" +
        h +
        ", top=" +
        top +
        ", left=" +
        left
    );
  }

  function polling(popup) {
    const polling = setInterval(() => {
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(polling);
        props.onFailure(new Error("Popup has been closed by user"));
      }

      const closeDialog = () => {
        clearInterval(polling);
        popup.close();
      };

      try {
        if (
          popup.location.hostname !== "" &&
          !popup.location.hostname.includes("twitter.com")
        ) {
          if (popup.location.search) {
            const query = new URLSearchParams(popup.location.search);

            const oauthToken = query.get("oauth_token");
            const oauthVerifier = query.get("oauth_verifier");

            closeDialog();
            return getOauthToken(oauthVerifier, oauthToken);
          } else {
            closeDialog();
            return props.onFailure(
              new Error(
                "OAuth redirect has occurred but no query or hash parameters were found. " +
                  "They were either not set during the redirect, or were removed—typically by a " +
                  "routing library—before Twitter react component could read it."
              )
            );
          }
        }
      } catch (error) {
        // Ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
        // A hack to get around same-origin security policy errors in IE.
      }
    }, 500);
  }

  function getOauthToken(oAuthVerifier, oauthToken) {
    return window
      .fetch(
        `${
          props.loginUrl
        }?oauth_verifier=${oAuthVerifier}&oauth_token=${oauthToken}`,
        {
          method: "POST",
          credentials: props.credentials,
          headers: getHeaders()
        }
      )
      .then(response => {
        props.onSuccess(response);
      })
      .catch(error => {
        return props.onFailure(error);
      });
  }

  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      className={classes.button}
      onClick={onButtonClick}
      startIcon={<LockOpenIcon />}
      disabled={props.disabled}
    >{props.text}</Button>
  );
}

TwitterLoginButton.defaultProps = {
  tag: "button",
  text: "Sign in with Twitter",
  disabled: false,
  dialogWidth: 600,
  dialogHeight: 400,
  showIcon: true,
  credentials: "same-origin",
  customHeaders: {},
  forceLogin: false,
  screenName: "",
  onClickCallback: null
};

export default TwitterLoginButton