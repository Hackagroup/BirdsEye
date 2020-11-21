<p align="center"><a href="#" target="_blank"><img width="400"src="https://i.imgur.com/lb8GddO.png"></a></p>


<div align="center">
  <h2>BirdsEye, A closer look at the bigger picture</h2>

  <br>
  <a href="https://reactjs.org/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg" alt="javascript" width="45" height="45"/> </a>
  <a href="https://material-ui.com/" target="_blank"> <img src="https://material-ui.com/static/logo.png" alt="material-ui" width="40" height="40"/> </a>
  <a href="https://www.figma.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg" alt="figma" width="40" height="40"/> </a>
  <a href="https://travis-ci.org/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/travis-ci/travis-ci-icon.svg" alt="javascript" width="40" height="40"/> </a> 
  <a href="https://nodejs.org/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg" alt="javascript" width="40" height="40"/> </a>
  <a href="https://expressjs.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg" alt="javascript" width="40" height="40"/> </a> 
  <a href="https://code.visualstudio.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/visualstudio_code/visualstudio_code-icon.svg" alt="visual code" width="40" height="40"/> </a>
  
</div>
<br>
<div align="center">

  ![Node.js CI](https://github.com/Hackagroup/BirdsEye/workflows/Node.js%20CI/badge.svg) 
    <a href="#"><img src="https://img.shields.io/npm/l/vue.svg?sanitize=true" alt="License"></a>
    [<img src="https://img.shields.io/badge/slack-@hackagroup-yellow.svg?logo=slack">](https://join.slack.com/t/hackagroupworkspace/shared_invite/zt-jdeuctxd-Zy5QQ6XIrM5xXPyLSqqzqQ)
    [![Build Status](https://travis-ci.com/Hackagroup/BirdsEye.svg?branch=main)](https://travis-ci.com/Hackagroup/BirdsEye)
</div>
<br>
<br>

# What it does

BirdsEye lets you look at other simmilar tweets which can give you a sense of the other side of the topic. Most often than not in today's age people don't like to view the other persons side or even worse, never do get the chance to see the other side. BirdsEye combats this by notifiying the user about tweets that relates to the tweet he/she just sent. This can give the user a broader view of the topic or as we like to call it a Bird Eye's view 😉

<br>

# Usage

Gif of web app coming soon

<br>

# Prototype

<br>
<!-- <iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2Fw8NyNBG9IjVIYhv5XnAYwb%2FBirdsEye-Prototype%3Fnode-id%3D34885%253A0" allowfullscreen></iframe> -->
<a href="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2Fw8NyNBG9IjVIYhv5XnAYwb%2FBirdsEye-Prototype%3Fnode-id%3D34885%253A0"><img src="https://i.imgur.com/bwmEmAJ.png" width="400"></a> 
<a href="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2Fw8NyNBG9IjVIYhv5XnAYwb%2FBirdsEye-Prototype%3Fnode-id%3D34885%253A0"><img src="https://i.imgur.com/4GUfzMU.png" width="400"/></a>

<a href="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2Fw8NyNBG9IjVIYhv5XnAYwb%2FBirdsEye-Prototype%3Fnode-id%3D34885%253A0"><img src="https://i.imgur.com/s5uFHlV.png" width="400"></a>
<a href="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2Fw8NyNBG9IjVIYhv5XnAYwb%2FBirdsEye-Prototype%3Fnode-id%3D34885%253A0"><img src="https://i.imgur.com/YzrUlHV.png" width="400"/></a>

<br>

# Developers

<p>In order to run, use:</p>

```sh
# Clone Repository
git clone https://github.com/Hackagroup/BirdsEye
cd BirdsEye

# Run Setup
bash setup.sh
```

<b>IMPORTANT : React takes a while to start! Don't turn off in the middle of `npm start`.</b>

<br>

# Project Structure

Our project structure is as follows:

- **_.github_** : Github related files.
  - **_workflows_** : Github Action Workflows
- **_client_** : Frontend/Client-side code (ReactJS)
  - **_public_** : All public assets for react
  - **_src_** : Main frontend source code
    - **_actions_** : Types used for express/react comms
    - **_api_** : Twitter API used throughout app
    - **_assets_** : assets used in components/views for react
    - **_components_** : where all components are defined
    - **_constants_** : constants required throughout react
    - **_reducers_** : redux reducers
    - **_util_** : frontend dev utility
    - **_views_** : All the views of the app like `/dashboard`
- **_public_** : Store images used in app and other services.
- **_routes_** : Backend/Express routes
  - **_login_**: Authentication using twitter consumer api/sercret key
  - **_tweet_**: Searches for tweets and creates new tweets
  - **_user_** : Fetches user information using `/:userid`
- **_utils_** : Utilities for devs.
- **_.env(.example)_** :Enviorement variables for Twitter Consumer API's
- **_.travis.yml_** : Travis-CI Configuration
- **_package.json_** : All Node dependancies and scripts for testing & building
- **_server.js_** : NodeJS Entry point
- **_setup.sh_**: Shell file that aids for installing all dependancies, configuring environment and running app!

<br>

# FAQ

---

1. **What is this project about?**
   This project is baed on a Twitter hackathon Hack for good theme, we plan to give users motivational tweets. More description will be posted.

2. **What is this for?**
   BirdsEye is for everyone looking for daily motivation to get through their life and get them ready to conquer the world!

3. **Need Help?**
   Absolutely! Any help would be appreciated! To get to us, either request an
   issue or check ask a question: https://github.com/Hackagroup/Twitive/issues

<br>

# License

---

BirdsEye is Licensed under the MIT License.
