import React, { Component } from 'react'
import axios from 'axios'
import { XAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend, YAxis } from 'recharts';


class InfluxTime extends Component {

    constructor(props) {
        super(props)
        this.state = {
            liiketime1: [],
        };
      }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    influxtimedata() {
        axios.get(`http://10.100.0.138:8086/query?db=ruuvi&q=SELECT%20mean(accelerationY),%20mean(accelerationX),%20mean(accelerationZ)%20FROM%20ruuvi_measurements%20WHERE%20TIME%20%3E=%20now()%20-%201h%20GROUP%20BY%20time(10s),%20mac%20fill(linear)%20ORDER%20BY%20DESC`)
            .then(res => {
                const timedata = res.data;
            this.setState({
                liiketime1: [timedata.results[0].series[0]],
                liiketime2: [timedata.results[0].series[1]],
                liiketime3: [timedata.results[0].series[2]],
            })
        })

        if ((this.state.liiketime1.length > 0) && (this.state.liiketime1))
        {
            //console.log(this.state.liiketime1[0].values[1])
            }
    }

    tick = () => {
        this.influxtimedata()
        
    }

    liikedata() {

        if ((this.state.liiketime1.length > 0) && (this.state.liiketime1))
        {
            return (
                
                // this.state.liiketime1[0].values[1],
//                this.state.liiketime1[0].values[1][1],

                this.state.liiketime1[0].values[1].map((i, index) => 
                <div key={index}>{i}</div>)
            )
        }
        else 
            return '123'
        
        
    }

    render() {
        return (
            <div>
                <br />
                test
                {this.liikedata()}
            <BarChart width={730} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>


            </div>
        )
    }
}
const data = [{name: 'Page A', uv: 400, pv: 2200, amt: 2200},{name: 'Page A', uv: 400, pv: 2400, amt: 2400},{name: 'Page A', uv: 400, pv: 2500, amt: 2600},{name: 'Page A', uv: 400, pv: 2400, amt: 2400},{name: 'Page A', uv: 400, pv: 2700, amt: 2400},{name: 'Page A', uv: 400, pv: 2400, amt: 2400},{name: 'Page A', uv: 400, pv: 2700, amt: 2400},{name: 'Page A', uv: 400, pv: 2400, amt: 2400},{name: 'Page A', uv: 400, pv: 2400, amt: 200},];


export default InfluxTime
