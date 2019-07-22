import React, { Component } from 'react'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';

class TimeChart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
        };
    }    

    render() {
        return (
            <LineChart width={1100} height={500} data={this.props.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="grey" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="uv" stroke="green" />
        <Line type="monotone" dataKey="dv" stroke="blue" />
      </LineChart>
        )
    }
}

export default TimeChart
