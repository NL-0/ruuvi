import React, { Component } from 'react'
import {
    LineChart, Line, XAxis ,  YAxis , CartesianGrid
} from 'recharts';

class LiikeChart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick = () => {
        this.addData()
    }

    addData() {

        if (this.state.data.length < 50) {

            this.setState({
                data: [...this.state.data, { name: '', uv: this.props.liike1, pv: this.props.liike2, dv: this.props.liike3 }],
            })
        }
        else {
            this.state.data.shift()
            this.setState({
                data: [...this.state.data, { name: '', uv: this.props.liike1, pv: this.props.liike2, dv: this.props.liike3 }]
            })
        }
    }

    render() {
        return (
            <LineChart width={500} height={100} data={this.state.data} className='chart'>
                <Line type="monotone" dataKey="pv" stroke="grey" strokeWidth={2} />
                <Line type="monotone" dataKey="uv" stroke="green" strokeWidth={2} />
                <Line type="monotone" dataKey="dv" stroke="blue" strokeWidth={2} />
                <XAxis dataKey="name" />
                 <YAxis />
                <CartesianGrid />
            </LineChart>
        )
    }
}

export default LiikeChart
