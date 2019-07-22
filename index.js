var express = require('express')
var app = express()
//var axios = require('axios')
var cors = require('cors')
const Influx = require('influx');
var mysql = require("mysql");

app.use(cors())
app.get('/', (req, res) => {
    res.json({ success: true })
})

// var connection = mysql.createConnection({
//   host: "10.100.0.159",
//   port: "3306",
//   user: "buratinoUlko",
//   password: "PapaCarloUlko",
//   database: "Arduino",
//   charset: "utf8mb4_general_ci"
//   });

// connection.connect(
//     function(err) 
//     {
//         if(!err) {
//             console.log("DB is connected")
//             } else {
//             console.log(err)
//             console.log("Virhe kannan yhteyden muodostamisessa")
//             }
//     }
// );

//10.100.0.159

const influx = new Influx.InfluxDB({
    host: '10.100.0.111:8086/',
    database: 'ruuvi',
  });

const influx2 = new Influx.InfluxDB({
    host: '10.100.0.138:8086/',
    database: 'ruuvi',
}) 

// const influx = new Influx.InfluxDB({
//   host: '10.100.0.119:8086/',
//   database: 'ruuvi',
// });

// const influx2 = new Influx.InfluxDB({
//   host: '10.100.0.119:8086/',
//   database: 'ruuvi',
// })

app.get("/arduino", function(req, res){
  const sqlLauseAsiakas="select * from data where 1=1;";

  connection.query(sqlLauseAsiakas, function(err,rows,fields){
      if(!err) {  
                  res.json(rows);
              } 
      else console.log("arduino: virhe haun yhteydessä");
  });
  }
);


app.get('/all', cors(), (req, res) => {
influx.query('select mean(temperature), mean(rssi), mean(accelerationX), mean(accelerationY), mean(accelerationZ), mean(accelerationTotal) from ruuvi_measurements group by time(4s), mac fill(linear) order by desc limit 2').then(results => {
    //console.log(results)
    res.send(results)
  })
})

app.get('/all2', cors(), (req, res) => {
  influx2.query('select mean(temperature), mean(rssi), mean(accelerationX), mean(accelerationY), mean(accelerationZ), mean(accelerationTotal) from ruuvi_measurements group by time(6s), mac fill(previous) order by desc limit 2').then(results => {
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