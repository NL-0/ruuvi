import React, { Component } from 'react'
import axios from "axios";
import TimeChart from './TimeChart';
//import Button from '@material-ui/core/Button';

class MoveTime extends Component {

    constructor(props) {
        super(props);
        this.state = {
            moved1: [],
            aurl: "http://10.100.0.119:5000/" + this.props.url,
            timedata1: [],
            data: [],
            data2: [],
            timemin: [],
            timemin2: [],
            datakeski: [],
            timer1: '2000'

        };
    }

    componentDidMount() {
      this.timerID = setInterval(() => this.tick(), this.state.timer1);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick = () => {

        this.axiosurl();

        if ((this.state.timedata1) && (this.state.timedata1.length > 0)) {

            for (var y = 0; y < this.state.timedata1.length; y++) {
                this.setState({
                    timemin: [...this.state.timemin, this.state.timedata1[y].values.length],

                })
            }

            this.setState({
                min: (Math.min(...this.state.timemin) - 1)
            })

            for (var i = 0; i < this.state.min; i++) {
                if (this.state.timedata1[0].values[i][1] > 10) {
                    this.setState({
                        data: [...this.state.data, { name: this.state.timedata1[0].values[i][0], pv: '1', uv: this.state.timedata1[1].values[i][1], dv: this.state.timedata1[2].values[i][1] }],
                        datakeski: [...this.state.datakeski, { name: this.state.timedata1[0].values[i][0], pv: (1 + Number(this.state.timedata1[1].values[i][1]) + Number(this.state.timedata1[2].values[i][1])) / 3 }]
                    })
                }
                else if (this.state.timedata1[1].values[i][1] > 10) {
                    this.setState({
                        data: [...this.state.data, { name: this.state.timedata1[0].values[i][0], pv: this.state.timedata1[0].values[i][1], uv: '1', dv: this.state.timedata1[2].values[i][1] }],
                        datakeski: [...this.state.datakeski, { name: this.state.timedata1[0].values[i][0], pv: (Number(this.state.timedata1[0].values[i][1]) + 1 + Number(this.state.timedata1[2].values[i][1])) / 3 }]
                    })
                }
                else if (this.state.timedata1[2].values[i][1] > 10) {
                    this.setState({
                        data: [...this.state.data, { name: this.state.timedata1[0].values[i][0], pv: this.state.timedata1[0].values[i][1], uv: this.state.timedata1[1].values[i][1], dv: '1' }],
                        datakeski: [...this.state.datakeski, { name: this.state.timedata1[0].values[i][0], pv: (Number(this.state.timedata1[0].values[i][1]) + Number(this.state.timedata1[1].values[i][1]) + 1) / 3 }]
                    })
                }
                else {
                    this.setState({
                        data: [...this.state.data, { name: this.state.timedata1[0].values[i][0], pv: this.state.timedata1[0].values[i][1], uv: this.state.timedata1[1].values[i][1], dv: this.state.timedata1[2].values[i][1] }],
                        datakeski: [...this.state.datakeski, { name: this.state.timedata1[0].values[i][0], pv: (Number(this.state.timedata1[0].values[i][1]) + Number(this.state.timedata1[1].values[i][1]) + Number(this.state.timedata1[2].values[i][1])) / 3.00 }]
                    })
                }
                console.log(this.state.datakeski)

            }
        }
        if (this.state.data !== this.state.data2)
            this.setState({
                data2: this.state.data,
                data: [],
            })
        
        if (this.state.timemin !== this.state.timemin2)
            this.setState({
                timemin2: this.state.timemin,
                timemin: [],
            })
        if (this.state.datakeski !== this.state.datakeski2)
            this.setState({
                datakeski2: this.state.datakeski,
                datakeski: [],
            })

        if (this.state.data2.length > 1) {
            clearInterval(this.timerID);
        }

        //clearInterval(this.timerID);
    };

    async axiosurl() {
        await axios.get(this.state.aurl)
            .then(res => {
                const resdata = res.data;
                this.setState({
                    timedata1: resdata.results[0].series,
                })
            })
    }
   
    render() {
        
        return (
            <div>
                <TimeChart data={this.state.data2} />
                <br />Keskiarvo<br />
                <TimeChart data={this.state.datakeski2} />
            </div>
        )
    }
}

export default MoveTime
