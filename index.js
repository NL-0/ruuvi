var express = require('express')
var app = express()
var axios = require('axios')
var cors = require('cors')
const Influx = require('influx');

app.use(cors())
app.get('/', (req, res) => {
    res.json({ success: true })
})

const influx = new Influx.InfluxDB({
    host: '10.100.0.111:8086/',
    database: 'ruuvi',
  });

const influx2 = new Influx.InfluxDB({
    host: '10.100.0.138:8086/',
    database: 'ruuvi',
})

app.get('/all', cors(), (req, res) => {
influx.query('select mean(temperature), mean(rssi), mean(accelerationX), mean(accelerationY), mean(accelerationZ), mean(accelerationTotal) from ruuvi_measurements group by time(2s), mac fill(linear) order by desc limit 2').then(results => {
    //console.log(results)
    res.send(results)
  })
})

app.get('/all2', cors(), (req, res) => {
  influx2.query('select mean(temperature), mean(rssi), mean(accelerationX), mean(accelerationY), mean(accelerationZ), mean(accelerationTotal) from ruuvi_measurements group by time(2s), mac fill(linear) order by desc limit 2').then(results => {
      //console.log(results)
      res.send(results)
    })
  })

app.get('/mdata', cors(), (req, res) => {
    influx.query(`SELECT count(value1) FROM mov10 GROUP BY mac, time(1h) ORDER BY DESC LIMIT 1`).then(results => {
        //console.log(results)
        res.send(results)
      })
    })

app.get('/time2', cors(), (req, res) => {
    let time1 = req.query.q
    let time2 = req.query.q2
    let mac = req.query.mac

    let urli = "select mean(accelerationTotal) from ruuvi_measurements where mac='" + mac + "' and (time >= '" + time1 + "' and time <= '" + time2 + "') group by time(2s), mac fill(linear) order by time asc"
    
    influx2.query(urli).then(results => {
        res.send(results)
      })
    })

app.get('/time', cors(), (req, res) => {
    let time1 = req.query.q
    let time2 = req.query.q2
    let mac = req.query.mac

    let urli = "select mean(accelerationTotal) from ruuvi_measurements where mac='" + mac + "' and (time >= '" + time1 + "' and time <= '" + time2 + "') group by time(2s), mac fill(linear) order by time asc"

    influx.query(urli).then(results => {
        res.send(results)
      })
    })


app.listen(5000, () => {
    console.log('Server runs on http://localhost:5000')
})