const express = require('express')
const app = express()

app.get('/', (req, res)=>{
    res.json({success:true})
})


app.listen(5000, ()=>{
    console.log('Server runs on http://localhost:5000')
})