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
// import LiikeLasku from './LiikeLasku';
import TextField from '@material-ui/core/TextField';
//
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
//   DatePicker,
//   TimePicker,
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

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
            liiketest1x: '',
            val2: '',
            val3: '',
            totalarvo: '0.05',
            aika1value: '',
            aika2value: '',
            mehDate: new Date(),
            mehDate2: new Date(),
        };
    }

    influxall() {
        axios.get(this.state.influxall)
            .then(res => {
                const jotain = res.data;
                this.setState({
                    //Suora  
                    //mean = temperature
                    //mean_1 = rssi
                    //mean_2 = AccX
                    //mean_3 = AccY
                    //mean_4 = AccZ
                    //mean_5 = accTotal
                    mac1: jotain[0].mac,
                    mac2: jotain[2].mac,
                    mac3: jotain[4].mac,
                    lampo1: jotain[0].mean,
                    lampo2: jotain[2].mean,
                    lampo3: jotain[4].mean,
                    signal1: jotain[0].mean_1,
                    signal2: jotain[2].mean_1,
                    signal3: jotain[4].mean_1,
                    liike1x: jotain[0].mean_2,
                    liike1y: jotain[2].mean_2,
                    liike1z: jotain[4].mean_2,
                    liike2x: jotain[0].mean_3,
                    liike2y: jotain[2].mean_3,
                    liike2z: jotain[4].mean_3,
                    liike3x: jotain[0].mean_4,
                    liike3y: jotain[2].mean_4,
                    liike3z: jotain[4].mean_4,
                    acc1: jotain[0].mean_5,
                    acc2: jotain[2].mean_5,
                    acc3: jotain[4].mean_5,
                    vliike1x: jotain[1].mean_2,
                    vliike1y: jotain[3].mean_2,
                    vliike1z: jotain[5].mean_2,
                    vliike2x: jotain[1].mean_3,
                    vliike2y: jotain[3].mean_3,
                    vliike2z: jotain[5].mean_3,
                    vliike3x: jotain[1].mean_4,
                    vliike3y: jotain[3].mean_4,
                    vliike3z: jotain[5].mean_4,
                    vacc1: jotain[1].mean_5,
                    vacc2: jotain[3].mean_5,
                    vacc3: jotain[5].mean_5,
                })
            })

    }

    async componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 4000);
    }

    async componentWillUnmount() {
        clearInterval(this.timerID);
    }

    async addmac(mac) {

        let testimac = mac
        // stringit ""
        // ,values EI välilyöntiä
        //     esim.  mov3 mac="E5A82164DA26",values=1
        //
        //let lii = 'mov4 mac="' + testimac +'",val1=3'
        let lii = `mov10,mac=` + testimac + ` value1="` + testimac + `"`
        //console.log(lii)
        //const result2 await write({
        /* const result2 =  */await write({
            url: 'http://10.100.0.111:8086',
            db: 'ruuvi',
            data: lii,
        });
        //console.log(result2);
    }


    lasku(val1, val2) {

        if (val1 > 5) { return 1 }
        else if (val2 > 5) { return 1 }
        if ((val1 === null) || (val2 === null)) {
            return 1
        } else {
            let val3 = Math.abs(val1 - val2)
            return val3
        }
    }

    tick = () => {
        this.setState({
            liike111x: this.lasku(`${this.state.liike1x}`, `${this.state.vliike1x}`),
            liike111y: this.lasku(`${this.state.liike1y}`, `${this.state.vliike1y}`),
            liike111z: this.lasku(`${this.state.liike1z}`, `${this.state.vliike1z}`),
            liike222x: this.lasku(`${this.state.liike2x}`, `${this.state.vliike2x}`),
            liike222y: this.lasku(`${this.state.liike2y}`, `${this.state.vliike2y}`),
            liike222z: this.lasku(`${this.state.liike2z}`, `${this.state.vliike2z}`),
            liike333x: this.lasku(`${this.state.liike3x}`, `${this.state.vliike3x}`),
            liike333y: this.lasku(`${this.state.liike3y}`, `${this.state.vliike3y}`),
            liike333z: this.lasku(`${this.state.liike3z}`, `${this.state.vliike3z}`),
            totalacc1: this.lasku(`${this.state.acc1}`, `${this.state.vacc1}`),
            totalacc2: this.lasku(`${this.state.acc2}`, `${this.state.vacc2}`),
            totalacc3: this.lasku(`${this.state.acc3}`, `${this.state.vacc3}`),
        })

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

        if (this.state.totalacc1 > this.state.totalarvo) {
            this.setState({ boxt1c: 'green' })
        } else (
            this.setState({ boxt1c: 'red' }) 
        )
        
        if (this.state.totalacc2 > this.state.totalarvo) {
            this.setState({ boxt2c: 'green' })
        }
        else (
            this.setState({boxt2c: 'red'})
        )
        if (this.state.totalacc3 > this.state.totalarvo) {
            this.setState({ boxt3c: 'green' })
        }
        else (
            this.setState({ boxt3c: 'red' })
        )

        this.influxall()
    }

    time1() {
        //console.log("time1")
        //MoveTime url="time1" />
        this.setState({ show: !this.state.show });
    }


    onChange1 = (date) => {
        this.setState({
          //mehDate1: date.valueOf(),
          mehDate1: date
        });
        //console.log(this.state.mehDate1.customFormat("#DD#/#MM#/#YYYY# #hh#:#mm#:#ss#"))
        console.log(this.state.mehDate1)
      };

    onChange2 = (date) => {
        this.setState({
            mehDate2:  date.valueOf(),
        });

        console.log(this.state.mehDate2)
    }

    render() {
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

                <MakeRowBox val1={this.state.box1c} val2={this.state.box2c} val3={this.state.box1c} />
                <br />

                <MakeRowTitleNoIcon val1="Muutos Total" val2="" />
                <br />

                <MakeRowLiike val1={this.state.acc1} val2={this.state.acc2} val3={this.state.acc3} val4="" />

                <MakeRowLiike val1={this.state.totalacc1} val2={this.state.totalacc2} val3={this.state.totalacc3} val4="" />

                <MakeRowBox val1={this.state.boxt1c} val2={this.state.boxt2c} val3={this.state.boxt1c} />
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

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                {/* <DateTimePicker  */}
                <KeyboardDateTimePicker
                    variant="inline"
                    format="yyyy/MM/dd HH:mm:ss"
                    //onChange={this.handleChangeDate}
                    onChange={this.onChange1}
                    //onChange={this.handleChange1.bind(this)}
                    value={this.state.mehDate1}
                    // onChange={(e, event) => 
                    //  this.setState({
                    //      selectedDate1: e.valueOf(),
                    //  })
                    //   //  {console.log(e.valueOf())}
                        //this.setState({ selectedDate1: event.value,
                    // }
                />
                <KeyboardDateTimePicker
                    variant="inline"
                    format="yyyy/MM/dd HH:mm:ss"
                    onChange={this.onChange2}
                    value={this.state.mehDate2}
                />

                {/* <DateTimePicker 
                    onChange={this.onChange2}
                    value={this.state.mehDate2}
                /> */}
                
                </MuiPickersUtilsProvider>
<br /><br />
                 {this.state.selectedDate1} 
                {/* <KeyboardDateTimePicker variant="inline"
                    label="With keyboard"
                    value="2"
                    onError={console.log}
                    format="yyyy/MM/dd HH:mm"
                /> */}
                
                <TextField id="standard-name"
                label="Aika1"
                defaultValue="2019-07-18T08:45:00"
                onChange={e => this.setState({
                    aika1: e.target.value})}
                />
               
                <TextField id="standard-name"
                label="Aika2"
                defaultValue="2019-07-18T08:46:00"
                onChange={e => this.setState({
                    aika2: e.target.value})}
                />
                <Button variant="contained"
                    color="primary"
                    onClick={this.time1.bind(this)}
                >Näytä
                </Button>

                {show ? <MoveTime val1={this.state.mehDate1} val2={this.state.mehDate2} mac1={this.state.mac1} mac2={this.state.mac2} mac3={this.state.mac3} /> : undefined}

                
{/*                 {show ? <MoveTime val1={this.state.aika1} val2={this.state.aika2} mac1={this.state.mac1} mac2={this.state.mac2} mac3={this.state.mac3} /> : undefined} */}

                {/*
                {show ? <MoveTime url="time1"/> : undefined}
                {show ? <MoveTime url="time2"/> : undefined}
                {show ? <MoveTime url="time3"/> : undefined}
                */}
                {/* {show ? <MoveTime url="hidastime1" /> : undefined}
                {show ? <MoveTime url="hidastime2" /> : undefined}
                {show ? <MoveTime url="hidastime3" /> : undefined} */}

                {/* <MoveTime url="time1" /> */}
                <br />
                {/* <MoveTime url="time2" />
                <MoveTime url="time3" /> */}


                
                <br />
                
            </div>
        )
    }
}

export default Influx
