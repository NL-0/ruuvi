import React, { Component } from 'react'
import axios from 'axios'
import './Inf.css';
import { Row, Col } from 'react-flexbox-grid';
import Liike from './Liike';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignal, faTemperatureLow, faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import Lampo from './Lampo';
import { write } from 'influx-api';
import MovedData from './MovedData';
import LiikeChart from './LiikeChart';


library.add(faSignal, faTemperatureLow, faArrowsAlt)

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
            arvo: '0.05',
            box1c: 'red',
            box2c: 'red',
            box3c: 'red',
            time1: [],
            time2: [],
            time3: [],
            lampotest: '',
            data: [],
            influxtemp: 'http://10.100.0.119:5000/temp',
            influxsignal: 'http://10.100.0.119:5000/signal',
            influxacc: 'http://10.100.0.119:5000/xyz',

        };
    }

    influxasios() {
        //axios.get(`http://10.100.0.138:8086/query?db=ruuvi&q=SELECT%20mean(temperature)%20FROM%20ruuvi_measurements%20GROUP%20BY%20time(2m),%20mac%20ORDER%20BY%20DESC%20LIMIT%201`)
        axios.get(this.state.influxtemp)
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
        //axios.get(`http://10.100.0.138:8086/query?db=ruuvi&q=SELECT%20mean(rssi)%20FROM%20ruuvi_measurements%20GROUP%20BY%20time(5m),%20mac%20ORDER%20BY%20DESC%20LIMIT%201`)
        axios.get(this.state.influxsignal)
            .then(res => {
                const signal = res.data;
                this.setState({
                    signal1: signal.results[0].series[0].values[0][1],
                    signal2: signal.results[0].series[1].values[0][1],
                    signal3: signal.results[0].series[2].values[0][1],
                })
            })
    }

    influxacceleration() {
        //axios.get(`http://10.100.0.138:8086/query?db=ruuvi&q=SELECT%20mean(accelerationX),%20mean(accelerationY),%20mean(accelerationZ)%20FROM%20ruuvi_measurements%20GROUP%20BY%20time(1m),%20mac%20fill(0)%20ORDER%20BY%20DESC%20LIMIT%201`)
        axios.get(this.state.influxacc)
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

    async componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);

    }

    async componentWillUnmount() {
        clearInterval(this.timerID);
    }


    async addmac(mac) {
        //poista kirjaimet
        //let testimac = mac.replace(/\D/g,'');

        let testimac = mac
        // stringit ""
        // ,values EI välilyöntiä
        //     esim.  mov3 mac="E5A82164DA26",values=1
        //
        //let lii = 'mov4 mac="' + testimac +'",val1=3'
        let lii = `mov10,mac=` + testimac + ` value1="` + testimac + `"`
        console.log(lii)

        //const result2 await write({
        const result2 = await write({
            url: 'http://10.100.0.138:8086',
            db: 'ruuvi',
            data: lii,
        });
        console.log(result2);

    }

    tick = () => {

        this.setState({
            lampo11: <Lampo lampo={this.state.lampo1} />,
            lampo22: <Lampo lampo={this.state.lampo2} />,
            lampo33: <Lampo lampo={this.state.lampo3} />,

        })

        if (this.state.liike1x !== this.state.liike11x) {

            this.setState({
                liike111x: Math.abs(Number(this.state.liike1x) - Number(this.state.liike11x)),
                liike11x: this.state.liike1x,
            })

        }

        if (this.state.liike1y !== this.state.liike11y) {
            this.setState({
                liike111y: Math.abs(Number(this.state.liike1y) - Number(this.state.liike11y)),
                liike11y: this.state.liike1y
            })
        }


        if (this.state.liike1z !== this.state.liike11z) {
            this.setState({
                liike111z: Math.abs(Number(this.state.liike1z) - Number(this.state.liike11z)),
                liike11z: this.state.liike1z
            })
        }


        if (this.state.liike2x !== this.state.liike22x) {
            this.setState({
                liike222x: Math.abs(Number(this.state.liike2x) - Number(this.state.liike22x)),
                liike22x: this.state.liike2x
            })
        }

        if (this.state.liike2y !== this.state.liike22y) {
            this.setState({
                liike222y: Math.abs(Number(this.state.liike2y) - Number(this.state.liike22y)),
                liike22y: this.state.liike2y
            })
        }

        if (this.state.liike2z !== this.state.liike22z) {
            this.setState({
                liike222z: Math.abs(Number(this.state.liike2z) - Number(this.state.liike22z)),
                liike22z: this.state.liike2z
            })
        }

        if (this.state.liike3x !== this.state.liike33x) {
            this.setState({
                liike333x: Math.abs(Number(this.state.liike3x) - Number(this.state.liike33x)),
                liike33x: this.state.liike3x,
            })
        }
        if (this.state.liike3y !== this.state.liike33y) {
            this.setState({
                liike333y: Math.abs(Number(this.state.liike3y) - Number(this.state.liike33y)),
                liike33y: this.state.liike3y,
            })
        }
        if (this.state.liike3z !== this.state.liike33z) {
            this.setState({
                liike333z: Math.abs(Number(this.state.liike3z) - Number(this.state.liike33z)),
                liike33z: this.state.liike3z,
            })
        }


        if ((this.state.liike111x > this.state.arvo) || (this.state.liike111y > this.state.arvo) || (this.state.liike111z > this.state.arvo)) {
            const date = new Date()
            if (this.state.box1c === 'red') {
                this.setState({
                    time1: [...this.state.time1, date],
                })
                this.addmac(this.state.mac1)
            }
            this.setState({
                box1c: 'green',
            })
        }
        else (
            this.setState({
                box1c: 'red',
            })
        )
        if ((this.state.liike222x > this.state.arvo) || (this.state.liike222y > this.state.arvo) || (this.state.liike222z > this.state.arvo)) {
            const date = new Date()

            if (this.state.box2c === 'red') {
                this.setState({
                    time2: [...this.state.time2, date],
                })
                this.addmac(this.state.mac2)
            }
            this.setState({
                box2c: 'green',
            })
        }
        else (
            this.setState({
                box2c: 'red',
            })
        )
        if ((this.state.liike333x > this.state.arvo) || (this.state.liike333y > this.state.arvo) || (this.state.liike333z > this.state.arvo)) {
            const date = new Date()

            if (this.state.box3c === 'red') {
                this.setState({
                    time3: [...this.state.time3, date],
                })
                this.addmac(this.state.mac3)
            }

            this.setState({
                box3c: 'green',
            })
        }
        else (
            this.setState({
                box3c: 'red',
            })
        )


        this.influxasios()
        this.influxacceleration()
        this.influxsignal()
    }

    render() {

        let box1 = {
            width: '100px',
            height: '20px',
            background: `${this.state.box1c}`,
            display: 'table',
            margin: '0 auto',
        }
        let box2 = {
            width: '100px',
            height: '20px',
            background: `${this.state.box2c}`,
            display: 'table',
            margin: '0 auto',
        }
        let box3 = {
            width: '100px',
            height: '20px',
            background: `${this.state.box3c}`,
            display: 'table',
            margin: '0 auto',
        }

        return (


            <div className="center">

                <br />
                <Row>
                    <Col xs={5} lg={2} className='vasen'>
                        <b>{this.state.mac1}</b>
                    </Col>
                    <Col xs={5} lg={2} className='keski'>
                        <b>{this.state.mac2}</b>
                    </Col>
                    <Col xs={5} lg={2} className='oikea'>
                        <b>{this.state.mac3}</b>
                    </Col>
                    <Col xs={5} lg={3}>

                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xs={5} lg={2}>
                    </Col>
                    <Col xs={5} lg={2}>
                        <b>Lämpötila</b>&nbsp; <FontAwesomeIcon icon={faTemperatureLow} />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xs={5} lg={2} className='vasen'>
                        {this.state.lampo11} C
                </Col>
                    <Col xs={5} lg={2} className='keski'>
                        {this.state.lampo22} C
                </Col>
                    <Col xs={5} lg={2} className='oikea'>
                        {this.state.lampo33} C
                </Col>
                    <Col xs={5} lg={3}>

                    </Col>
                </Row>
                <br />
                <br />
                <Row>
                    <Col xs={5} lg={2}>
                    </Col>
                    <Col xs={5} lg={2}>
                        <b>Liike</b> <FontAwesomeIcon icon={faArrowsAlt} />
                    </Col>
                </Row>
                <br />
                <Row middle="xs">
                    <Col xs={5} sm={5} md={5} lg={2} className='vasen'>
                        X: <Liike liike={this.state.liike1x} />
                    </Col>
                    <Col xs={5} lg={2} className='keski'>
                        X: <Liike liike={this.state.liike2x} />
                    </Col>
                    <Col xs={5} lg={2} className='oikea'>
                        X: <Liike liike={this.state.liike3x} />
                    </Col>
                    <Col xs={5} lg={1}>
                        <LiikeChart liike1={this.state.liike1x} liike2={this.state.liike2x} liike3={this.state.liike3x} />
                    </Col>
                </Row>

                <Row middle="xs">
                    <Col xs={5} sm={5} md={5} lg={2} className='vasen'>
                        Y: <Liike liike={this.state.liike1y} />
                    </Col>
                    <Col xs={5} lg={2} className='keski'>
                        Y: <Liike liike={this.state.liike2y} />
                    </Col>
                    <Col xs={5} lg={2} className='oikea'>
                        Y: <Liike liike={this.state.liike3y} />
                    </Col>
                    <Col xs={5} lg={1}>
                        <LiikeChart liike1={this.state.liike1y} liike2={this.state.liike2y} liike3={this.state.liike3y} />
                    </Col>
                </Row>
                <Row middle="xs">
                    <Col xs={5} sm={5} md={5} lg={2} className='vasen'>
                        Z: <Liike liike={this.state.liike1z} />
                    </Col>
                    <Col xs={5} lg={2} className='keski'>
                        Z: <Liike liike={this.state.liike2z} />
                    </Col>
                    <Col xs={5} lg={2} className='oikea'>
                        Z: <Liike liike={this.state.liike3z} />
                    </Col>
                    <Col xs={5} lg={1}>
                        <LiikeChart liike1={this.state.liike1z} liike2={this.state.liike2z} liike3={this.state.liike3z} />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col xs={5} lg={2}>
                    </Col>
                    <Col xs={5} lg={2}>
                        <b>Muutos %</b>
                    </Col>
                </Row>
                <br />
                <Row middle="xs">
                    <Col xs={5} sm={5} md={5} lg={2} className='vasen'>
                        X: <Liike liike={this.state.liike111x} />
                    </Col>
                    <Col xs={5} lg={2} className='keski'>
                        X: <Liike liike={this.state.liike222x} />
                    </Col>
                    <Col xs={5} lg={2} className='oikea'>
                        X: <Liike liike={this.state.liike333x} />
                    </Col>
                    <Col xs={5} lg={1}>

                    </Col>
                </Row>
                <Row middle="xs">
                    <Col xs={5} sm={5} md={5} lg={2} className='vasen'>
                        Y: <Liike liike={this.state.liike111y} />
                    </Col>
                    <Col xs={5} lg={2} className='keski'>
                        Y: <Liike liike={this.state.liike222y} />
                    </Col>
                    <Col xs={5} lg={2} className='oikea'>
                        Y: <Liike liike={this.state.liike333y} />
                    </Col>
                    <Col xs={5} lg={1}>

                    </Col>
                </Row>
                <Row middle="xs">
                    <Col xs={5} sm={5} md={5} lg={2} className='vasen'>
                        Z: <Liike liike={this.state.liike111z} />
                    </Col>
                    <Col xs={5} lg={2} className='keski'>
                        Z: <Liike liike={this.state.liike222z} />
                    </Col>
                    <Col xs={5} lg={2} className='oikea'>
                        Z: <Liike liike={this.state.liike333z} />
                    </Col>
                    <Col xs={5} lg={1}>

                    </Col>
                </Row>

                <br />
                <br />
                <Row middle="xs">
                    <Col xs={5} sm={5} md={5} lg={2}>
                        <div style={box1}></div>
                    </Col>
                    <Col xs={5} lg={2}>
                        <div style={box2}></div>
                    </Col>
                    <Col xs={5} lg={2}>
                        <div style={box3}></div>
                    </Col>
                    <Col xs={5} lg={1}>

                    </Col>
                </Row>
                <br />

                <Row>
                    <Col xs={5} lg={2}>
                    </Col>
                    <Col xs={5} lg={2}>
                        <b>Liikkeitä yhteensä</b>
                    </Col>
                </Row>
                <br />
                <Row middle="xs">
                    <Col xs={5} sm={5} md={5} lg={2} className='vasen'>
                        <div>{this.state.time1.length}</div>
                    </Col>
                    <Col xs={5} lg={2} className='keski'>
                        <div>{this.state.time2.length}</div>
                    </Col>
                    <Col xs={5} lg={2} className='oikea'>
                        <div>{this.state.time3.length}</div>
                    </Col>
                    <Col xs={5} lg={1}>

                    </Col>
                </Row>
                <br />
                <br />

                <MovedData />
                <br />

                <Row>
                    <Col xs={5} lg={2}>
                    </Col>
                    <Col xs={5} lg={2}>
                        <b>Signal</b> &nbsp;<FontAwesomeIcon icon={faSignal} />
                    </Col>
                </Row>
                <br />
                <Row middle="xs">
                    <Col xs={5} sm={5} md={5} lg={2} className='vasen'>
                        <Liike liike={this.state.signal1} />
                    </Col>
                    <Col xs={5} lg={2} className='keski'>
                        <Liike liike={this.state.signal2} />
                    </Col>
                    <Col xs={5} lg={2} className='oikea'>
                        <Liike liike={this.state.signal3} />
                    </Col>
                    <Col xs={5} lg={1}>
                        <LiikeChart liike1={this.state.signal1} liike2={this.state.signal2} liike3={this.state.signal3} />
                    </Col>
                </Row>
            </div>
        )
    }
}



export default Influx
