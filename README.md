<p align="center"><a href="#" target="_blank"><img width="400"src="https://i.imgur.com/lb8GddO.png"></a></p>

<div align="center">
  <h2>BirdsEye, A closer look at the bigger picture</h2>

  <br>
  <a href="https://react-redux.js.org/" target="_blank"> <img src="https://www.clker.com/cliparts/N/0/4/q/4/R/react-redux.svg" alt="javascript" width="40" height="40"/> </a>
  <a href="https://https://reactjs.org/" target="_blank"> <img src="https://material-ui.com/static/logo.png" alt="material-ui" width="40" height="40"/> </a>
  <a href="https://www.figma.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg" alt="figma" width="40" height="40"/> </a>
  <a href="https://travis-ci.org/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/travis-ci/travis-ci-icon.svg" alt="javascript" width="40" height="40"/> </a> 
  <a href="https://nodejs.org/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg" alt="javascript" width="40" height="40"/> </a>
  <a href="https://expressjs.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg" alt="javascript" width="40" height="40"/> </a> 
  <a href="https://code.visualstudio.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/visualstudio_code/visualstudio_code-icon.svg" alt="visual code" width="40" height="40"/> </a>
  
</div>
<br>
<br>

# What it does

BirdsEye lets you look at other simmilar tweets which can give you a sense of the other side of the topic. Most often than not in today's age people don't like to view the other persons side or even worse, never do get the chance to see the other side. BirdsEye combats this by notifiying the user about tweets that relates to the tweet he/she just sent. This can give the user a broader view of the topic or as we like to call it a Bird Eye's view ;)

<br>

# Usage

Gif of web app coming soon

<br>
<br>

# Prototype
<br>
<!-- <iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2Fw8NyNBG9IjVIYhv5XnAYwb%2FBirdsEye-Prototype%3Fnode-id%3D34885%253A0" allowfullscreen></iframe> -->
<a href="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2Fw8NyNBG9IjVIYhv5XnAYwb%2FBirdsEye-Prototype%3Fnode-id%3D34885%253A0"><img src="https://i.imgur.com/bwmEmAJ.png" width="400"></a> 
<a href="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2Fw8NyNBG9IjVIYhv5XnAYwb%2FBirdsEye-Prototype%3Fnode-id%3D34885%253A0"><img src="https://i.imgur.com/4GUfzMU.png" width="400"/></a>

<a href="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2Fw8NyNBG9IjVIYhv5XnAYwb%2FBirdsEye-Prototype%3Fnode-id%3D34885%253A0"><img src="https://i.imgur.com/s5uFHlV.png" width="400"></a>
<a href="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2Fw8NyNBG9IjVIYhv5XnAYwb%2FBirdsEye-Prototype%3Fnode-id%3D34885%253A0"><img src="https://i.imgur.com/YzrUlHV.png" width="400"/></a>

<br>
<br>
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
<br>

# Project Structure
Our project structure is as follows:

- ***.github*** : Github related files.
  - ***workflows*** : Github Action Workflows 
- ***client*** : Frontend/Client-side code (ReactJS)
   - ***public*** : All public assets for react
   - ***src*** : Main frontend source code
      - ***actions*** : Types used for express/react comms
      - ***api*** : Twitter API used throughout app 
      - ***assets*** : assets used in components/views for react
      - ***components*** : where all components are defined
      - ***constants*** : constants required throughout react
      - ***reducers*** : redux reducers
      - ***util*** : frontend dev utility
      - ***views*** : All the views of the app like `/dashboard`
- ***public*** : Store images used in app and other services.
- ***routes*** : Backend/Express routes
  - ***login***: Authentication using twitter consumer api/sercret key
  - ***tweet***: Searches for tweets and creates new tweets
  - ***user***  : Fetches user information using `/:userid`
- ***utils*** : Utilities for devs.
- ***.env(.example)*** :Enviorement variables for Twitter Consumer API's
- ***.travis.yml*** : Travis-CI Configuration
- ***package.json*** : All Node dependancies and scripts for testing & building
- ***server.js*** : NodeJS Entry point
- ***setup.sh***: Shell file that aids for installing all dependancies and running app!

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

**BirdsEye is Licensed under the MIT License.**
