import React, { Component } from 'react'
//import { XAxis, Tooltip, LineChart, Line, Legend, YAxis } from 'recharts';
import {
    LineChart, Line,  XAxis /*,  YAxis */, CartesianGrid} from 'recharts';

class LiikeChart extends Component {

    constructor(props) {
        super(props)
        //const { liike1x, liike2x, liike3x } = props;

        this.state = {
            //data: [...data, {name: 'liikeX', uv: liike1x, pv: liike2x, dv: liike3x, atm: '2'}],
            //data: [...data, {name: '123', uv: '2', pv: '3', dv: '5', atm: '2'}]
            data: [],
            // liike1x: liike1x,
            // liike2x: liike2x,
            // liike3x: liike3x,
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

         if (this.state.data.length < 50 ) {

            this.setState({
                data: [...this.state.data, {name: '', uv: this.props.liike1, pv: this.props.liike2, dv: this.props.liike3}],
            }) 
        }
        else {
            this.state.data.shift()
            this.setState({
                data: [...this.state.data, {name: '', uv: this.props.liike1, pv: this.props.liike2, dv: this.props.liike3}]
            })
        }
        
      }


    render() {
        return (
            


            <LineChart width={500} height={100} data={this.state.data} className='chart'>
            <Line type="monotone" dataKey="pv" stroke="grey" strokeWidth={2} />
            <Line type="monotone" dataKey="uv" stroke="#90EE90" strokeWidth={2} />            
            <Line type="monotone" dataKey="dv" stroke="#ADD8E6" strokeWidth={2} /> 
            <XAxis dataKey="name"/> 
            {/* <YAxis /> */}
            <CartesianGrid />
            </LineChart>

            
        )
    }
}

export default LiikeChart
