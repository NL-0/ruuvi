import React, { Component } from 'react'
import axios from "axios";
import TimeChart from './TimeChart';

class ArduinoTime extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arduinourl: "http://10.100.0.119:5000/arduino",
            arduinodata: [],
            arduinochart: [],
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 2000);
    }
  
      componentWillUnmount() {
          clearInterval(this.timerID);
    }
  
    tick = () => {

        this.axiosurl();

        if(this.state.arduinodata.length > 0) {
            for (var i = 0; i < this.state.arduinodata.length; i++) {
                this.setState({
                    arduinochart: [...this.state.arduinochart, {name: this.state.arduinodata[i].time, pv: this.state.arduinodata[i].data}],
                })
            }
        }


        if (this.state.arduinochart.length > 0) {
            this.state.arduinochart.shift();
            clearInterval(this.timerID);
        }
        console.log(this.state.arduinochart)
    }
    async axiosurl() {
        await axios.get(this.state.arduinourl)
            .then(res => {
                const resdata = res.data;
                this.setState({
                    arduinodata: resdata,
                })
            })
      //  console.log(this.state.arduinodata[2].data)
    }


    render() {
        return (
            <div>
                <TimeChart data={this.state.arduinochart} />
            </div>
        )
    }
}

export default ArduinoTime
