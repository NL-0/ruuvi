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

    // componentDidMount() {
    //     this.timerID = setInterval(() => this.tick(), 1000);
    // }

    // componentWillUnmount() {
    //     clearInterval(this.timerID);
    // }

    // tick = () => {
    //     this.addData()
    // }

    // addData() {

    //         this.setState({
    //             data: [...this.state.data, { name: '', uv: this.props.liike1, pv: this.props.liike2, dv: this.props.liike3 }]
    //         })
    // }
    

    render() {
        console.log("timechart: " + this.props.data)
        return (
            // <LineChart width={500} height={100} data={this.props.data} className='chart'>
            //     <Line type="monotone" dataKey="pv" stroke="grey" strokeWidth={2} />
            //     <Line type="monotone" dataKey="uv" stroke="#90EE90" strokeWidth={2} />
            //     <Line type="monotone" dataKey="dv" stroke="#ADD8E6" strokeWidth={2} />
            //     <XAxis dataKey="name" />
            //     {/* <YAxis /> */}
            //     <CartesianGrid />
            // </LineChart>

            <LineChart
        width={1000}
        height={500}
        data={this.props.data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="grey" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="uv" stroke="lightgreen" />
        <Line type="monotone" dataKey="dv" stroke="lightblue" />
      </LineChart>
        )
    }
}

export default TimeChart
