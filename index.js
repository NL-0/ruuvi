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
    host: '10.100.0.138:8086/',
    database: 'ruuvi',
  });

// influx.query(`
//   select * from ruuvi `)
// .then( result => response.status(200).json(result) )
// .catch( error => response.status(500).json({ error }) );

// app.get('/all2', cors(), (req, res) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     influx.query('select mean(temperature), mean(rssi), mean(accelerationX), mean(accelerationY), mean(accelerationZ) from ruuvi_measurements group by time(1m), mac fill(previous) order by desc limit 1').then(results => {
//        const { data } = results;
//        res.send(data)
//       })

// })

// app.get('/all', cors(), (req, res) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     influx.query('select mean(temperature), mean(rssi), mean(accelerationX), mean(accelerationY), mean(accelerationZ) from ruuvi_measurements group by time(1m), mac fill(previous) order by desc limit 1')
//     .then(r => {
//         const { data } = r;
//         res.json(data)
//     })
// })

// app.get('/all', cors(), (req, res) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     influx.query('select mean(temperature), mean(rssi), mean(accelerationX), mean(accelerationY), mean(accelerationZ) from ruuvi_measurements group by time(1m), mac fill(previous) order by desc limit 1')
//         .then(r => {
//             const { data } = r;
//             res.send(data)
//         })

// })

app.get('/all', cors(), (req, res) => {
influx.query('select mean(temperature), mean(rssi), mean(accelerationX), mean(accelerationY), mean(accelerationZ), mean(accelerationTotal) from ruuvi_measurements group by time(2s), mac fill(linear) order by desc limit 2').then(results => {
    //console.log(results)
    res.send(results)
  })
})

// app.get('/mdata', cors(), (req, res) => {
//     influx.query('SELECT count(value1) FROM mov10 GROUP BY time(1h), mac ORDER BY DESC').then(results => {
//         //console.log(results)
//         res.send(results)
//       })
//     })


// app.get('/all', cors(), (req, res) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     axios.get(`http://10.100.0.138:8086/query?db=ruuvi&q=SELECT%20mean(temperature),%20mean(rssi),%20mean(accelerationX),%20mean(accelerationY),%20mean(accelerationZ)%20FROM%20ruuvi_measurements%20GROUP%20BY%20time(1m),%20mac%20fill(previous)%20ORDER%20BY%20DESC%20LIMIT%201`)
//         .then(r => {
//             const { data } = r;
//             res.send(data)
//         })
// })

// app.get('/xyz', cors(), (req, res) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     axios.get(`http://10.100.0.138:8086/query?db=ruuvi&q=SELECT%20mean(accelerationX),%20mean(accelerationY),%20mean(accelerationZ)%20FROM%20ruuvi_measurements%20GROUP%20BY%20time(1m),%20mac%20fill(0)%20ORDER%20BY%20DESC%20LIMIT%201`)
//         .then(r => {
//             const { data } = r;
//             res.send(data)
//         })
// })

app.get('/mdata', cors(), (req, res) => {
    influx.query(`SELECT count(value1) FROM mov10 GROUP BY mac, time(1h) ORDER BY DESC LIMIT 1`).then(results => {
        //console.log(results)
        res.send(results)
      })
    })


// app.get('/mdata', cors(), (req, res) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     axios.get(`http://10.100.0.138:8086/query?db=ruuvi&q=SELECT%20count(value1)%20FROM%20mov10%20GROUP%20BY%20time(1h),%20mac%20ORDER%20BY%20DESC`)
//         .then(r => {
//             const { data } = r;
//             res.send(data)
//         })

// })

// app.get('/temp', cors(), (req, res) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     axios.get(`http://10.100.0.138:8086/query?db=ruuvi&q=SELECT%20mean(temperature)%20FROM%20ruuvi_measurements%20GROUP%20BY%20time(2m),%20mac%20ORDER%20BY%20DESC%20LIMIT%201`)
//         .then(r => {
//             const { data } = r;
//             res.send(data)
//         })

// })

// app.get('/signal', cors(), (req, res) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     axios.get(`http://10.100.0.138:8086/query?db=ruuvi&q=SELECT%20mean(rssi)%20FROM%20ruuvi_measurements%20GROUP%20BY%20time(5m),%20mac%20ORDER%20BY%20DESC%20LIMIT%201`)
//         .then(r => {
//             const { data } = r;
//             res.send(data)
//         })

// })

// app.get('/time1', cors(), (req, res) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     axios.get(`http://10.100.0.138:8086/query?db=ruuvi&q=SELECT%20mean(accelerationTotal)%20FROM%20ruuvi_measurements%20WHERE%20time%20%3E=%20%272019-07-11T09:40:55Z%27%20and%20time%20%3C=%20%272019-07-11T09:41:55Z%27%20GROUP%20BY%20time(1s),%20mac%20fill(linear)%20ORDER%20BY%20time`)
//         .then(r => {
//             const { data } = r;
//             res.send(data)
//         })

// })

// app.get('/time2', cors(), (req, res) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     axios.get(`http://10.100.0.138:8086/query?db=ruuvi&q=SELECT%20mean(accelerationTotal)%20FROM%20ruuvi_measurements%20WHERE%20time%20%3E=%20%272019-07-11T09:28:00Z%27%20and%20time%20%3C=%20%272019-07-11T09:29:10Z%27%20GROUP%20BY%20time(1s),%20mac%20fill(linear)%20ORDER%20BY%20time`)
//         .then(r => {
//             const { data } = r;
//             res.send(data)
//         })

// })

// app.get('/time3', cors(), (req, res) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     axios.get(`http://10.100.0.138:8086/query?db=ruuvi&q=SELECT%20mean(accelerationTotal)%20FROM%20ruuvi_measurements%20WHERE%20time%20%3E=%20%272019-07-11T09:25:40Z%27%20and%20time%20%3C=%20%272019-07-11T09:27:00Z%27%20GROUP%20BY%20time(1s),mac%20fill(linear)%20ORDER%20BY%20time`)
//         .then(r => {
//             const { data } = r;
//             res.send(data)
//         })

// })

app.get('/hidastime1', cors(), (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    axios.get(`http://10.100.0.138:8086/query?db=ruuvi&q=SELECT%20mean(accelerationTotal)%20FROM%20ruuvi_measurements%20WHERE%20time%20%3E=%20%272019-07-11T08:56:47Z%27%20and%20time%20%3C=%20%272019-07-11T08:58:09Z%27%20GROUP%20BY%20time(1s),%20mac%20fill(linear)%20ORDER%20BY%20time`)
        .then(r => {
            const { data } = r;
            res.send(data)
        })

})
app.get('/hidastime2', cors(), (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    axios.get(`http://10.100.0.138:8086/query?db=ruuvi&q=SELECT%20mean(accelerationTotal)%20FROM%20ruuvi_measurements%20WHERE%20time%20%3E=%20%272019-07-11T09:14:00Z%27%20and%20time%20%3C=%20%272019-07-11T09:16:00Z%27%20GROUP%20BY%20time(1s),%20mac%20fill(linear)%20ORDER%20BY%20time`)
        .then(r => {
            const { data } = r;
            res.send(data)
        })

})

app.get('/hidastime3', cors(), (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    axios.get(`http://10.100.0.138:8086/query?db=ruuvi&q=SELECT%20mean(accelerationTotal)%20FROM%20ruuvi_measurements%20WHERE%20time%20%3E=%20%272019-07-11T09:17:00Z%27%20and%20time%20%3C=%20%272019-07-11T09:18:20Z%27%20GROUP%20BY%20time(1s),%20mac%20fill(linear)%20ORDER%20BY%20time`)
        .then(r => {
            const { data } = r;
            res.send(data)
        })

})


app.listen(5000, () => {
    console.log('Server runs on http://localhost:5000')
})