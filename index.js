var express = require('express')
var app = express()
var axios = require('axios')
var cors = require('cors')

app.use(cors())
app.get('/', (req, res) => {
    res.json({ success: true })
})

app.get('/xyz', cors(), (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    axios.get(`http://10.100.0.138:8086/query?db=ruuvi&q=SELECT%20mean(accelerationX),%20mean(accelerationY),%20mean(accelerationZ)%20FROM%20ruuvi_measurements%20GROUP%20BY%20time(1m),%20mac%20fill(0)%20ORDER%20BY%20DESC%20LIMIT%201`)
        .then(r => {
            const { data } = r;
            res.send(data)
        })
})

app.get('/mdata', cors(), (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    axios.get(`http://10.100.0.138:8086/query?db=ruuvi&q=SELECT%20count(value1)%20FROM%20mov10%20GROUP%20BY%20time(1h),%20mac%20ORDER%20BY%20DESC`)
        .then(r => {
            const { data } = r;
            res.send(data)
        })

})

app.get('/temp', cors(), (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    axios.get(`http://10.100.0.138:8086/query?db=ruuvi&q=SELECT%20mean(temperature)%20FROM%20ruuvi_measurements%20GROUP%20BY%20time(2m),%20mac%20ORDER%20BY%20DESC%20LIMIT%201`)
        .then(r => {
            const { data } = r;
            res.send(data)
        })

})

app.get('/signal', cors(), (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    axios.get(`http://10.100.0.138:8086/query?db=ruuvi&q=SELECT%20mean(rssi)%20FROM%20ruuvi_measurements%20GROUP%20BY%20time(5m),%20mac%20ORDER%20BY%20DESC%20LIMIT%201`)
        .then(r => {
            const { data } = r;
            res.send(data)
        })

})

app.listen(5000, () => {
    console.log('Server runs on http://localhost:5000')
})