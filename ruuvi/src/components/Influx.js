import React, { Component } from 'react'
import axios from 'axios'
import './Inf.css';
import { Row, Col } from 'react-flexbox-grid';
import Liike from './Liike';


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
            liike1: '0',
            liike2: '0',
            liike3: '0',
            liike11: '0',
            liike22: '0',
            liike33: '0',
            test11: '0',
            liike111: '',
            liike222: '',
            liike333: '',
            signal1: '',
            signal2: '',
            signal3: '',
            arvo: '0.01',
        };
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
    }


    influxsignal() {
        axios.get(`http://10.100.0.138:8086/query?db=ruuvi&q=SELECT%20mean(rssi)%20FROM%20ruuvi_measurements%20GROUP%20BY%20time(5m),%20mac%20ORDER%20BY%20DESC%20LIMIT%201`)
        .then(res => {
            const signal = res.data;
            this.setState({
                signal1: signal.results[0].series[0].values[0][1],
                signal2: signal.results[0].series[0].values[0][1],
                signal3: signal.results[0].series[0].values[0][1],
            })

        })

    }

    influxacceleration() {
        axios.get(`http://10.100.0.138:8086/query?db=ruuvi&q=SELECT%20mean(accelerationY),%20mean(accelerationX),%20mean(accelerationZ)%20FROM%20ruuvi_measurements%20GROUP%20BY%20time(5m),%20mac%20ORDER%20BY%20DESC%20LIMIT%201`)
        .then(res => {
            const jotain2 = res.data;
            this.setState({
                liike1: jotain2.results[0].series[0].values[0][1],
                liike2: jotain2.results[0].series[1].values[0][1],
                liike3: jotain2.results[0].series[2].values[0][1],
                liike1x: jotain2.results[0].series[0].values[0][1],
                liike1y: jotain2.results[0].series[0].values[0][2],
                liike1z: jotain2.results[0].series[0].values[0][3],  
                liike2x: jotain2.results[0].series[1].values[0][1],
                liike2y: jotain2.results[0].series[1].values[0][2],
                liike2z: jotain2.results[0].series[1].values[0][3],    
                liike3x: jotain2.results[0].series[2].values[0][1],
                liike3y: jotain2.results[0].series[2].values[0][2],
                liike3z: jotain2.results[0].series[2].values[0][3],          
            })
        })
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

        if (this.state.liike1x !== this.state.liike11x ) {
            this.setState({
                liike111x: Math.abs(Number(this.state.liike1x) - Number(this.state.liike11x)),
                liike11x: this.state.liike1x
                //liike111: (1.00 - Number(this.state.liike1) / Number(this.state.liike11)) * 100
            })
        }

        if (this.state.liike1y !== this.state.liike11y ) {
            this.setState({
                liike111y: Math.abs(Number(this.state.liike1y) - Number(this.state.liike11y)),
                liike11y: this.state.liike1y
                //liike111: (1.00 - Number(this.state.liike1) / Number(this.state.liike11)) * 100
            })
        }


        if (this.state.liike1z !== this.state.liike11z ) {
            this.setState({
                liike111z: Math.abs(Number(this.state.liike1z) - Number(this.state.liike11z)),
                liike11z: this.state.liike1z
                //liike111: (1.00 - Number(this.state.liike1) / Number(this.state.liike11)) * 100
            })
        }


        if (this.state.liike2x !== this.state.liike22x ) {
            this.setState({
                liike222x: Math.abs(Number(this.state.liike2x) - Number(this.state.liike22x)),
                liike22x: this.state.liike2x
                //liike111: (1.00 - Number(this.state.liike1) / Number(this.state.liike11)) * 100
            })
        }

        if (this.state.liike2y !== this.state.liike22y ) {
            this.setState({
                liike222y: Math.abs(Number(this.state.liike2y) - Number(this.state.liike22y)),
                liike22y: this.state.liike2y
                //liike111: (1.00 - Number(this.state.liike1) / Number(this.state.liike11)) * 100
            })
        }

        if (this.state.liike2z !== this.state.liike22z ) {
            this.setState({
                liike222z: Math.abs(Number(this.state.liike2z) - Number(this.state.liike22z)),
                liike22z: this.state.liike2z
                //liike111: (1.00 - Number(this.state.liike1) / Number(this.state.liike11)) * 100
            })
        }

        if (this.state.liike3x !== this.state.liike33x ) {
            this.setState({
                liike333x: Math.abs(Number(this.state.liike3x) - Number(this.state.liike33x)),
                liike33x: this.state.liike3x,
                //liike111: (1.00 - Number(this.state.liike1) / Number(this.state.liike11)) * 100
            })
        }
        if (this.state.liike3y !== this.state.liike33y ) {
            this.setState({
                liike333y: Math.abs(Number(this.state.liike3y) - Number(this.state.liike33y)),
                liike33y: this.state.liike3y,
                //liike111: (1.00 - Number(this.state.liike1) / Number(this.state.liike11)) * 100
            })
        }
        if (this.state.liike3z !== this.state.liike33z ) {
            this.setState({
                liike333z: Math.abs(Number(this.state.liike3z) - Number(this.state.liike33z)),
                liike33z: this.state.liike3z,
                //liike111: (1.00 - Number(this.state.liike1) / Number(this.state.liike11)) * 100
            })
        }


        

        //console.log("liike1x : " + this.state.liike1x + " | liike11x : " + this.state.liike11x + " | liike111x : " +this.state.liike111x)
        
        // if (this.state.liike1 !== this.state.liike11) {
        //     this.setState({
        //         liike11: this.state.liike1,
        //         //liike111: Math.abs(Number(this.state.liike1), Number(this.state.liike11))
        //         liike111: (1.00 - Number(this.state.liike1) / Number(this.state.liike11)) * 100
        //     })
        // }

        // if (this.state.liike2 !== this.state.liike22) {
        //     this.setState({
        //         liike22: this.state.liike2,
        //         liike222: (1 - Number(this.state.liike2) / Number(this.state.liike22)) * 100
        //     })

        // }

        // if (this.state.liike3 !== this.state.liike33) {
        //     this.setState({
        //         liike33: this.state.liike3,
        //         liike333: (1 - Number(this.state.liike3) / Number(this.state.liike33)) * 100
        //     })
        // }        

/*         if (this.state.liike111x > 0.03) {
            console.log("1: 0.03 ylitetty")
        }
        if(this.state.liike222x > 0.03) {
            console.log("2: 0.03 ylitetty")
        }
        if(this.state.liike333x > 0.03) {
            console.log("3: 0.03 ylitetty")
        } */
        if ((this.state.liike111x > this.state.arvo) || (this.state.liike111y > this.state.arvo) || (this.state.liike111z > this.state.arvo)) {
            console.log("1111111111111111")
        }
        if ((this.state.liike222x > this.state.arvo) || (this.state.liike222y > this.state.arvo) || (this.state.liike222z > this.state.arvo)) {
            console.log("2222222222222222")
        }
        if ((this.state.liike333x > this.state.arvo) || (this.state.liike333y > this.state.arvo) || (this.state.liike333z > this.state.arvo)) {
            console.log("3333333333333333")
        }

        // if ((this.state.liike111 != null ) || (this.state.liike111 !== 0 ))  {
        //     if ((this.state.liike111 > 1.3 ) || (this.state.liike111 < -1.3 )) {
        //       //  console.log("liikkuu?")
        //     }
        // }

        this.influxasios()
        this.influxacceleration()
    }

    render() {
        // let content =<div/>
        // if(this.state.ruuvit.length > 0){
        //     content = this.state.ruuvit[0].series.map((i, index)=> <div key={index}>{i.values[0][1]}</div>)
        //     console.log(content)
        // }


        return (
            <div className="center">
            <br />
            <Row>
                <Col xs>
                    <u>{this.state.mac1}</u>
                </Col>
                <Col xs>
                    <u>{this.state.mac2}</u>
                </Col>
                <Col xs>
                    <u> {this.state.mac3}</u>
                </Col>
            </Row>
            <br />
            <Row>
                <Col xs>
                    {this.state.lampo11} C
                </Col>
                <Col xs>
                    {this.state.lampo22} C
                </Col>
                <Col xs>
                    {this.state.lampo33} C
                </Col>
            </Row>
            <br />
            <br />
            <Row>
                <Col xs>
                    <u>Liike</u>
                </Col>
            </Row>
            <br />
            <Row>
                <Col xs>
                    <Liike liike={this.state.liike1x} />
                </Col>
                <Col xs>
                    <Liike liike={this.state.liike2x} />
                </Col>
                <Col xs>
                    <Liike liike={this.state.liike3x} />
                </Col>
            </Row>
            <Row>
                <Col xs>
                    <Liike liike={this.state.liike1y} />
                </Col>
                <Col xs>
                    <Liike liike={this.state.liike2y} />
                </Col>
                <Col xs>
                    <Liike liike={this.state.liike3y} />
                </Col>
            </Row>
            <Row>
                <Col xs>
                    <Liike liike={this.state.liike1z} />
                </Col>
                <Col xs>
                    <Liike liike={this.state.liike2z} />
                </Col>
                <Col xs>
                    <Liike liike={this.state.liike3z} />
                </Col>
            </Row>
            <br />
            <Row>
                <Col xs>
                    <u>Muutos %</u>
                </Col>
            </Row>
            <br />
            <Row>
                <Col xs>
                    <Liike liike={this.state.liike111x} />
                </Col>
                <Col xs>
                    <Liike liike={this.state.liike222x} />
                </Col>
                <Col xs>
                    <Liike liike={this.state.liike333x} />
                </Col>
            </Row>
            <Row>
                <Col xs>
                    <Liike liike={this.state.liike111y} />
                </Col>
                <Col xs>
                    <Liike liike={this.state.liike222y} />
                </Col>
                <Col xs>
                    <Liike liike={this.state.liike333y} />
                </Col>
            </Row>
            <Row>
                <Col xs>
                    <Liike liike={this.state.liike111z} />
                </Col>
                <Col xs>
                    <Liike liike={this.state.liike222z} />
                </Col>
                <Col xs>
                    <Liike liike={this.state.liike333z} />
                </Col>
            </Row>

            <br />

{/* {content} */}

            
            </div>
        )
    }
}

export default Influx
