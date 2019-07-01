import React, { Component } from 'react'
import axios from 'axios'
import './Inf.css';

class Influx extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timer1: '1000',
            ruuvit: [],
            test: '',
            mac1: '',
            mac2: '',
            mac3: '',
            lampo1: '',
            lampo2: '',
            lampo3: '',
        };
      }

    meh = () => {
        // //axios.get(`http://10.100.0.138:8086/query?db=ruuvi&q=SELECT%20mean(temperature)%20FROM%20ruuvi_measurements%20GROUP%20BY%20time(2m),%20mac%20limit%2010`)
        // axios.get(`http://10.100.0.138:8086/query?db=ruuvi&q=SELECT%20mean(temperature)%20FROM%20ruuvi_measurements%20GROUP%20BY%20time(2m),%20mac%20ORDER%20BY%20DESC%20LIMIT%201`)
        // .then(res => {
        //     const stuff = res.data;
        //     this.setState({
        //         ruuvit: [...this.stuff]
        //     })

        //     console.log(stuff)
        // })
        this.influxasios()
        console.log(this.state.ruuvit)
   
    }

    influxasios() {
        axios.get(`http://10.100.0.138:8086/query?db=ruuvi&q=SELECT%20mean(temperature)%20FROM%20ruuvi_measurements%20GROUP%20BY%20time(2m),%20mac%20ORDER%20BY%20DESC%20LIMIT%201`)
        .then(res => {
        const jotain = res.data;
        this.setState({
            ruuvit: jotain.results,
            test: jotain.results,
            mac1: jotain.results[0].series[0].tags.mac,
            mac2: jotain.results[0].series[1].tags.mac,
            mac3: jotain.results[0].series[2].tags.mac,
            lampo1: jotain.results[0].series[0].values[0][1],
            lampo2: jotain.results[0].series[1].values[0][1],
            lampo3: jotain.results[0].series[2].values[0][1],
            })
        })
/*         console.log(this.state.mac1 + " | " + this.state.mac2 + " | " + this.state.mac3)
        console.log(this.state.lampo1 + " | " + this.state.lampo2 + " | " + this.state.lampo3) */
    }


    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }


    tick = () => {

        if(this.state.lampo1 > 0) {
            this.setState({
            lampo11: parseFloat(Math.round(this.state.lampo1 * 100) / 100).toFixed(2),
            })
        }

        if(this.state.lampo2 > 0) {
            this.setState({
            lampo22: parseFloat(Math.round(this.state.lampo2 * 100) / 100).toFixed(2),
            })
        }

        if(this.state.lampo3 > 0) {
            this.setState({
            lampo33: parseFloat(Math.round(this.state.lampo3 * 100) / 100).toFixed(2),
            })
        }


        // this.setState({
        //     lampo11: parseFloat(Math.round(this.state.lampo1 * 100) / 100).toFixed(2),
        //     lampo22: parseFloat(Math.round(this.state.lampo2 * 100) / 100).toFixed(2),
        //     lampo33: parseFloat(Math.round(this.state.lampo3 * 100) / 100).toFixed(2),
        // })

        this.influxasios()
    }

    render() {
        // let content =<div/>
        // if(this.state.ruuvit.length > 0){
        //     content = this.state.ruuvit[0].series.map((i, index)=> <div key={index}>{i.values[0][1]}</div>)
        //     console.log(content)
        // }


        return (

           <div className="box">
               {/*  <button onClick={this.meh}>Influx temp</button> */}
                {/* {content} */}
             
                <div>{this.state.mac1} = {this.state.lampo11}</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div>{this.state.mac2} = {this.state.lampo22}</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div>{this.state.mac3} = {this.state.lampo33}</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            </div>
        )
    }
}

export default Influx
