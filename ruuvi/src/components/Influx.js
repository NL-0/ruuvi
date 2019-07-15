import React, { Component } from 'react'
import axios from 'axios'
import './Inf.css';
import { Row, Col } from 'react-flexbox-grid';
//import Lampo from './Lampo';
import { write } from 'influx-api';
import MovedData from './MovedData';
import MoveTime from './MoveTime';
import Button from '@material-ui/core/Button';
import MakeRowT from './MakeRowT';
import MakeRowLampo from './MakeRowLampo';
import MakeRowLiike from './MakeRowLiike';
import MakeRowLiikeMuutos from './MakeRowLiikeMuutos';
import MakeRowLiikeYhteensa from './MakeRowLiikeYhteensa';
import MakeRowTitle from './MakeRowTitle';
import MakeRowBox from './MakeRowBox';
import MakeRowTitleNoIcon from './MakeRowTitleNoIcon';

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */

class Influx extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
            boxt1c: 'red',
            boxt2c: 'red',
            boxt3c: 'red',
            time1: [],
            time2: [],
            time3: [],
            lampotest: '',
            data: [],
            show: false,
            influxall: 'http://10.100.0.119:5000/all',
            acc1: '',
            acc2: '',
            acc3: '',

        };
    }

    influxall() {
        axios.get(this.state.influxall)
            .then(res => {
                const jotain = res.data;
                this.setState({
                    //http
                    // mac1: jotain.results[0].series[0].tags.mac,
                    // mac2: jotain.results[0].series[1].tags.mac,
                    // mac3: jotain.results[0].series[2].tags.mac,
                    // lampo1: jotain.results[0].series[0].values[0][1],
                    // lampo2: jotain.results[0].series[1].values[0][1],
                    // lampo3: jotain.results[0].series[2].values[0][1],
                    // signal1: jotain.results[0].series[0].values[0][2],
                    // signal2: jotain.results[0].series[1].values[0][2],
                    // signal3: jotain.results[0].series[2].values[0][2],
                    // liike1x: jotain.results[0].series[0].values[0][3],
                    // liike1y: jotain.results[0].series[0].values[0][4],
                    // liike1z: jotain.results[0].series[0].values[0][5],
                    // liike2x: jotain.results[0].series[1].values[0][3],
                    // liike2y: jotain.results[0].series[1].values[0][4],
                    // liike2z: jotain.results[0].series[1].values[0][5],
                    // liike3x: jotain.results[0].series[2].values[0][3],
                    // liike3y: jotain.results[0].series[2].values[0][4],
                    // liike3z: jotain.results[0].series[2].values[0][5],       
                    //
                    //Suora  

                    //mean = temperature
                    //mean_1 = rssi
                    //mean_2 = AccX
                    //mean_3 = AccY
                    //mean_4 = AccZ
                    mac1: jotain[0].mac,
                    mac2: jotain[1].mac,
                    mac3: jotain[2].mac,
                    lampo1: jotain[0].mean,
                    lampo2: jotain[1].mean,
                    lampo3: jotain[2].mean,            
                    signal1: jotain[0].mean_1,
                    signal2: jotain[1].mean_1,
                    signal3: jotain[2].mean_1,
                    liike1x: jotain[0].mean_2,
                    liike1y: jotain[1].mean_2,
                    liike1z: jotain[2].mean_2,
                    liike2x: jotain[0].mean_3,
                    liike2y: jotain[1].mean_3,
                    liike2z: jotain[2].mean_3,
                    liike3x: jotain[0].mean_4,
                    liike3y: jotain[1].mean_4,
                    liike3z: jotain[2].mean_4,
                    acc1: jotain[0].mean_5,
                    acc2: jotain[1].mean_5,
                    acc3: jotain[2].mean_5,
                })
            })

    }

    async componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 2000);

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

        // this.influxasios()
        // this.influxacceleration()
        // this.influxsignal()
        this.influxall()
    }

    time1() {
        console.log("time1")
        //MoveTime url="time1" />
        this.setState({ show: !this.state.show });
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

        let boxt1 = {
            width: '100px',
            height: '20px',
            background: `${this.state.boxt1c}`,
            display: 'table',
            margin: '0 auto',
        }
        let boxt2 = {
            width: '100px',
            height: '20px',
            background: `${this.state.boxt2c}`,
            display: 'table',
            margin: '0 auto',
        }
        let boxt3 = {
            width: '100px',
            height: '20px',
            background: `${this.state.boxt3c}`,
            display: 'table',
            margin: '0 auto',
        }

        const { show } = this.state
        return (
            <div className="center">
                <br />

                <MakeRowT val1={this.state.mac1} val2={this.state.mac2} val3={this.state.mac3} val4="u" />
                <br />

                <MakeRowTitle val1="Lämpötila" val2="temperature-low" />
                <br />

                <MakeRowLampo val1={this.state.lampo1} val2={this.state.lampo2} val3={this.state.lampo3} />
                <br />

                <MakeRowTitle val1="Liike" val2="arrows-alt" />
                <br />

                <MakeRowLiike val1={this.state.liike1x} val2={this.state.liike2x} val3={this.state.liike3x} val4="X: " />

                <MakeRowLiike val1={this.state.liike1y} val2={this.state.liike2y} val3={this.state.liike3y} val4="Y: " />

                <MakeRowLiike val1={this.state.liike1z} val2={this.state.liike2z} val3={this.state.liike3z} val4="Z: " />
                <br />

                <MakeRowTitleNoIcon val1="Muutos %" val2="" />
                <br />

                <MakeRowLiikeMuutos val1={this.state.liike111x} val2={this.state.liike222x} val3={this.state.liike333x} val4="X: " />

                <MakeRowLiikeMuutos val1={this.state.liike111y} val2={this.state.liike222y} val3={this.state.liike333y} val4="Y: " />

                <MakeRowLiikeMuutos val1={this.state.liike111z} val2={this.state.liike222z} val3={this.state.liike333z} val4="Z: " />
                <br />

                <MakeRowBox val1={box1} val2={box2} val3={box3} />
                <br />

                <MakeRowTitleNoIcon val1="Muutos Total" val2="" />
                <br />

                <MakeRowLiike val1={this.state.acc1} val2={this.state.acc2} val3={this.state.acc3} val4="" />
                <MakeRowBox val1={boxt1} val2={boxt2} val3={boxt3} />
                <br />
                <MakeRowTitleNoIcon val1="Liikkeitä yhteensä" val2="" />
                <br />
                
                <MakeRowLiikeYhteensa val1={this.state.time1.length} val2={this.state.time2.length} val3={this.state.time3.length} />
                <br />

                <MovedData />
                <br />

                <MakeRowTitle val1="Signal" val2="signal" />
                <br />

                <MakeRowLiike val1={this.state.signal1} val2={this.state.signal2} val3={this.state.signal3} val4="" />

                <br />
                <Row >
                    <Col xs>
                        <b>Liikkunut aikana</b>
                    </Col>
                </Row>
                <br />

                <Button variant="contained"
                    color="primary"
                    onClick={this.time1.bind(this)}
                >Time1
                </Button>
{/*                 {show ? <MoveTime url="time1"/> : undefined}
                {show ? <MoveTime url="time2"/> : undefined}
                {show ? <MoveTime url="time3"/> : undefined}

  */}
                {show ? <MoveTime url="hidastime1" /> : undefined}
                {show ? <MoveTime url="hidastime2" /> : undefined}
                {show ? <MoveTime url="hidastime3" /> : undefined}

                {/* <MoveTime url="time1" /> */}
                <br />
                {/* <MoveTime url="time2" />
                <MoveTime url="time3" /> */}


            </div>
        )
    }
}



export default Influx
