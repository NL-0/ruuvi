import React, { Component } from 'react'
import axios from "axios";
import TimeChart from './TimeChart';

/*
    saa props 3 eri mac osotetta ja aikavälin ja arvon 1 tai 2
    Hakee jokaisen mac osoitteen perusteella tietokannasta väliajan data ja yhdistää kaiken graafiin
    Myös keskiväli graafi riippuen arvosta 1 tai 2
*/

class MoveTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeurlmac1: "http://10.100.0.119:5000/time2?q=" + this.props.val1 + "Z&q2=" + this.props.val2 + "Z&mac=" + this.props.mac1,
            timeurlmac2: "http://10.100.0.119:5000/time?q=" + this.props.val1 + "Z&q2=" + this.props.val2 + "Z&mac=" + this.props.mac2,
            timeurlmac3: "http://10.100.0.119:5000/time?q=" + this.props.val1 + "Z&q2=" + this.props.val2 + "Z&mac=" + this.props.mac3,
            timedata1: [],
            timedata2: [],
            timedata3: [],
            data1: [],
            data2: [],
            data3: [],
            data11: [],
            data22: [],
            data33: [],
            timer1: '2000',
            chartdata: [],
            datatime: [],
            chartkeski: [],
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), this.state.timer1);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick = () => {

        //Printtaa joka mac url testausta varten
        console.log(this.state.timeurlmac1)
        console.log(this.state.timeurlmac2)
        console.log(this.state.timeurlmac3)
        this.axiosurl();

        /*
            lisää joka mac osoitteen datan vai jos tullut tiedosto on yli 0 pitkä
            lisää vain kohdassa 1 datatime koska kaikkien hakujen ajankohdat ovat samoja
        */

        if ((this.state.timedata1) && (this.state.timedata1.length > 0)) {
            for (var i = 0; i < this.state.timedata1.length; i++) {
                this.setState({
                    data1: [...this.state.data1, this.state.timedata1[i].mean],
                    datatime: [...this.state.datatime, this.state.timedata1[i].time],
                })
            }
        }

        if ((this.state.timedata2) && (this.state.timedata2.length > 0)) {
            for (var y = 0; y < this.state.timedata2.length; y++) {
                this.setState({
                    data2: [...this.state.data2, this.state.timedata2[y].mean]
                })
            }
        }

        if ((this.state.timedata3) && (this.state.timedata3.length > 0)) {
            for (var z = 0; z < this.state.timedata3.length; z++) {
                this.setState({
                    data3: [...this.state.data3, this.state.timedata3[z].mean]
                })
            }
        }

        /*
            laittaa lisätyn datan uuteen array poistaen ensimmäisen null arvon
            Rasprebby pi epäluotettavuuden takia ei voi olettaa että saa oikeaa tai mitään dataa jokaisella haulla.
        */

        if (this.state.data1 !== this.state.data11) {
            this.setState({
                data11: this.state.data1,
                data1: [],
            })
            this.state.data11.shift()
        }

        if (this.state.data2 !== this.state.data22) {
            this.setState({
                data22: this.state.data2,
                data2: [],
            })
            this.state.data22.shift()
        }

        if (this.state.data3 !== this.state.data33) {
            this.setState({
                data33: this.state.data3,
                data3: [],
            })
            this.state.data33.shift()
        }

        /*
            Poistaa grafiikasta suuremmat hyppäykset joita tulee tuntemattomasta syystä sattumanvaraisesti 
            Tekisivät muuten grafiikasta lukukelvottoman koska ovat 10-20 kertaisia normaaliin liikkumiseen verrattuna
        */

        for (var q = 0; q < this.state.timedata1.length; q++) {
            if (this.state.data11[q] > 5) {
                this.setState({
                    chartdata: [...this.state.chartdata, { name: this.state.datatime[q], pv: '1', uv: this.state.data22[q], dv: this.state.data33[q] }],
                    chartkeski: [...this.state.chartkeski, { name: this.state.datatime[q], pv: ('1' + this.state.data22[q] + this.state.data33[q]) / 3 }]
                })
            }
            else if (this.state.data22[q] > 5) {
                this.setState({
                    chartdata: [...this.state.chartdata, { name: this.state.datatime[q], pv: this.state.data11[q], uv: '1', dv: this.state.data33[q] }],
                    chartkeski: [...this.state.chartkeski, { name: this.state.datatime[q], pv: (this.state.data11[q] + '1' + this.state.data33[q]) / 3 }]
                })
            }
            else if (this.state.data33[q] > 5) {
                this.setState({
                    chartdata: [...this.state.chartdata, { name: this.state.datatime[q], pv: this.state.data11[q], uv: this.state.data22[q], dv: '1' }],
                    chartkeski: [...this.state.chartkeski, { name: this.state.datatime[q], pv: (this.state.data11[q] + this.state.data22[q] + 1) / 3 }]
                })
            }
            else {
                this.setState({
                    chartdata: [...this.state.chartdata, { name: this.state.datatime[q], pv: this.state.data11[q], uv: this.state.data22[q], dv: this.state.data33[q] }],
                    chartkeski: [...this.state.chartkeski, { name: this.state.datatime[q], pv: (this.state.data11[q] + this.state.data22[q] + this.state.data33[q]) / 3 }]
                })
            }
        }

        /*
            Lopettaa datahaun kun kaikki 3 ovat varmasti saaneet dataa
        */

        if ((this.state.data11.length > 1) && (this.state.data22.length > 1) && this.state.data33.length > 1) {
            clearInterval(this.timerID);
        }
        console.log(this.state.data11)
        console.log(this.state.data22)
        console.log(this.state.data33)

    };

    async axiosurl() {
        await axios.get(this.state.timeurlmac1)
            .then(res => {
                const resdata = res.data;
                this.setState({ timedata1: resdata })
            })
        await axios.get(this.state.timeurlmac2)
            .then(res => {
                const resdata = res.data;
                this.setState({ timedata2: resdata })
            })
        await axios.get(this.state.timeurlmac3)
            .then(res => {
                const resdata = res.data;
                this.setState({ timedata3: resdata })
            })
    }

    makecharts() {
        if (this.props.val3 === '2') {
            return (
                <div>
                    <TimeChart data={this.state.chartdata} />
                </div>
            )
        }
        else return (
            <div>
                <TimeChart data={this.state.chartdata} />
                <br />Keskiarvo<br />
                <TimeChart data={this.state.chartkeski} />
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.makecharts()}
            </div>
        )
    }
}

export default MoveTime
