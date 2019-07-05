import React, { Component } from 'react'
import axios from 'axios'
import { XAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend, YAxis } from 'recharts';

class MovedData extends Component {

    constructor(props) {
        super(props)
        this.state = {
            moved1: [],
            data: [],
        };
      }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick = () => {
        this.movedaxios()

        // console.log(this.state.moved1[0])

        // for (var i = 1; i < `${this.state.moved1.length}` / 100 ; i) {
        //     this.setState({

        //        data: [...this.state.data, {name: i, uv: i }]
        //      //  data: [...this.state.data, {name: this.state.moved1[i][0], uv: this.state.moved1[i][2]}],
        //    })
        // }
    }

    movedaxios() {
        //http://10.100.0.138:8086/query?db=ruuvi&q=SELECT%20count(mac)%20FROM%20mov3%20GROUP%20BY%20time(10m),%20mac%20ORDER%20BY%20DESC
        axios.get(`http://10.100.0.138:8086/query?db=ruuvi&q=SELECT%20*%20FROM%20mov3%20ORDER%20BY%20DESC`)
        .then(res => {
            const moveddata = res.data;
            this.setState({
                moved1: moveddata.results[0].series[0].values,
                //data: [...this.state.data, {name: moveddata.results[0].series[0].values[0][0], uv: moveddata.results[0].series[0].values[0][2]}],
            })
            //console.log(this.state.moved1[0])
        })
        


    }

    render() {
        return (
            <div>
       {/*          {this.state.moved1} */}

            <BarChart width={1000} height={200} data={this.state.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* <Bar dataKey="pv" fill="#8884d8" /> */}
            <Bar dataKey="uv" fill="#000000" />
            </BarChart>
            </div>
        )
    }
}

export default MovedData
