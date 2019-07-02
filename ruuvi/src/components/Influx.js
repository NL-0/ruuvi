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
        axios.get(`http://10.100.0.138:8086/query?db=ruuvi&q=SELECT%20mean(accelerationTotal)%20FROM%20ruuvi_measurements%20GROUP%20BY%20time(5m),%20mac%20ORDER%20BY%20DESC%20LIMIT%201`)
        .then(res => {
            const jotain2 = res.data;
            this.setState({
                liike1: jotain2.results[0].series[0].values[0][1],
                liike2: jotain2.results[0].series[1].values[0][1],
                liike3: jotain2.results[0].series[2].values[0][1],
            })
        })
    }


    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 2000);
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

        if(this.state.liike1 > 0) {
            this.setState({
          //      liike1111: Number(this.state.liike1).toFixed(12)
                liike1111: <Liike liike={this.state.liike1} />
          //  liike1111: parseFloat(Math.round(this.state.liike1 * 100) / 100).toFixed(12),
            })
        }

        if(this.state.liike2 > 0) {
            this.setState({
                liike2222: <Liike liike={this.state.liike2} />
            })
        }

        if(this.state.liike3 > 0) {
            this.setState({
                liike3333: <Liike liike={this.state.liike3} />
            })
        }


        // this.setState({
        //     lampo11: parseFloat(Math.round(this.state.lampo1 * 100) / 100).toFixed(2),
        //     lampo22: parseFloat(Math.round(this.state.lampo2 * 100) / 100).toFixed(2),
        //     lampo33: parseFloat(Math.round(this.state.lampo3 * 100) / 100).toFixed(2),
        // })


        
        if (this.state.liike1 !== this.state.liike11) {
            this.setState({
                liike11: this.state.liike1,
                liike111: (1 - Number(this.state.liike1) / Number(this.state.liike11)) * 100
            })
        }


        if (this.state.liike2 !== this.state.liike22) {
            this.setState({
                liike22: this.state.liike2,
                liike222: (1 - Number(this.state.liike2) / Number(this.state.liike22)) * 100
            })

        }

        if (this.state.liike3 !== this.state.liike33) {
            this.setState({
                liike33: this.state.liike3,
                liike333: (1 - Number(this.state.liike3) / Number(this.state.liike33)) * 100
            })
        }        


        if ((this.state.liike111 != null ) || (this.state.liike111 !== 0 ))  {
            if ((this.state.liike111 > 1 ) || (this.state.liike111 < -1 )) {
                console.log("liikkuu?")
            }
        }

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
                    {this.state.liike1111}
                </Col>
                <Col xs>
                    {this.state.liike2222}
                </Col>
                <Col xs>
                    {this.state.liike3333}
                </Col>
            </Row>
            <br />
            <Row>
                <Col xs>
                    <u>Muutos %</u>
                </Col>
            </Row>
            <Row>
                <Col xs>
                    {this.state.liike111} 
                </Col>
                <Col xs>
                    {this.state.liike222} 
                </Col>
                <Col xs>
                    {this.state.liike333} 
                </Col>
            </Row>

{/* {content} */}

              {/*   <div className="box">
                    
                    <div><u>{this.state.mac1}</u> {this.state.lampo11} C</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div><u>{this.state.mac2}</u> {this.state.lampo22} C</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div><u>{this.state.mac3}</u> {this.state.lampo33} C</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <br />
                <br />
                <div className="box">
                    <div><u>{this.state.mac1}</u> {this.state.liike1}</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div><u>{this.state.mac2}</u> {this.state.liike2}</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div><u>{this.state.mac3}</u> {this.state.liike3}</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <br />
                <div className="box">
                    <div><u>Liike muutos %</u> {this.state.liike111}</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div><u>Liike muutos %</u> {this.state.liike222}</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div><u>Liike muutos %</u> {this.state.liike333}</div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </div>
                <br />
                <br />
                <br />
                <div className="box">
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                </div>
 */}
                {/* <Row>
  <Col xs={12} sm={3} md={2} lg={1} />1
  <Col xs={6} sm={6} md={8} lg={10} />2
  <Col xs={6} sm={3} md={2} lg={1} />3
</Row> */}

{/* 
            <Row>
                <Col xs>
                    1111
                </Col>
                <Col xs>
                   222222

                </Col>
                <Col xs>
                    333333

                </Col>

            </Row> */}
            
            </div>
        )
    }
}

export default Influx
