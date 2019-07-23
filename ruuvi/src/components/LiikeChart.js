import React, { Component } from 'react'
import {
    LineChart, Line, XAxis ,  YAxis , CartesianGrid
} from 'recharts';

/*
    saa props lukua jotka lisää data[] tauluun recharts vaatimassa muodossa
*/

class LiikeChart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 2000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick = () => {
        this.addData()
    }

    /*
        jos taulukolla yli 50 arvoa ottaa vanhimmaan arvon pois
    */

    addData() {

        if (this.state.data.length < 50) {

            this.setState({
                data: [...this.state.data, { name: '', pv: this.props.liike1, uv: this.props.liike2, dv: this.props.liike3 }],
            })
        }
        else {
            this.state.data.shift()
            this.setState({
                data: [...this.state.data, { name: '', pv: this.props.liike1, uv: this.props.liike2, dv: this.props.liike3 }]
            })
        }
    }

    render() {
        return (
            <LineChart width={500} height={100} data={this.state.data} className='chart'>
                <Line connectNulls type="monotone" dataKey="pv" stroke="grey" strokeWidth={2} />
                <Line connectNulls type="monotone" dataKey="uv" stroke="green"  strokeWidth={2} />
                <Line connectNulls type="monotone" dataKey="dv" stroke="blue"  strokeWidth={2} />
                <XAxis dataKey="name" />
                 <YAxis />
                <CartesianGrid />
            </LineChart>
        )
    }
}

export default LiikeChart
