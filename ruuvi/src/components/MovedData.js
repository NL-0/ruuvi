import React, { Component } from 'react'
import axios from 'axios'
import { Row, Col } from 'react-flexbox-grid';
// import { XAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend, YAxis } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

class MovedData extends Component {

    constructor(props) {
        super(props)
        this.state = {
            moved1: [],
            data: [],
            liikeyhteensa: [],
            values: [],
            value1: '',
            value2: '',
            value3: '',
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
        //axios.get(`http://10.100.0.138:8086/query?db=ruuvi&q=SELECT%20*%20FROM%20mov3%20ORDER%20BY%20DESC`)
        axios.get(`http://10.100.0.138:8086/query?db=ruuvi&q=SELECT%20count(value1)%20FROM%20mov10%20GROUP%20BY%20time(1h),%20mac%20ORDER%20BY%20DESC`)
        .then(res => {
            const moveddata = res.data;
            this.setState({
                //moved1: moveddata.results[0].series[0].values,
                //data: [...this.state.data, {name: moveddata.results[0].series[0].values[0][0], uv: moveddata.results[0].series[0].values[0][2]}],
                value1: moveddata.results[0].series[0].values[0][1],
                value2: moveddata.results[0].series[1].values[0][1],
                value3: moveddata.results[0].series[2].values[0][1],
                data: [{name: '', pv: this.state.value1, uv: this.state.value2, dv: this.state.value3}]
            })
        })
    }


    render() {



        return (
            <div>
       {/*          {this.state.moved1} */}

            {/* <BarChart width={1000} height={200} data={this.state.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend /> */}
            {/* <Bar dataKey="pv" fill="#8884d8" /> */}
            {/* <Bar dataKey="uv" fill="#000000" />
            </BarChart> */}

            <Row>
                <Col xs>
                    <u>Liikeitä yhteensä viimeisin 1h aikana</u>  
                </Col>
            </Row>
            <br />
            <Row>
                <Col xs>
                    {this.state.value1}
                </Col>
                <Col xs>
                    {this.state.value2}
                </Col>
                <Col xs>
                    {this.state.value3}
                </Col>
            </Row>

            <Row>
                <Col xs>
                <BarChart
                    width={500}
                    height={300}
                    data={this.state.data}
                    // margin={{
                    // top: 5, right: 30, left: 20, bottom: 5,
                    // }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}
                <Bar dataKey="pv" fill="#8884d8" background={{ fill: '#eee' }} />
                <Bar dataKey="uv" fill="#82ca9d" background={{ fill: '#eee' }}/>
                <Bar dataKey="dv" fill="#853907" background={{ fill: '#eee' }}/>
                </BarChart>
                </Col>
            </Row>


            </div>
        )
    }
}

export default MovedData
