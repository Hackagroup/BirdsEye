const express = require('express')
app = express()


require('dotenv').config()

app.get('/', (req,res)=>{
    res.send("Twitter :)")
})



// Run Node on port 3001, if fail 8000
const PORT = process.env.PORT || 8000

app.listen(PORT, ()=>{
    console.log("Listening on port: " + PORT + " For Node")
})