import React, { Component } from 'react'
import axios from "axios";
import TimeChart from './TimeChart';

class MoveTime extends Component {

        constructor(props) {
            super(props);
            this.state = {
                moved1: [],
                aurl: "http://10.100.0.119:5000/" + this.props.url,
                timedata1: [],
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
        this.axiosurl();

        if (this.state.timedata1.length > 0) 
        {
            // for (var i = 0; i < `${this.state.timedata1[0].values.length}`; i++)
            for (var i = 0; i < 40; i++)
            {
                this.setState({
                    data: [...this.state.data, {name: '', pv: this.state.timedata1[0].values[i][1], uv: this.state.timedata1[1].values[i][1], dv: this.state.timedata1[2].values[i][1]}]
                })
        }

        }
        console.log(this.state.data)

    };

    axiosurl() {
        axios.get(this.state.aurl)
        .then(res => {
            const resdata = res.data;
            this.setState({
                timedata1: resdata.results[0].series,
                // test1: resdata.results[0].series[0].values[1][1],
                // test2: resdata.results[0].series[0].values[2][1],
                // test3: resdata.results[0].series[0].values[3][1],
                data: [],
            })
        })

        // if ((this.state.timedata1.length > 0) && (this.state.timedata1))
        // {
        // console.log(this.state.timedata1[0].values.length)
        // }
    }
    

    render() {
        return (
            <div>
                {this.state.test1}
                <br />
                {this.state.test2}
                <br />
                {this.state.test3}
                <TimeChart data={this.state.data} />
                
            </div>
        )
    }
}

export default MoveTime
